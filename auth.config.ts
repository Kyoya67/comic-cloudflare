import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        authorized: ({ auth, request: { nextUrl } }) => {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');

            if (isOnAdmin) {
                if (isLoggedIn) return true;
                return false;
            }
            return true;
        },
    },
} satisfies NextAuthConfig