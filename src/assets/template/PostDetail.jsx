import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./PostDetail.css";

function PostDetail({ posts }) {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("q") || "";
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://huku82.net/portfolio/wp-json/wp/v2/posts/${postId}?_embed`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, [postId]);

  if (!post) {
    return <p>読み込み中です。</p>;
  }

  const categories = post._embedded?.["wp:term"]?.[0] || [];

  const sidePosts = posts.filter((item) => {
    const title = item.title.rendered.toLowerCase();

    const matchesSearch = title.includes(searchWord.toLowerCase());
    const isNotCurrentPost = item.id !== Number(postId);

    return matchesSearch && isNotCurrentPost;
  });

  return (
    <div className="post-detail-layout">
      <article className="post-detail">
        <Link
          className="back-to-list"
          to={`/wordpress?q=${encodeURIComponent(searchWord)}`}
        >
          ← 一覧へ戻る
        </Link>
        <div className="time-category">
          {/* 投稿日 */}
          <time className="post-detail-date">{post.date.split("T")[0]}</time>
          {/* カテゴリー */}
          <p className="post-detail-category">
            {categories.map((cat) => cat.name).join(" / ")}
          </p>
        </div>
        {/* タイトル */}
        <h1 className="post-detail-title">{post.title.rendered}</h1>

        <div
          className="post-detail-content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />
      </article>

      {/* サイドバー */}
      <aside className="post-sidebar">
        <p className="post-sidebar-title">
          {searchWord ? `「${searchWord}」の検索結果` : "記事一覧"}
        </p>

        <div className="post-sidebar-list">
          {sidePosts.map((item) => (
            <Link
              className="post-sidebar-link"
              to={`/wordpress/${item.id}?q=${encodeURIComponent(searchWord)}`}
              key={item.id}
            >
              {item.title.rendered}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default PostDetail;
