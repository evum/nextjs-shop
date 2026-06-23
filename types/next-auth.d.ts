// types/next-auth.d.ts
import type { UserRole } from "@prisma/client"
import type { Session } from "next-auth"

declare module "next-auth" {
  interface User {
    role: UserRole
  }
  interface Session {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }
}

declare module "next/server" {
  interface NextRequest {
    auth: Session;
  }
}
