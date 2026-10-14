export function validateMpTestSettings(token: unknown, environment: unknown, sellerId: unknown) {
  if (environment !== "test") throw new Error("MP_ENVIRONMENT debe estar configurado exactamente como test. Producción está deshabilitada.");
  if (typeof token !== "string" || token.length > 512 || !/^(?:APP_USR-|TEST-)[A-Za-z0-9_-]+$/.test(token)) {
    throw new Error("MP_ACCESS_TOKEN falta o tiene un formato inválido. No se verificaron credenciales de prueba.");
  }
  if (typeof sellerId !== "string" || !/^[1-9][0-9]{0,19}$/.test(sellerId)) {
    throw new Error("Falta MP_TEST_SELLER_ID válido, verificado independientemente en las cuentas de prueba de Mercado Pago.");
  }
  return { token, sellerId, environment: "test" as const };
}

export function validateMpTestIdentity(identity: unknown, expectedSellerId: string) {
  const failure = "La identidad de Mercado Pago no coincide con el vendedor TEST de Argentina configurado. El pago permanece bloqueado.";
  if (!identity || typeof identity !== "object" || Array.isArray(identity)) throw new Error(failure);
  const user = identity as Record<string, unknown>;
  const validId = (typeof user.id === "string" && /^[1-9][0-9]{0,19}$/.test(user.id)) ||
    (typeof user.id === "number" && Number.isSafeInteger(user.id) && user.id > 0);
  if (!validId || String(user.id) !== expectedSellerId || user.site_id !== "MLA" || user.country_id !== "AR" ||
    !Array.isArray(user.tags) || !user.tags.includes("test_user") ||
    (user.test_user !== undefined && user.test_user !== true)) {
    throw new Error(failure);
  }
  return expectedSellerId;
}
