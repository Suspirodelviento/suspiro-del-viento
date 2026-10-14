# Mercado Pago Checkout Pro — Orders API migration (TEST only)

## Implemented architecture

New Mercado Pago checkouts use `POST https://api.mercadopago.com/v1/orders` with `type: online`, `processing_mode: manual`, `capture_mode: automatic`, decimal-string totals/item prices and return URLs in `config.online`. The frontend redirects to the actual returned `checkout_url`; it is no longer constructed from a preference's sandbox URL.

The existing `create-order` Edge Function still invokes the existing service-role-only `create_order` RPC. Prices, active products, stock, box discount (10%), six-bottle minimum and shipping (Valle de Uco 0; Gran Mendoza 6000; rest of Mendoza 10000; rest of Argentina 20000 ARS) remain server-authoritative. Transfer instructions, transfer confirmation UI, tariffs, products and Zustand are preserved.

The local UUID is Mercado Pago's external reference and `X-Idempotency-Key`. The exact request payload is saved once in `orders.mp_order_request`; concurrent requests and retries reuse this snapshot and UUID. Browser retries after a lost response do not create another local order. `mercadopago-resume` requires the original guest's high-entropy attempt key and resumes that saved order only. If Mercado Pago returns an idempotency conflict rather than the original resource, the order stays pending review; do not generate a new UUID or reset the request. An authorized operator must reconcile the resource using its external reference in Mercado Pago.

Existing preference-based orders retain their checkout URLs and verified Payments webhook path. New Orders notifications cannot be applied to them, and legacy Payments notifications cannot confirm a new Orders API order. Old ambiguous preference attempts are not automatically converted into a second payment operation.

## Fail-closed test seller identity verification

`MP_ACCESS_TOKEN` is read exclusively by Edge Function code. Its value is never printed. Official Checkout Pro Orders test-account documentation states that the automatically created test seller's credentials can begin with `APP_USR`; a token prefix alone does not identify a test account.

The server requires `MP_ENVIRONMENT=test`, an independently verified `MP_TEST_SELLER_ID`, valid token syntax (`APP_USR-…` or `TEST-…`), webhook secret and HTTPS site origin. Before a Mercado Pago order is created or its saved checkout resumed, async `mpConfig()` performs only **GET https://api.mercadopago.com/users/me**, with a five-second timeout, no caching and redirects disabled. It requires the exact configured seller ID, `site_id=MLA`, `country_id=AR` and an affirmative `test_user` tag. If the optional `test_user` flag is present, it must also be `true`. Missing/ambiguous metadata, mismatched identity, non-test accounts, HTTP failures, invalid JSON and timeouts fail closed. Identity responses and transport errors are not returned or logged. This GET does not create users, orders or payments.

The verified configuration is reused only within the current create-order request; there is no cross-request cache. Verification happens before the local order RPC/stock reservation. Resume performs the same verification. Webhooks authenticate HMAC before any outgoing profile request, then verify identity before retrieving/applying payment state.

Orders still require an `ORDTST…` ID, the matching reference/total, `online`/`manual`, ARS/ARG and the verified seller's `user_id`. Responses explicitly marked live are rejected. Orders API may omit `live_mode`; the affirmative test-profile marker and TEST resource ID remain mandatory. Legacy payment verification additionally requires its collector ID to match the verified seller. No arbitrary APP_USR credential can authorize payment operations.

If the provider profile omits the required test marker, remain blocked and resolve the API contract/account setup; never substitute an email/nickname/prefix guess. A test identity success is not proof of a completed Orders API purchase, which must be tested separately later with explicit authorization.

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

## Exact server secrets and independent verification steps

Set secrets in **Supabase → Project → Edge Functions → Manage Secrets**, never in Vite/browser code:

- `MP_ACCESS_TOKEN`: the current test seller credential from this application's test credentials. Already present; no credential was replaced by this implementation.
- `MP_ENVIRONMENT`: exactly `test`. Missing at this inspection; no default or production mode is accepted.
- `MP_TEST_SELLER_ID`: the positive decimal **Seller User ID independently copied from Mercado Pago Test accounts**, without whitespace or leading zeros. Missing at this inspection.
- `MP_WEBHOOK_SECRET`: the signing secret for this application's notifications. Present by name at this inspection; its value/signature pairing has not been verified.
- `PUBLIC_SITE_URL`: the real HTTPS store origin, without a path/query/fragment. Present by name; its value has not been read or verified. It must match the original checkout session's origin.

