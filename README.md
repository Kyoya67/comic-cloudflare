# Real Fight - 漫画ビューアアプリケーション

Real Fightは、モダンなウェブ技術を使用して構築された高性能な漫画・コミック閲覧アプリケーションです。Cloudflareのエッジプラットフォーム上で動作し、世界中のユーザーに最適化された読書体験を提供します。

## 主な機能

### 漫画閲覧機能
- **レスポンシブデザイン**: デスクトップ、タブレット、スマートフォンに最適化
- **タッチジェスチャー**: スワイプによる直感的なページ送り
- **キーボードナビゲーション**: 矢印キーによる操作
- **フルスクリーンモード**: 没入感のある読書体験
- **画像プリロード**: スムーズなページ遷移のための先読み機能
- **日本語対応**: 完全な日本語ローカライゼーション

### コメント機能
- **コメント投稿**: 各漫画に対するコメント投稿機能
- **コメント表示**: 投稿されたコメントの一覧表示
- **ナビゲーションタブ**: 漫画一覧とコメント間の切り替え
- **リアルタイム更新**: コメント投稿後の即座な表示更新
- **文字数制限**: 500文字までのコメント投稿制限

### 認証・管理機能
- **GitHub認証**: NextAuth v5を使用したセキュアな認証
- **管理者制限**: 環境変数による管理者アクセス制御
- **コミック管理**: 管理者による新しいコミックのアップロード
- **ドラッグ&ドロップ**: 直感的なファイルアップロード機能

### パフォーマンス最適化
- **エッジデプロイメント**: Cloudflare Workersによる高速配信
- **画像最適化**: R2ストレージによる効率的な画像配信
- **データベース最適化**: D1データベースによる高速クエリ
- **キャッシュ戦略**: 最適化されたキャッシュ設定

## 技術スタック

### フロントエンド
- **Next.js 14.2.0**: App Routerを使用したモダンなReactフレームワーク
- **React 18**: 最新のReact機能とHooks
- **TypeScript**: 型安全な開発環境
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **React Dropzone**: ファイルアップロード機能

### バックエンド・API
- **Hono 4.7.11**: 高速で軽量なWebフレームワーク
- **Drizzle ORM 0.44.2**: 型安全なSQLiteクエリビルダー
- **NextAuth v5.0.0-beta.28**: 認証・認可システム

### インフラストラクチャ
- **Cloudflare Pages**: 静的サイトホスティング
- **Cloudflare Workers**: サーバーレス関数実行環境
- **Cloudflare D1**: SQLiteベースのエッジデータベース
- **Cloudflare R2**: オブジェクトストレージ

## プロジェクト構成

このプロジェクトは2つのリポジトリで構成されています：

- **comic-cloudflare** (メインアプリケーション): 認証、データベース、管理機能、コメント機能を含む完全なフルスタックアプリケーション
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
│   ├── comic/            # 漫画閲覧・コメント関連コンポーネント
│   └── controls/         # UI制御コンポーネント
├── context/              # React Context
├── db/                   # データベーススキーマ
├── lib/                  # ユーティリティ関数
├── auth.ts               # NextAuth設定
├── auth.config.ts        # NextAuth設定ファイル
├── drizzle.config.ts     # Drizzle ORM設定
└── wrangler.jsonc        # Cloudflare設定
```

## セットアップ手順

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

## データベーススキーマ

### comicsテーブル
```sql
CREATE TABLE comics (
    id TEXT PRIMARY KEY,           -- UUID
    title TEXT NOT NULL,           -- コミックタイトル
    imageUrl TEXT NOT NULL,        -- 画像ファイルパス
    order INTEGER NOT NULL,        -- 表示順序
    updatedAt TEXT NOT NULL        -- 更新日時（ISO形式）
);
```

### commentsテーブル
```sql
CREATE TABLE comments (
    id TEXT PRIMARY KEY,           -- UUID
    comic_id TEXT NOT NULL,        -- コミックID（外部キー）
    content TEXT NOT NULL,         -- コメント内容
    created_at TEXT NOT NULL,      -- 作成日時（ISO形式）
    FOREIGN KEY (comic_id) REFERENCES comics(id)
);
```

## API エンドポイント

### コミック関連
- `GET /api/comics` - 全コミックの取得
- `POST /api/upload` - 新しいコミックのアップロード（管理者のみ）
- `GET /api/image/:filename` - R2ストレージからの画像配信

### コメント関連
- `GET /api/comics/:comicId/comments` - 特定コミックのコメント取得
- `POST /api/comics/:comicId/comments` - 新しいコメントの投稿

## 認証システム

### GitHub OAuth設定

1. GitHubで新しいOAuthアプリを作成
2. Authorization callback URLを設定: `https://your-domain.com/api/auth/callback/github`
3. Client IDとClient Secretを環境変数に設定
4. `ADMIN_GITHUB_USERNAME`環境変数で管理者を指定

### 管理者制限

管理者機能は以下の方法で制限されています：
- 環境変数`ADMIN_GITHUB_USERNAME`で指定されたGitHubユーザーのみアクセス可能
- `/admin`パスへのアクセスは認証が必要
- コミックアップロード機能は管理者のみ利用可能

## Cloudflareデプロイメント

### 1. Cloudflareリソースの準備

```bash
# D1データベースの作成
wrangler d1 create real-fight-db

# R2バケットの作成
wrangler r2 bucket create real-fight-images
```

### 2. 環境変数の設定

Cloudflare Dashboardで以下の環境変数を設定：
- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `ADMIN_GITHUB_USERNAME`
- `NEXT_PUBLIC_SITE_URL`

### 3. データベースマイグレーション

```bash
# 本番環境へのマイグレーション適用
wrangler d1 migrations apply real-fight-db --remote
```

### 4. デプロイ

```bash
# プロダクションビルドとデプロイ
npm run deploy

# プレビューデプロイ
npm run preview
```

## 利用可能なスクリプト

```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー起動
npm run lint         # ESLintによるコード検査
npm run deploy       # Cloudflareへのデプロイ
npm run preview      # プレビューデプロイ
npm run cf-typegen   # Cloudflare型定義生成
npm run db:generate  # データベースマイグレーション生成
npm run db:push      # データベースマイグレーション適用
```

## パフォーマンス最適化

### 実装済み最適化
- **エッジキャッシュ**: Cloudflare CDNによる画像キャッシュ
- **画像プリロード**: 次のページの先読み機能
- **レスポンシブ画像**: デバイスに最適化された画像配信
- **データベースインデックス**: 頻繁にクエリされるフィールドの最適化
- **コンポーネント最適化**: React.memoとuseMemoによる再レンダリング防止

## コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## サポート

問題や質問がある場合は、GitHubのIssuesページで報告してください。
