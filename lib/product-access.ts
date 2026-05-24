import type { User } from "@prisma/client";
import { isMayPromoActive } from "@/lib/may-promo";
import { prisma } from "@/lib/prisma";

const LEGACY_ACCESS_CUTOFF_UTC = new Date("2026-05-24T05:59:59.999Z");
const PAID_STATUSES = [
  "active",
  "approved",
  "complete",
  "completed",
  "paid",
  "success",
  "succeeded"
];

export const PRODUCT_ACCESS = {
  journal: ["journal-21-dias", "membresia-mensual"],
  agenda: ["agenda-anual", "membresia-mensual"]
};

export function hasLegacyAccess(user: Pick<User, "createdAt" | "role">) {
  return user.role === "admin" || user.createdAt <= LEGACY_ACCESS_CUTOFF_UTC;
}

export function hasMayFreeAccess() {
  return isMayPromoActive();
}

export async function hasProductAccess(
  user: Pick<User, "id" | "createdAt" | "role">,
  productIds: string[]
) {
  if (hasLegacyAccess(user) || hasMayFreeAccess()) {
    return true;
  }

  const purchase = await prisma.purchase.findFirst({
    where: {
      userId: user.id,
      productId: {
        in: productIds
      },
      status: {
        in: PAID_STATUSES
      }
    }
  });

  return Boolean(purchase);
}
