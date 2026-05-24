export const MAY_PROMO_END_UTC = new Date("2026-06-01T05:59:59.999Z");

export function isMayPromoActive() {
  return new Date() <= MAY_PROMO_END_UTC;
}

export const mayPromoEndLabel =
  "31 de mayo de 2026 a las 11:59pm hora centro de México";
