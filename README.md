# Easy OTK - Shadowverse: Worlds Beyond リノセウス打点計算ツール

[![Website](https://img.shields.io/website?url=https%3A%2F%2Feasyotk.com)](https://easyotk.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Easy OTKはShadowverse: Worlds Beyondのリノセウス打点計算を行なうためのWebウェブアプリケーションです。

# 開発

## 前提条件

- Node.js 18 以上
- pnpm

### スクリプト

```bash
# 依存関係のインストール
pnpm install

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

# コードフォーマット
pnpm format
```

## デプロイ

このプロジェクトは `gh-pages` パッケージを使用して GitHub Pages にデプロイされます。以下のコマンドでデプロイを実行できます。

```bash
pnpm run deploy
```
