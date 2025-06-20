// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        cache: "no-store", // 可选，确保浏览器也不缓存
      });

      const postsTemp: Post[] = await res.json();
      setPosts(postsTemp);
    } catch (err) {
      console.error("请求失败", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <main>
      <h1>客户端交互：获取帖子列表</h1>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <ul>
          {posts.slice(0, 5).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
