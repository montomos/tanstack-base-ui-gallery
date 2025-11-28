# デプロイガイド

このプロジェクトは複数のデプロイ方法をサポートしています。

## 1. Cloudflare Workers へのデプロイ

```bash
pnpm deploy
```

## 2. Internal Server へのデプロイ

### 方法A: Dockerを使用

```bash
# Dockerイメージをビルド
pnpm docker:build

# コンテナを実行
pnpm docker:run

# または docker-compose を使用
pnpm docker:compose
```

### 方法B: デプロイスクリプトを使用

```bash
# デプロイアーカイブを作成
pnpm deploy:internal

# サーバー環境変数を設定（オプション）
export SERVER_HOST=your-server.com
export SERVER_USER=deploy
export DEPLOY_PATH=/var/www/tanstack-base-ui-gallery

# デプロイスクリプトを実行
./deploy.sh production
```

### 方法C: 手動デプロイ

```bash
# 1. アプリケーションをビルド
pnpm install
pnpm build

# 2. .output ディレクトリをサーバーにアップロード

# 3. サーバー上で依存関係をインストール
pnpm install --prod

# 4. アプリケーションを起動
node .output/server/index.js

# または PM2 を使用
pm2 start .output/server/index.js --name tanstack-base-ui-gallery
```

## 環境変数

必要に応じて以下の環境変数を設定してください：

- `NODE_ENV`: 環境（production, development）
- `PORT`: ポート番号（デフォルト: 3000）

## ヘルスチェック

アプリケーションは `/` エンドポイントでヘルスチェックが可能です。

## トラブルシューティング

### ポートが既に使用されている場合

```bash
# 別のポートで実行
PORT=3001 pnpm dev
```

### Docker ビルドエラー

```bash
# キャッシュなしでビルド
docker build --no-cache -t tanstack-base-ui-gallery .
```