Existing managed `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are reused for order operations. No new frontend secret, SDK or public key is required.

Independent seller verification procedure:

1. Sign in to Mercado Pago Developers with the account that owns the correct Checkout Pro application. Open **Your integrations → application → Test accounts**.
2. Locate the automatically generated **Seller** test account for **Argentina**. Record its **User ID** from that screen. Do not use the real account ID, buyer ID, application ID, or a value inferred from the token.
3. Independently check that the existing secret was sourced from this application's **Tests → Test credentials**, associated with that seller. Never paste the credential in chat. Do not change real production credentials.
4. Set `MP_TEST_SELLER_ID` from step 2 and `MP_ENVIRONMENT=test` in Supabase. Never populate the expected ID from `/users/me` merely to make a mismatched credential pass.
5. Confirm the application's webhook secret and the store's actual HTTPS origin are correctly configured. Keep the buyer and seller test accounts in Argentina.
6. After the dependent Edge Functions have redeployed, invoke **create-order** using the Supabase Dashboard Test/Invoke panel with only this JSON:

```json
{"payment_method":"mercadopago","verification_only":true}
```

This explicit read-only branch validates settings, requests `/users/me`, checks the independent identity and returns only:

```json
{"test_credentials_verified":true,"environment":"test","country":"AR","purchase_performed":false}
```

It never calls `create_order`, reads/modifies products, reserves stock, creates a Mercado Pago order or returns the token/profile/seller ID. On any failure, keep payments blocked. Do not alter the seller ID to match an unexpected identity or weaken the test-marker checks.

No live profile verification was performed during this implementation because the required independently verified ID and environment setting are absent. The configured token is not yet declared verified. Do not run a purchase as part of this identity-only preparation.

In **Mercado Pago → Your integrations → application → Webhooks → Configure notifications**, select **Order (Mercado Pago)**, save the URL above and copy the signing secret into Supabase. Use the test configuration supported by your application. The official notification guide may display a tab labeled Production mode; that UI label must not be taken as permission to enable real payments. Keep independently verified test accounts and the ORDTST guard.

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

## Tests and verification scope

- Current identity update: 35 sandbox tests passed. 28 executed the actual validator source with only TypeScript annotations removed: valid matched sellers, both token formats, missing/production/ambiguous environment, invalid token/ID formats, malformed identities, exact ID matching, Argentina country/site, missing/false/ambiguous test markers, unsafe numeric IDs and sanitized failures. Seven executed the actual identity lookup orchestration with mocked transport/timeout: GET-only/no-redirect/no-cache contract, success, HTTP/network/timeout/JSON failures, wrong seller and missing settings blocking the request. Only synthetic fixtures were used; zero real provider requests and zero business-data writes.
- Workspace TypeScript checks passed. Production build results are reported in the implementation response. These checks do not type-check or run the Deno HTTP runtime.
- Earlier Orders migration: rollback-only RPC assertions covered tariffs, prices, minimum/discount, stock/order/event idempotency and payment states. They were not re-run by this identity-only update; no orders, products, schema or database records were modified by this update.

Actual `/users/me` verification with the configured credential is blocked until the independent seller ID/environment secrets are supplied. No purchase was run. The integration is **not end-to-end tested or complete**.

Identity update files: `supabase/functions/_shared/mp-test-identity.ts` (new), `supabase/functions/_shared/mercadopago.ts`, `supabase/functions/create-order/index.ts`, `supabase/functions/mercadopago-webhook/index.ts` and this document. Shared dependencies require managed redeployment of **create-order, mercadopago-resume, mercadopago-webhook**; mercadopago-status is unchanged.

## Remaining acceptance tests (only after explicit authorization for a later purchase test)

1. Complete the independent seller setup and read-only verification procedure above; confirm dependent function deployments succeed.
2. Only after a verified Argentina TEST seller and later purchase-test authorization, start a test checkout and verify `POST /v1/orders` succeeds, returns an ORDTST ID and usable `checkout_url`, and persists the verified seller's resource. If it fails, remain blocked rather than selecting a production token.
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
- https://www.mercadopago.com.ar/developers/en/docs/checkout-pro-orders/resources/your-integrations/test/accounts
