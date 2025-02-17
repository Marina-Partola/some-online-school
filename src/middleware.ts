import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locales = ["en", "ru"];
  const defaultLocale = "en";

  const pathLocale = pathname.split("/")[1];
  const isValidLocale = locales.includes(pathLocale);

  if (!isValidLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
