# Real Fight - 漫画ビューアアプリケーション

Real Fightは、モダンなウェブ技術を使用して構築された高性能な漫画・コミック閲覧アプリケーションです。Cloudflareのエッジプラットフォーム上で動作し、世界中のユーザーに最適化された読書体験を提供します。

## 🌟 主な機能

### 📖 漫画閲覧機能
- **レスポンシブデザイン**: デスクトップ、タブレット、スマートフォンに最適化
- **タッチジェスチャー**: スワイプによる直感的なページ送り
- **キーボードナビゲーション**: 矢印キーによる操作
- **フルスクリーンモード**: 没入感のある読書体験
- **画像プリロード**: スムーズなページ遷移のための先読み機能
- **日本語対応**: 完全な日本語ローカライゼーション

### 🔐 認証・管理機能
- **GitHub認証**: NextAuth v5を使用したセキュアな認証
- **管理者制限**: 環境変数による管理者アクセス制御
- **コミック管理**: 管理者による新しいコミックのアップロード
- **ドラッグ&ドロップ**: 直感的なファイルアップロード機能

### ⚡ パフォーマンス最適化
- **エッジデプロイメント**: Cloudflare Workersによる高速配信
- **画像最適化**: R2ストレージによる効率的な画像配信
- **データベース最適化**: D1データベースによる高速クエリ
- **キャッシュ戦略**: 最適化されたキャッシュ設定

## 🛠 技術スタック

### フロントエンド
- **Next.js 14**: App Routerを使用したモダンなReactフレームワーク
- **React 18**: 最新のReact機能とHooks
- **TypeScript**: 型安全な開発環境
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **React Dropzone**: ファイルアップロード機能

### バックエンド・API
- **Hono**: 高速で軽量なWebフレームワーク
- **Drizzle ORM**: 型安全なSQLiteクエリビルダー
- **NextAuth v5**: 認証・認可システム

### インフラストラクチャ
- **Cloudflare Pages**: 静的サイトホスティング
- **Cloudflare Workers**: サーバーレス関数実行環境
- **Cloudflare D1**: SQLiteベースのエッジデータベース
- **Cloudflare R2**: オブジェクトストレージ

## 📁 プロジェクト構成

このプロジェクトは2つのリポジトリで構成されています：

- **comic-cloudflare** (メインアプリケーション): 認証、データベース、管理機能を含む完全なフルスタックアプリケーション
- **REAL-FIGHT**: フロントエンドのみのシンプルなバージョン

### ディレクトリ構造

```
comic-cloudflare/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理者ページ
│   ├── api/               # API エンドポイント
│   ├── auth/              # 認証ページ
│   └── page.tsx           # メインページ
├── components/            # Reactコンポーネント
│   ├── comic/            # 漫画閲覧関連コンポーネント
│   └── controls/         # UI制御コンポーネント
├── db/                   # データベーススキーマ
├── lib/                  # ユーティリティ関数
├── auth.ts               # NextAuth設定
└── wrangler.jsonc        # Cloudflare設定
```

## 🚀 セットアップ手順

### 前提条件
- Node.js 18以上
- npm、yarn、またはpnpm
- Cloudflareアカウント
- GitHubアカウント（認証用）

### 1. リポジトリのクローン

```bash
git clone https://github.com/Kyoya67/comic-cloudflare.git
cd comic-cloudflare
```

### 2. 依存関係のインストール

```bash
npm install
# または
pnpm install
# または
yarn install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# NextAuth設定
AUTH_SECRET=your-auth-secret-here
AUTH_GITHUB_ID=your-github-oauth-app-id
AUTH_GITHUB_SECRET=your-github-oauth-app-secret
ADMIN_GITHUB_USERNAME=your-github-username

# Cloudflare設定
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
CLOUDFLARE_DATABASE_ID=your-d1-database-id
CLOUDFLARE_D1_TOKEN=your-d1-api-token

# サイトURL
NEXT_PUBLIC_SITE_URL=your-site-url
```

### 4. データベースのセットアップ

```bash
# データベースマイグレーションの生成
npm run db:generate

# データベースへの適用
npm run db:push
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認してください。

## 📊 データベーススキーマ

```sql
CREATE TABLE comics (
    id TEXT PRIMARY KEY,           -- UUID
    title TEXT NOT NULL,           -- コミックタイトル
    imageUrl TEXT NOT NULL,        -- 画像ファイルパス
    order INTEGER NOT NULL,        -- 表示順序
    updatedAt TEXT NOT NULL        -- 更新日時（ISO形式）
);
```

## 🔐 認証システム

### GitHub OAuth設定

1. GitHubで新しいOAuthアプリを作成
2. Authorization callback URLを設定: `https://your-domain.com/api/auth/callback/github`
3. Client IDとClient Secretを環境変数に設定

