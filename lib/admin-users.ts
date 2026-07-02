import { prisma } from "@/lib/prisma";

export const ADMIN_USERS_ASSUMPTIONS = {
  digitalJournalProductId: "journal-21-dias",
  paidPurchaseStatuses: [
    "active",
    "approved",
    "complete",
    "completed",
    "paid",
    "success",
    "succeeded"
  ],
  printActivityModel: "AbundanceWallSignature"
} as const;

export const adminUserStatusFilters = [
  "all",
  "registered",
  "purchased",
  "activity",
  "ready"
] as const;

export type AdminUserStatusFilter = (typeof adminUserStatusFilters)[number];

export type AdminUserComputedStatus =
  | "Registrado"
  | "Compró cuaderno digital"
  | "Completó actividad"
  | "Listo para versión impresa";

export type AdminUserRow = {
  id: string;
  name: string | null;
  email: string;
  registeredAt: string;
  purchasedDigitalJournal: boolean;
  digitalJournalPurchasedAt: string | null;
  completedPrintActivity: boolean;
  printActivityCompletedAt: string | null;
  status: AdminUserComputedStatus;
};

export type AdminUsersResponse = {
  users: AdminUserRow[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalMatching: number;
  };
  counters: {
    totalUsers: number;
    purchasedDigitalJournal: number;
    completedPrintActivity: number;
    readyForPrintedVersion: number;
  };
  assumptions: typeof ADMIN_USERS_ASSUMPTIONS;
};

type GetAdminUsersOptions = {
  query?: string;
  status?: AdminUserStatusFilter;
  page?: number;
  pageSize?: number;
};

export async function getAdminUsers({
  query = "",
  status = "all",
  page = 1,
  pageSize = 10
}: GetAdminUsersOptions): Promise<AdminUsersResponse> {
  const normalizedPage = Math.max(page, 1);
  const normalizedPageSize = Math.min(Math.max(pageSize, 5), 50);
  const search = query.trim();

  const [totalUsers, digitalPurchases, printActivities] = await Promise.all([
    prisma.user.count(),
    prisma.purchase.findMany({
      where: digitalJournalPurchaseWhere(),
      distinct: ["userId"],
      select: {
        userId: true
      }
    }),
    prisma.abundanceWallSignature.findMany({
      where: {
        userId: {
          not: null
        }
      },
      distinct: ["userId"],
      select: {
        userId: true
      }
    })
  ]);

  const purchasedUserIds = digitalPurchases.map((purchase) => purchase.userId);
  const activityUserIds = printActivities
    .map((activity) => activity.userId)
    .filter((userId): userId is string => Boolean(userId));
  const purchasedSet = new Set(purchasedUserIds);
  const activitySet = new Set(activityUserIds);
  const readyUserIds = purchasedUserIds.filter((userId) => activitySet.has(userId));
  const statusIdFilter = getStatusIdFilter({
    status,
    purchasedUserIds,
    activityUserIds,
    readyUserIds,
    purchasedSet,
    activitySet
  });

  const where = {
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } }
          ]
        }
      : {}),
    ...(statusIdFilter ? { id: statusIdFilter } : {})
  };

  const [totalMatching, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      },
      skip: (normalizedPage - 1) * normalizedPageSize,
      take: normalizedPageSize,
      include: {
        purchases: {
          where: digitalJournalPurchaseWhere(),
          orderBy: {
            createdAt: "asc"
          }
        },
        abundanceWallSignatures: {
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    })
  ]);

  return {
    users: users.map((user) => {
      const firstPurchase = user.purchases[0] ?? null;
      const firstActivity = user.abundanceWallSignatures[0] ?? null;
      const purchasedDigitalJournal = Boolean(firstPurchase);
      const completedPrintActivity = Boolean(firstActivity);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        registeredAt: user.createdAt.toISOString(),
        purchasedDigitalJournal,
        digitalJournalPurchasedAt: firstPurchase?.createdAt.toISOString() ?? null,
        completedPrintActivity,
        printActivityCompletedAt: firstActivity?.createdAt.toISOString() ?? null,
        status: getComputedStatus(purchasedDigitalJournal, completedPrintActivity)
      };
    }),
    pagination: {
      page: normalizedPage,
      pageSize: normalizedPageSize,
      totalPages: Math.max(Math.ceil(totalMatching / normalizedPageSize), 1),
      totalMatching
    },
    counters: {
      totalUsers,
      purchasedDigitalJournal: purchasedSet.size,
      completedPrintActivity: activitySet.size,
      readyForPrintedVersion: readyUserIds.length
    },
    assumptions: ADMIN_USERS_ASSUMPTIONS
  };
}

function digitalJournalPurchaseWhere() {
  return {
    productId: ADMIN_USERS_ASSUMPTIONS.digitalJournalProductId,
    status: {
      in: [...ADMIN_USERS_ASSUMPTIONS.paidPurchaseStatuses]
    }
  };
}

function getComputedStatus(
  purchasedDigitalJournal: boolean,
  completedPrintActivity: boolean
): AdminUserComputedStatus {
  if (purchasedDigitalJournal && completedPrintActivity) {
    return "Listo para versión impresa";
  }

  if (completedPrintActivity) {
    return "Completó actividad";
  }

  if (purchasedDigitalJournal) {
    return "Compró cuaderno digital";
  }

  return "Registrado";
}

function getStatusIdFilter({
  status,
  purchasedUserIds,
  activityUserIds,
  readyUserIds,
  purchasedSet,
  activitySet
}: {
  status: AdminUserStatusFilter;
  purchasedUserIds: string[];
  activityUserIds: string[];
  readyUserIds: string[];
  purchasedSet: Set<string>;
  activitySet: Set<string>;
}) {
  if (status === "all") {
    return null;
  }

  if (status === "purchased") {
    return { in: purchasedUserIds.filter((userId) => !activitySet.has(userId)) };
  }

  if (status === "activity") {
    return { in: activityUserIds.filter((userId) => !purchasedSet.has(userId)) };
  }

  if (status === "ready") {
    return { in: readyUserIds };
  }

  return {
    notIn: Array.from(new Set([...purchasedUserIds, ...activityUserIds]))
  };
}
