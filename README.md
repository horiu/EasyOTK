# SVW Brinocalc

シンプルで使いやすい React 製計算アプリです。

## 技術スタック

- **React** - UI ライブラリ
- **TypeScript** - 型安全な JavaScript
- **Tailwind CSS** - ユーティリティファースト CSS フレームワーク
- **Vite** - 高速ビルドツール
- **GitHub Actions** - 自動デプロイ

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

このプロジェクトは GitHub Actions を使用して自動デプロイされます。

### GitHub Pages の設定

1. GitHub リポジトリの **Settings** > **Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. `main` ブランチにプッシュすると自動的にデプロイされます

### 自動デプロイの流れ

1. `main` ブランチにコードをプッシュ
2. GitHub Actions が自動的に実行
3. 依存関係のインストール
4. TypeScript のコンパイル
5. Vite でビルド
6. GitHub Pages にデプロイ

## ライセンス

MIT License
