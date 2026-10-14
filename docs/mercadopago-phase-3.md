# Mercado Pago Checkout Pro — Orders API migration (TEST only)

## Implemented architecture

New Mercado Pago checkouts use `POST https://api.mercadopago.com/v1/orders` with `type: online`, `processing_mode: manual`, `capture_mode: automatic`, decimal-string totals/item prices and return URLs in `config.online`. The frontend redirects to the actual returned `checkout_url`; it is no longer constructed from a preference's sandbox URL.

The existing `create-order` Edge Function still invokes the existing service-role-only `create_order` RPC. Prices, active products, stock, box discount (10%), six-bottle minimum and shipping (Valle de Uco 0; Gran Mendoza 6000; rest of Mendoza 10000; rest of Argentina 20000 ARS) remain server-authoritative. Transfer instructions, transfer confirmation UI, tariffs, products and Zustand are preserved.

The local UUID is Mercado Pago's external reference and `X-Idempotency-Key`. The exact request payload is saved once in `orders.mp_order_request`; concurrent requests and retries reuse this snapshot and UUID. Browser retries after a lost response do not create another local order. `mercadopago-resume` requires the original guest's high-entropy attempt key and resumes that saved order only. If Mercado Pago returns an idempotency conflict rather than the original resource, the order stays pending review; do not generate a new UUID or reset the request. An authorized operator must reconcile the resource using its external reference in Mercado Pago.

Existing preference-based orders retain their checkout URLs and verified Payments webhook path. New Orders notifications cannot be applied to them, and legacy Payments notifications cannot confirm a new Orders API order. Old ambiguous preference attempts are not automatically converted into a second payment operation.

## TEST safeguards and credential limitation

`MP_ACCESS_TOKEN` is read exclusively by Edge Function code. The secret inventory confirms it is configured; its private value was not read or exposed during implementation.

This implementation continues to require a `TEST-` access token and an `ORDTST…` remote order ID. Orders must match the local reference, total, `online`/`manual` mode, ARS currency and ARG country. Responses explicitly marked live are rejected. It accepts documented Argentine HTTPS checkout hosts (`www.mercadopago.com.ar` and the legacy sandbox host); a normal hostname does not bypass the server-side TEST checks.

**The provider documentation is inconsistent:** the Checkout Pro Orders guide instructs using test credentials, while the Create/Get API reference lists `invalid_credentials` and states that some sandbox setups require credentials from a test seller account instead of TEST tokens. No real provider request was executed to resolve that account-specific conflict. If your configured TEST token is rejected, the application reports the issue and remains blocked. Do not replace it with real production credentials or remove the TEST checks. Any alternative test-seller strategy requires a separately verified safety change.

A Mercado Pago TEST checkout requires the buyer test-account email (`@testuser.com`). The server checks this before creating/reserving a new local MP order. Bank transfer emails are unaffected.

## Webhook and payment state

Configure **Order (Mercado Pago)** notifications at:

`https://nbgfbugsgjnuokfmraey.supabase.co/functions/v1/mercadopago-webhook`

The Orders handler accepts `order` / `orders_v2` topics with an `ORDTST…` ID. It verifies HMAC-SHA256 from `x-signature` using the lowercase `data.id`, `x-request-id` and signed `ts` manifest. Duplicate query IDs, missing/invalid signatures, future timestamps and non-TEST IDs are rejected. Signed older retries are allowed because Mercado Pago retries can arrive days later; every request fetches current provider state and the database deduplicates it.

After authentication, the handler uses `GET /v1/orders/{id}` with the server token. It checks the remote resource's ID, local reference, currency, country, mode, amount and update date, then invokes the service-role-only `apply_mp_order` RPC. A creation webhook arriving before the remote ID is saved returns a retryable 503 rather than being discarded. Persistence/provider errors also return 503. No browser callback updates payment state.

Mappings:

- `created` → pending payment.
- `processing` → in process; no confirmation.
- `action_required` → authorized; no confirmation.
- `failed` → rejected payment attempt; local order remains pending for same-checkout retry.
- `processed` + `accredited` → confirmed **only when total paid equals the server total**.
- `canceled` → cancelled unpaid order.
- `processed` + `partially_refunded` → recorded/displayed partial refund; does not newly confirm an order without previous verified approval.
- `refunded` or `processed` + `refunded` → cancelled/refunded local order.

Duplicate or stale notifications cannot reapply the same state. A later failed/processing attempt cannot regress a confirmed payment. Fulfillment states are not advanced by this integration. Unsupported provider states are never treated as paid.

## Customer return and retry

New return URLs use `/checkout/mercadopago?local_order_id=…&result=…`. The separate local parameter avoids Mercado Pago's own appended `order_id`. The page also accepts old local `order_id` links for existing orders.

`result` is only a display hint. The return page reads saved verified state through `mercadopago-status`, using the original session capability; losing that session requires contacting the store. The saved API request is stripped from the response. A recoverable failed checkout initialization exposes a button to retry the same saved attempt via `mercadopago-resume`. The cart is cleared only after verified approval, and only if it still matches the purchased cart. No shipment or delivery is claimed by a redirect.

## Configuration still required

Set server secrets in **Supabase → Project → Edge Functions → Manage Secrets**:

