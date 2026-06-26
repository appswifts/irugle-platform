import { NextRequest, NextResponse } from "next/server";
import { getCountryBySlug } from "@/config/countries";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  const countryFromSubdomain = getCountryBySlug(hostname.split(".")[0]);

  if (countryFromSubdomain && !pathname.startsWith(`/${countryFromSubdomain.slug}`)) {
    const newPathname = `/${countryFromSubdomain.slug}${pathname}`;
    return NextResponse.rewrite(new URL(newPathname, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
