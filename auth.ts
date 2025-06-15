import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (!process.env.ADMIN_GITHUB_USERNAME) {
                throw new Error("Environment variable ADMIN_GITHUB_USERNAME is not defined.");
            }
            const allowedUsers = [
                process.env.ADMIN_GITHUB_USERNAME,
            ];

            if (account?.provider === 'github') {
                const githubProfile = profile as any;
                return allowedUsers.includes(githubProfile.login);
            }
            return false;
        },
        async session({ session }) {
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account?.provider === 'github') {
                const githubProfile = profile as any;
                token.githubUsername = githubProfile.login;
            }
            return token;
        },
    },
});

export const runtime = "edge"; 