# SVW Brinocalc

シンプルで使いやすい React 製計算アプリです。

## 技術スタック

- **React** - UI ライブラリ
- **TypeScript** - 型安全な JavaScript
- **Tailwind CSS** - ユーティリティファースト CSS フレームワーク
- **Vite** - 高速ビルドツール
- **gh-pages** - GitHub Pages デプロイツール

## 機能

- 基本的な四則演算（+、-、×、÷）
- 小数点計算
- 平方根（√）
- 二乗計算（x²）
- レスポンシブデザイン

## 開発

### 前提条件

- Node.js 18 以上
- pnpm

### セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

### ビルド

```bash
# プロダクションビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview
```

## デプロイ

このプロジェクトは `gh-pages` パッケージを使用して GitHub Pages にデプロイします。

### GitHub Pages の設定

1. GitHub リポジトリの **Settings** > **Pages** に移動
2. **Source** を **Deploy from a branch** に設定
3. **Branch** を **gh-pages** に設定

### デプロイ手順

```bash
# プロダクションビルドとデプロイを実行
pnpm run deploy
```

### デプロイの流れ

1. `pnpm run deploy` コマンドを実行
2. TypeScript コンパイルと Vite ビルドが実行される
3. `dist` フォルダの内容が `gh-pages` ブランチにプッシュされる
4. GitHub Pages が自動的にサイトを更新

## ライセンス

MIT License
