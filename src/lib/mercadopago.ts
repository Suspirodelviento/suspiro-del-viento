export function mercadoPagoCheckoutUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || !["www.mercadopago.com.ar", "sandbox.mercadopago.com.ar"].includes(url.hostname) || !url.pathname.startsWith("/checkout/")) return null;
    return url.href;
  } catch {
    return null;
  }
}
