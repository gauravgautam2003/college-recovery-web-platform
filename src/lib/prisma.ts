import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient({} as ConstructorParameters<typeof PrismaClient>[0]);

export default prisma;
