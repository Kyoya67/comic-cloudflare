import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        ...authConfig.callbacks,
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