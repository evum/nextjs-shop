// middleware.ts
import { auth } from "@/auth"
import type { NextRequest } from "next/dist/server/web/exports"
import { NextResponse } from "next/server"

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Защищаем админ-панель
  if (pathname.startsWith("/admin")) {
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
})

// Настраиваем, на какие пути распространяется middleware
export const config = {
  matcher: ["/admin/:path*"],
}
