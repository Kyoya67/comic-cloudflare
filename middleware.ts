import { auth } from "./auth"

export default auth((req) => {
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth;

    // /adminパスで認証が必要
    if (nextUrl.pathname.startsWith("/admin")) {
        if (!isAuthenticated) {
            return Response.redirect(new URL('/auth/signin', nextUrl));
        }
    }

    return;
});

export const config = {
    matcher: ["/admin/:path*"]
}; 