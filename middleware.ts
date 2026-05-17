import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "gl_onboarded";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 온보딩 자체와 정적 자원은 통과
  if (
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js" ||
    pathname.startsWith("/workbox-") ||
    pathname.startsWith("/icon") ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // cookie 있으면 통과
  if (req.cookies.get(COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // 그 외는 온보딩 1단계로
  const url = req.nextUrl.clone();
  url.pathname = "/onboarding/1";
  return NextResponse.redirect(url);
}

export const config = {
  // 모든 경로에 적용 (위에서 명시적으로 통과시킬 것만 통과)
  matcher: ["/((?!_next/static|_next/image).*)"],
};
