import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
    matcher: ["/admin", "/admin/:path*"]
}; 