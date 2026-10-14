# Phase 3 — Mercado Pago Checkout Pro (TEST only)

## Implemented

The existing guest `create-order` flow still invokes the service-role-only, idempotent `create_order` RPC. That RPC remains authoritative for active products, stock, six-bottle minimum, box discount (10%) and shipping (0 / 6000 / 10000 / 20000 ARS). Bank transfer retains its existing instructions and confirmation UI.

Mercado Pago uses the established Checkout Pro Preferences API (`POST /checkout/preferences`), not the newer Orders API. Current documentation access was denied during implementation, so compatibility with the newer Orders API could not be established. The server returns `checkout_url`, mapped from `sandbox_init_point`. No production checkout is accepted.

The local order ID is the provider external reference and unique `X-Idempotency-Key`. In addition to the header, a durable database claim prevents concurrent preference creation. A stored preference is reused. An ambiguous failure is marked `review_required`; it is deliberately NOT retried automatically because remote preference creation and local persistence cannot be committed atomically. This protection does not assume that Preferences honors the header. An authorized operator must reconcile that order in Mercado Pago before resetting any claim; never reset it blindly or ask the customer to create another order. The existing stock reservation remains in place; this phase does not introduce stock expiration/restoration.

The webhook accepts signed Payments notifications. HMAC-SHA256 verifies `data.id`, `x-request-id` and `ts` using `MP_WEBHOOK_SECRET`, with a 10-minute freshness window. The handler retrieves the payment and merchant order directly from Mercado Pago. It checks TEST mode, ARS, external reference, collector consistency, preference, merchant total and full payment amount before applying state. Invalid/unsupported notifications cannot change orders. This implementation does not process newer Orders API topics.

`approved` confirms a pending order. Rejected/cancelled/pending payment attempts do not confirm it and retain the local pending order so the same checkout can be continued. Refunds/chargebacks cancel the local order; a different later payment attempt cannot overwrite the confirmed payment. Preparation/shipping are never asserted by the payment integration.

Return URLs only contain order ID and a display hint. They never change payment state. The return page reads verified state with the original session's high-entropy capability, shows order details, polls up to one minute and allows manual refresh. Losing the original session requires contacting the store; there is no public lookup by order ID. The cart is cleared only after verified approval and only if it still matches the purchased cart.

## Required Supabase Edge Function secrets

Set these in **Project → Edge Functions → Manage Secrets**, not in Vite/browser environment variables:

- `MP_ACCESS_TOKEN`: TEST credential starting with `TEST-`. Other token formats are intentionally rejected. If Mercado Pago requires an `APP_USR-` token belonging to a test seller for your account, this integration will remain blocked; do not bypass the test guard without validating a safe test-user strategy against the current provider documentation.
- `MP_WEBHOOK_SECRET`: webhook signing secret for the same test application/environment.
- `PUBLIC_SITE_URL`: the exact HTTPS origin of the deployed store, without a path/query/fragment. No canonical deployment domain was found in the repository. `vercel.json` already provides an SPA fallback for the new return route. The value must be obtained from the actual deployment, not invented or taken from an untrusted request header.

Existing server secrets `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are reused. No new frontend secret, Mercado Pago public key, SDK or Resend configuration is needed for this phase.

## Mercado Pago configuration

1. Use a test application/seller and test buyer, not real customers or cards.
2. Configure Payments webhooks for the TEST environment at:
   `https://nbgfbugsgjnuokfmraey.supabase.co/functions/v1/mercadopago-webhook`
3. Copy the corresponding signing secret to Supabase. Ensure delivered requests contain `data.id` in the query and `x-signature` / `x-request-id` headers. Dashboard sample notifications that are unsigned or not real retrievable test payments will not confirm an order.
4. Set the actual HTTPS store origin in `PUBLIC_SITE_URL`. Checkout return URLs are generated as `/checkout/mercadopago?order_id=…&result=success|pending|failure`.
5. Keep Supabase platform JWT verification disabled for the externally called webhook; its HMAC validation is the authentication boundary. Edge Functions are managed/deployed by the application tooling.
6. Validate TEST credential compatibility, sandbox redirects and signature format against the current Mercado Pago documentation before release. Production tokens and payments remain blocked.

## Database changes applied directly to Supabase

No manual migration files were created; platform-generated migrations may appear automatically.

