import { PrismaClient } from '@prisma/client/edge'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless';

const prismaClientSingleton = () => {
	const connectionString = process.env.DATABASE_URL;
	const adapter = new PrismaNeon({ connectionString });
	return new PrismaClient({ adapter })
}

declare global {
  	var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  	globalThis.prisma = prisma
}
