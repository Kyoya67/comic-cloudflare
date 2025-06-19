This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About Comic Viewer

A modern comic viewing application built with Next.js and Cloudflare. This
open-source project allows you to create your own comic website with just
Cloudflare configuration and GitHub authentication setup!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Touch Gestures**: Intuitive swipe navigation
- **Keyboard Navigation**: Arrow key controls
- **Fullscreen Mode**: Immersive reading experience
- **Image Preloading**: Smooth page transitions
- **Admin Panel**: Upload and manage comics
- **GitHub Authentication**: Secure login system

## Tech Stack

- **Next.js 14.2.0**: Modern React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Cloudflare Pages**: Static site hosting
- **Cloudflare D1**: SQLite edge database
- **Cloudflare R2**: Object storage
- **NextAuth v5**: Authentication system

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Cloudflare account
- GitHub account (for authentication)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd comic-viewer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Create `.env.local`:

```env
# NextAuth
AUTH_SECRET=your-auth-secret
AUTH_GITHUB_ID=your-github-oauth-app-id
AUTH_GITHUB_SECRET=your-github-oauth-app-secret
ADMIN_GITHUB_USERNAME=your-github-username

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_DATABASE_ID=your-d1-database-id
CLOUDFLARE_D1_TOKEN=your-d1-token

# Site URL
NEXT_PUBLIC_SITE_URL=your-site-url
```

### 4. Cloudflare setup

```bash
# Create D1 database
wrangler d1 create comic-viewer-db

# Create R2 bucket
wrangler r2 bucket create comic-viewer-images

# Apply database migrations
wrangler d1 migrations apply comic-viewer-db --remote
```

### 5. Deploy

```bash
npm run build
npm run deploy
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.

## License

MIT License - feel free to use this project for your own comic sites!
