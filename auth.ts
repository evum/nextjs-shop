// auth.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { UserRole } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" }
      },
      async authorize(credentials) {
        // Здесь ваша логика проверки пользователя
        const user = await prisma.user.findFirst({
          where: { email: credentials.email }
        })
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      // Добавляем роль из базы данных в сессию
      session.user.role = user.role as UserRole;
      return session
    }
    // Если вы используете JWT-стратегию, нужен также jwt-колбэк:
    // async jwt({ token, user }) {
    //   if (user) token.role = user.role
    //   return token
    // },
  }
})
