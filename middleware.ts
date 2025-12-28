import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export default auth((req) => {
    const isLoggedIn = !!req.auth?.user;
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
    const isOnLogin = req.nextUrl.pathname === "/admin/login";

    if (isOnAdmin) {
        if (isOnLogin) {
            if (isLoggedIn) {
                return NextResponse.redirect(new URL("/admin", req.nextUrl));
            }
            return NextResponse.next();
        }
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
        }
        return NextResponse.next();
    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*"],
};
