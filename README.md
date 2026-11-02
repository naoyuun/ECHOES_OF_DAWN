# ECHOES OF DAWN — Official Website Concept

架空のゲーム公式サイトです。GitHub Pagesなどにアップロードして公開できるよう、4ページ構成に分割しています。

## ファイル構成

- `index.html` — TOPページ
- `world-story.html` — 世界観・ストーリー
- `characters.html` — キャラクター紹介（10人のプロフィール切り替え）
- `system.html` — ゲームシステム
- `css/reset.css` — リセットCSS
- `css/common.css` — 共通レイアウト・ヘッダー・フッター
- `css/top.css` — TOPページ専用CSS
- `css/world-story.css` — WORLD & STORYページ専用CSS
- `css/characters.css` — CHARACTERSページ専用CSS
- `css/system.css` — SYSTEMページ専用CSS
- `js/main.js` — 共通ナビゲーション、上部へ戻るボタン、キャラクター切り替えなど
- `images/characters/` — キャラクター10人分の立ち絵・顔画像

## 編集のヒント

- 色は `css/common.css` 冒頭の `:root` にあるCSS変数から変更できます。
- キャラクターの立ち絵・顔画像は `images/characters/` に配置済みです。差し替える場合は同じファイル名で置き換えるか、`js/main.js` の `art` / `portrait` を変更してください。
- CSSクラスは基本的に `block__element--modifier` のBEM記法を使っています。
- まず `index.html` をブラウザで開いて表示確認できます。ページ間リンクはHTMLファイル同士で移動します。

## GitHub Pagesへのアップロード

1. ZIPを展開します。
2. 展開したフォルダー内のファイル・フォルダーをGitHubリポジトリの最上位にアップロードします（`ECHOES_OF_DAWN` フォルダー自体をそのまま入れるのではなく、中身をアップロード）。
3. リポジトリの **Settings → Pages** から公開元を設定します。
4. 公開URLでTOP、WORLD & STORY、CHARACTERS、SYSTEMのリンクを確認します。