- `MP_ACCESS_TOKEN`: already configured per secret inventory. Keep it TEST only.
- `MP_WEBHOOK_SECRET`: **not present at inspection**. Use the signing secret from this application's webhook configuration.
- `PUBLIC_SITE_URL`: **not present at inspection**. Set the actual public HTTPS store origin without a path, query or fragment. No canonical deployment domain exists in `vercel.json`; none was invented. Return origin must match the deployed site so the original checkout session can be recovered.

Existing Supabase URL/service-role secrets are reused. No private frontend environment variables, Mercado Pago SDK or public key are needed.

In **Mercado Pago → Your integrations → application → Webhooks → Configure notifications**, select **Order (Mercado Pago)**, save the URL above and copy the signing secret into Supabase. Use the test configuration supported by your application. The official notification guide may display a tab labeled Production mode; that UI label must not be taken as permission to enable real payments. Keep TEST tokens/test accounts and the ORDTST guard.

If existing preference orders need notifications, preserve the existing **Payments** topic alongside Orders. Simulated notifications must reference a real retrievable test resource and carry a valid signature to affect state. Keep Supabase platform JWT verification disabled for the externally called webhook; the handler verifies the provider HMAC itself. Do not manually deploy through a CLI: application tooling manages Edge Function deployment.

## Database changes in this migration

Applied directly through Supabase; no manual migration files created:

- `orders`: added `mp_order_status`, `mp_order_status_detail`, `mp_order_request`.
- Added partial unique index `orders_mp_orders_api_id_key` on `mp_order_id` for `ORD…` IDs; legacy merchant-order data is preserved.
- Added `apply_mp_order(uuid,text,text,text,timestamptz,numeric,numeric)`: transactional verified Orders-state application, with row locking and TEST/full-payment checks. EXECUTE is revoked from PUBLIC/anon/authenticated and granted only to service_role.
- Reused `mp_payment_events` with identities `order:<mp_order_id>` and raw status/detail/update-date keys; RLS and admin-only read/server-only write grants remain unchanged.
- Existing pricing `create_order` RPC and legacy `apply_mp_payment` RPC are unchanged in this migration. No orders, products or existing data were deleted.

## Changed files in this migration

- `src/lib/mercadopago.ts` (new)
- `src/pages/CheckoutPage.tsx`
- `src/pages/MercadoPagoReturnPage.tsx`
- `supabase/functions/_shared/mercadopago.ts`
- `supabase/functions/create-order/index.ts`
- `supabase/functions/mercadopago-webhook/index.ts`
- `supabase/functions/mercadopago-status/index.ts`
- `supabase/functions/mercadopago-resume/index.ts` (new)
- `docs/mercadopago-phase-3.md`

Updated/new functions requiring managed deployment: **create-order, mercadopago-webhook, mercadopago-status, mercadopago-resume**. Shared-file changes are included in dependent-function deployments. Source changes alone do not constitute evidence of successful remote deployment; check the application deployment status before testing.

## Tests actually performed

- React workspace TypeScript checks passed.
- Rollback-only database integration assertions passed using isolated temporary fixtures: all four shipping rates, server prices ignoring spoofed browser totals/prices, box discount, six-bottle minimum, order idempotency, stock reserved once, initial unpaid state, amount/full-payment rejection, rejection of production resource IDs, verified approval, duplicate/stale webhook events, prevention of payment regression, partial/full refunds and client RPC privilege restrictions. Temporary product/order/event fixtures were rolled back; no existing business data was modified by these tests.
- Production build verification is reported in the implementation response.

These checks do **not** execute Deno Edge Functions, the HMAC handler over HTTP, or real Mercado Pago transactions. The integration is **not end-to-end tested or complete** until the steps below pass.

## Remaining acceptance tests

1. Supply missing webhook secret and the actual HTTPS site origin, then confirm all four function deployments succeed.
2. With a Mercado Pago TEST buyer/seller, start checkout and verify `POST /v1/orders` succeeds with the configured token, returns an ORDTST ID and usable `checkout_url`, and persists that ID. If `invalid_credentials` occurs, resolve the documented credential conflict without enabling production.
3. Complete approved, pending, failed and cancelled test transactions. Verify the signed Orders webhook and direct GET response, matching totals/raw status, event history and customer messages. No browser-only success may confirm payment.
4. Resend a valid notification and retry after a lost checkout response. Confirm the same local order, remote resource and request UUID, with stock reserved once. A 409 must never cause a new UUID/order.
5. Verify invalid/missing/modified HMACs, wrong resource/reference/amount/currency and non-TEST resources cannot change state. Confirm valid delayed provider retries remain idempotent.
6. Test wrong/lost guest capability, callback parameter collisions, reloads and partial/full-refund scenarios.
7. Regression-test transfer checkout and all existing tariffs in the browser. Do not use real cards or buyers.

The pre-existing email integration and admin product panel are outside this migration. No automatic email claims are made by this work; their previously identified configuration/security issues remain separate work.

## Official documentation inspected

- https://www.mercadopago.com.ar/developers/en/reference/online-payments/checkout-pro/create-order/post
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/create-order
- https://www.mercadopago.com.ar/developers/en/reference/online-payments/checkout-pro/get-order/get
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/web-integration/configure-back-urls
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/notifications
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/payment-management/status/order-status
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/integration-test-introduction
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/resources/credentials
