import { NextResponse, type NextRequest } from "next/server";

// Must match SESSION_COOKIE in src/lib/auth/session.ts (that module is server-only).
const SESSION_COOKIE = "uosg_session";

/**
 * Optimistic check only: sends visitors without a session cookie to the login page.
 * Real authorization happens in pages and server actions (src/lib/auth/current-user.ts).
 */
export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