- `orders`: added `mp_preference_id` (unique), `mp_order_id`, `mp_payment_id`, `mp_payment_status`, `mp_payment_updated_at`, `mp_checkout_url`, `mp_checkout_state` (`creating` / `ready` / `review_required`), `payment_confirmed_at`. Existing data, status constraint, tariffs and RLS/admin policies are preserved.
- `create_order(text,text,text,text,text,text,text,jsonb,text,text)`: accepts `transfer` and `mercadopago`, saves that method and rejects reuse of an attempt for a different method/email. Corrected the email regex escaping; all existing price/shipping/stock calculations remain unchanged. Other overloads remain untouched and service-role-only.
- `mp_payment_events`: verified payment event history, primary key `(payment_id, provider_status, provider_updated_at)`. RLS enabled, full service-role grants, SELECT granted to authenticated with admin-only policy; no anonymous access or client writes.
- `apply_mp_payment(uuid,text,text,text,timestamptz,numeric,text)`: service-role-only RPC locks the order, validates the preference/full amount, inserts the event idempotently and applies non-stale state without regressing fulfillment. Duplicate notifications have no second effect.

## Changed application files

- `src/App.tsx`
- `src/pages/CheckoutPage.tsx`
- `src/pages/MercadoPagoReturnPage.tsx` (new)
- `supabase/functions/create-order/index.ts`
- `supabase/functions/_shared/mercadopago.ts` (new)
- `supabase/functions/mercadopago-webhook/index.ts` (new)
- `supabase/functions/mercadopago-status/index.ts` (new)
- `docs/mercadopago-phase-3.md` (this document)

## Acceptance tests after configuring secrets

Use controlled catalog stock and test orders. Test checkout reserves stock just like bank transfer; do not delete existing data for testing.

1. **Transfer regression:** buy six bottles or a box, select transfer, check unchanged bank instructions and `pending_payment`. Verify each existing shipping zone and prices/discounts.
2. **Server validation:** fewer than six bottles, inactive products, excessive quantity, invalid address/email and tampered browser prices must not create an underpriced order. Verify the RPC remains unavailable to anon/authenticated callers.
3. **MP approval:** start a TEST checkout, complete an approved test payment. Confirm one local order/preference, matching ARS total including shipping, event history, `confirmed` and confirmation timestamp. Reload the return page.
4. **Pending/rejection/cancellation:** exercise available provider test scenarios. Confirm clear return messages, no false confirmation and no automatic preparation. A retry must reuse the same order and preference. Do not repay a pending transaction or a payment that appears debited without checking with the store.
5. **Forged redirect:** visit the return URL with `result=success` without a verified approved payment. The order must remain pending.
6. **Webhook authenticity:** invalid/missing HMAC, modified ID/request ID, old timestamp, live payment, currency/amount/reference mismatch must not confirm anything. Transient provider/database failures should return 503 for provider retries.
7. **Idempotency:** double-click, retry after losing the browser response, and resend the same valid notification. There must be one local order, one preference and one event for the same payment/status/provider timestamp; stock must be reserved once. Deliver an older pending notification after approval: it must not revert confirmation.
8. **Ambiguous preference failure:** simulate an interruption after the provider request. The order should be `review_required`, not silently create another preference. Reconcile manually before any reset.
9. **Privacy:** a different browser/session or wrong attempt key must not retrieve address or order details. Client roles cannot update payment events or invoke `apply_mp_payment`.
10. **Refund/chargeback:** using supported test tooling, confirm verified matching reversal is recorded and displayed as cancelled, not paid.

## Verification limits / pre-existing issues

React workspace type checks and the production build do not execute Deno Edge Functions or real Mercado Pago payments. End-to-end TEST/API/signature verification is blocked until credentials, webhook secret and the real public site origin are configured. Current provider documentation also needs validation because web lookup was denied.

The pre-existing `send-order-emails` function and admin product panel were inspected but not changed in this phase. The active secure order RPC does not invoke that mail function. The mail endpoint lacks caller authorization and its customer sender is a Gmail address rather than a verified Resend-domain sender. Automatic emails and order-management UI should not be represented as working or secure based on this payment integration; they require a separate scoped fix before using that endpoint. No Resend secret was found. Do not invoke it from this new payment flow.
