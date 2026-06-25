import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const client = new PrismaClient({ adapter });
export const prisma = globalForPrisma.prisma || client;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
