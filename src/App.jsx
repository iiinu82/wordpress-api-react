import { useEffect, useState } from "react";
import "./App.css";
import Header from "./assets/template/Header";
import PostDetail from "./assets/template/PostDetail";
import WordPressArea from "./assets/template/WordPressArea";
import { Routes, Route } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(
      "https://huku82.net/portfolio/wp-json/wp/v2/posts?_embed&per_page=100",
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WordPressArea posts={posts} />} />
        <Route path="/wordpress" element={<WordPressArea posts={posts} />} />
        <Route
          path="/wordpress/:postId"
          element={<PostDetail posts={posts} />}
        />
      </Routes>
    </>
  );
}

export default App;
