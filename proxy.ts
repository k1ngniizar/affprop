import { auth } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("Middleware check for logged in user:: ", isLoggedIn);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  // Logged-in users shouldn't see login/register
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Guests shouldn't access dashboard
  if (!isLoggedIn && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

// export const config = {
//   matcher: ["/login", "/register", "/dashboard/:path*"],
// };

// export { auth as proxy } from "@/auth";
