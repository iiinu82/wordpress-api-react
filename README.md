React WordPress API Portfolio

WordPress REST APIから投稿データを取得し、Reactで一覧・検索・詳細ページを表示するWebアプリケーションです。

Technologies
React
Vite
React Router DOM
JavaScript
CSS
WordPress REST API
WordPress

Main Features
WordPressの通常投稿をREST API経由で取得
投稿一覧の表示
アイキャッチ画像の表示
カテゴリーの表示
投稿日の表示
投稿タイトルによる検索
500msのデバウンス検索
検索ワードをURLクエリパラメータに保存
投稿詳細ページの表示
詳細ページ内でWordPress本文を表示
詳細ページ右側に投稿一覧を表示
検索中は、検索結果のみを詳細ページ右側の一覧に表示
一覧ページのスクロール位置を保存・復元
WordPress REST API

投稿一覧の取得には以下のエンドポイントを使用しています。

https://huku82.net/portfolio/wp-json/wp/v2/posts?_embed

\_embed を付けることで、投稿に紐づくカテゴリー情報やアイキャッチ画像情報を取得しています。

Routing
/wordpress
投稿一覧ページ
/wordpress/:postId
投稿詳細ページ
/wordpress?q=検索語
検索ワードを保持した投稿一覧ページ
/wordpress/:postId?q=検索語
検索条件を保持した投稿詳細ページ
