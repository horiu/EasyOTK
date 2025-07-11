# Easy OTK - SVWB リノセウス打点計算ツール

ShadowVerse World Beyond の「リノセウス」打点計算ツールです。カードプレイの履歴を入力し、リアルタイムでダメージと必要 PP を計算します。

## 技術スタック

- **React** - UI ライブラリ
- **TypeScript** - 型安全な JavaScript
- **Mantine** - モダンな React UI ライブラリ
- **Tailwind CSS** - ユーティリティファースト CSS フレームワーク
- **Vite** - 高速ビルドツール
- **gh-pages** - GitHub Pages デプロイツール

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

### スクリプト

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# ローカル用ビルド（相対パス）
pnpm build:local

# ESLint によるコード検査
pnpm lint

# ビルド結果のプレビュー
pnpm preview

# GitHub Pages にデプロイ
pnpm deploy
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
pnpm deploy
```

### デプロイの流れ

1. `pnpm deploy` コマンドを実行
2. TypeScript コンパイルと Vite ビルドが実行される
3. `dist` フォルダの内容が `gh-pages` ブランチにプッシュされる
4. GitHub Pages が自動的にサイトを更新

## プロジェクト構成

```
src/
├── App.tsx                 # メインアプリケーション
├── main.tsx               # エントリーポイント
├── components/
│   └── Calculator.tsx     # メインの計算機コンポーネント
├── hooks/                 # カスタムフック（今後の拡張用）
└── styles/               # スタイル関連ファイル
```
