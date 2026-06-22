import { useEffect, useState } from "react";
import "./WordPressArea.css";
import { Link, useSearchParams } from "react-router-dom";

function WordPressArea({ posts }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState(searchParams.get("q") || "");
  const [debouncedSearchWord, setDebouncedSearchWord] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchWord(searchWord);

      if (searchWord.trim()) {
        setSearchParams({ q: searchWord });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchWord, setSearchParams]);

  const filteredPosts = posts.filter((post) => {
    const title = post.title.rendered.toLowerCase();

    return title.includes(debouncedSearchWord.toLowerCase());
  });

  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("wordpressListScrollY");

    if (!savedScrollY) return;

    requestAnimationFrame(() => {
      window.scrollTo({
        top: Number(savedScrollY),
        behavior: "instant",
      });
    });
  }, [filteredPosts.length]);

  return (
    <div className="wp-area">
      <div className="search-area">
        <input
          type="text"
          className="search-input"
          placeholder="記事を検索"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>

      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <p className="no-result">該当する記事がありません。</p>
        ) : (
          filteredPosts.map((post) => {
            const categories = post._embedded?.["wp:term"]?.[0] || [];

            return (
              <Link
                className="post-link"
                to={`/wordpress/${post.id}?q=${encodeURIComponent(debouncedSearchWord)}`}
                key={post.id}
                onClick={() => {
                  sessionStorage.setItem(
                    "wordpressListScrollY",
                    String(window.scrollY),
                  );
                }}
              >
                <article className="post-card">
                  <div className="post-content">
                    <p className="post-category">
                      {categories.map((cat) => cat.name).join(" / ")}
                    </p>

                    <h2 className="post-title">{post.title.rendered}</h2>

                    <time className="post-date">
                      {" "}
                      {post.date.split("T")[0]}
                    </time>
                  </div>

                  {post._embedded?.["wp:featuredmedia"]?.[0] ? (
                    <img
                      className="post-thumb"
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      alt=""
                    />
                  ) : (
                    <div className="nopic">画像なし</div>
                  )}
                </article>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default WordPressArea;
