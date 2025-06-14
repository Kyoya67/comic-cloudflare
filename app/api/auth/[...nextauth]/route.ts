import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { Profile } from "next-auth";

interface GitHubProfile extends Profile {
    login: string;
    name: string;
    email: string;
    avatar_url: string;
}

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
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
                const githubProfile = profile as GitHubProfile;
                return allowedUsers.includes(githubProfile.login);
            }
            return false;
        },
        async session({ session }) {
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account?.provider === 'github') {
                const githubProfile = profile as GitHubProfile;
                token.githubUsername = githubProfile.login;
            }
            return token;
        },
    },
})

export { handler as GET, handler as POST }