### 管理者アクセス制御

管理者機能へのアクセスは`ADMIN_GITHUB_USERNAME`環境変数で制御されます。指定されたGitHubユーザー名のみが管理者機能にアクセスできます。

## 🚀 デプロイメント

### Cloudflareへのデプロイ

1. **Wrangler CLIのインストール**
```bash
npm install -g wrangler
```

2. **Cloudflareへのログイン**
```bash
wrangler login
```

3. **D1データベースの作成**
```bash
wrangler d1 create real-fight
```

4. **R2バケットの作成**
```bash
wrangler r2 bucket create real-fight
```

5. **環境変数の設定**
```bash
wrangler secret put AUTH_SECRET
wrangler secret put AUTH_GITHUB_ID
wrangler secret put AUTH_GITHUB_SECRET
wrangler secret put ADMIN_GITHUB_USERNAME
```

6. **デプロイの実行**
```bash
npm run deploy
```

### 設定ファイル

`wrangler.jsonc`でCloudflareの設定を管理：

```json
{
  "name": "real-fight",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "real-fight"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "real-fight"
    }
  ]
}
```

## 🎯 使用方法

### 一般ユーザー
1. サイトにアクセス
2. 漫画一覧から読みたい作品を選択
3. タッチジェスチャーまたはキーボードでページ送り
4. フルスクリーンボタンで没入感のある閲覧

### 管理者
1. GitHubアカウントでログイン
2. 管理者ページにアクセス
3. 新しい漫画をアップロード
4. 既存の漫画を管理

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# リンター実行
npm run lint

# データベースマイグレーション生成
npm run db:generate

# データベースマイグレーション適用
npm run db:push

# Cloudflareデプロイ
npm run deploy

# プレビューデプロイ
npm run preview
```

## 📈 パフォーマンス最適化

このアプリケーションには以下の最適化が実装されています：

- **画像プリロード**: 現在のページの前後2ページを先読み
- **エッジキャッシュ**: Cloudflareのグローバルネットワークを活用
- **コンポーネント最適化**: React.memoとuseMemoによる再レンダリング防止
- **データベースインデックス**: 頻繁にクエリされるフィールドの最適化

詳細な効率性分析については、[EFFICIENCY_REPORT.md](./EFFICIENCY_REPORT.md)を参照してください。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🆘 サポート

問題や質問がある場合は、GitHubのIssuesページで報告してください。

---

## English Version

# Real Fight - Manga Viewer Application

Real Fight is a high-performance manga/comic viewing application built with modern web technologies, deployed on Cloudflare's edge platform to provide an optimized reading experience for users worldwide.

## 🌟 Key Features

### 📖 Manga Reading
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Touch Gestures**: Intuitive swipe navigation
- **Keyboard Navigation**: Arrow key controls
- **Fullscreen Mode**: Immersive reading experience
- **Image Preloading**: Smooth page transitions
- **Japanese Localization**: Complete Japanese language support

### 🔐 Authentication & Admin
- **GitHub Authentication**: Secure authentication using NextAuth v5
- **Admin Restrictions**: Environment-based admin access control
- **Comic Management**: Admin comic upload functionality
- **Drag & Drop**: Intuitive file upload interface

### ⚡ Performance Optimization
- **Edge Deployment**: Fast delivery via Cloudflare Workers
- **Image Optimization**: Efficient image serving with R2 storage
- **Database Optimization**: High-speed queries with D1 database
- **Caching Strategy**: Optimized caching configuration

## 🛠 Tech Stack

### Frontend
- **Next.js 14**: Modern React framework with App Router
- **React 18**: Latest React features and Hooks
- **TypeScript**: Type-safe development environment
- **Tailwind CSS**: Utility-first CSS framework
- **React Dropzone**: File upload functionality

### Backend & API
- **Hono**: Fast and lightweight web framework
- **Drizzle ORM**: Type-safe SQLite query builder
- **NextAuth v5**: Authentication and authorization system

### Infrastructure
- **Cloudflare Pages**: Static site hosting
- **Cloudflare Workers**: Serverless function execution
- **Cloudflare D1**: SQLite-based edge database
- **Cloudflare R2**: Object storage

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Kyoya67/comic-cloudflare.git
cd comic-cloudflare
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` with required variables (see setup section above)

4. **Run development server**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

For detailed setup instructions, deployment guide, and API documentation, please refer to the Japanese section above.

---

*Built with ❤️ using Next.js, Cloudflare, and modern web technologies*
