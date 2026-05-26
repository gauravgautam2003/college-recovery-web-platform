/**
 * Prisma integration placeholder.
 *
 * The live app currently uses `src/lib/store.ts` for in-memory demo data.
 * Keep this file import-safe during deployment because `src/generated/prisma`
 * is generated at build/install time and may not exist before Prisma runs.
 */

export function getPrismaUnavailableMessage() {
    return "Prisma repositories are not wired yet. Connect repositories to prisma/schema.prisma before using PrismaClient.";
}
