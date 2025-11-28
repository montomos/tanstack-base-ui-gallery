# Deno サポート

このプロジェクトはDeno Deployへのデプロイをサポートしています。

## Deno Deploy へのデプロイ

### 1. Deno Deploy に接続

1. [Deno Deploy](https://deno.com/deploy) にアクセス
2. GitHubアカウントでログイン
3. 「New Project」をクリック
4. このリポジトリを選択
5. プロジェクト名を設定（例: `tanstack-base-ui-gallery`）

### 2. 自動デプロイ

GitHub Actionsワークフローが設定されているため、`main`ブランチにpushすると自動的にデプロイされます。

### 3. 手動デプロイ

Deno Deploy CLIを使用して手動でデプロイすることもできます：

```bash
# Deno Deploy CLIをインストール
deno install -A -r https://deno.land/x/deploy/deployctl.ts

# デプロイ
deployctl deploy --project=tanstack-base-ui-gallery
```

## Deno の利点

- **高速なランタイム**: V8エンジンベースで高速
- **組み込みTypeScript**: 追加の設定なしでTypeScriptをサポート
- **セキュリティ**: デフォルトでサンドボックス化
- **モダンなWeb標準**: Web標準APIをサポート

## 設定ファイル

- `deno.json`: Denoの設定ファイル
- `.github/workflows/deploy-deno.yml`: Deno Deploy用のGitHub Actionsワークフロー
- `.github/workflows/ci.yml`: CI/CDワークフロー（Denoチェック含む）

## 注意事項

現在のプロジェクトは主にNode.js/pnpmベースで動作しますが、Deno Deployへのデプロイも可能です。
Cloudflare Workersへのデプロイも引き続き利用可能です。

