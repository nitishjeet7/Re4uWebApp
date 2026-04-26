import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const rawDatabaseUrl = process.env.DATABASE_URL;
const devDatabaseUrl =
  rawDatabaseUrl && process.env.NODE_ENV === "development"
    ? `${rawDatabaseUrl}${rawDatabaseUrl.includes("?") ? "&" : "?"}connection_limit=1&pool_timeout=0`
    : rawDatabaseUrl;

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
    datasources: devDatabaseUrl ? { db: { url: devDatabaseUrl } } : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
