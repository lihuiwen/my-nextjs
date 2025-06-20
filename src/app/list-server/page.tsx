// src/app/page.tsx
import React from 'react';

type Post = {
  id: number;
  title: string;
};

export default async function Page() {
  // 这个 fetch 会在服务端执行
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // 确保 SSR 不走缓存
  });

  const posts: Post[] = await res.json();

  return (
    <main>
      <h1>服务端渲染的帖子列表</h1>
      <ul>
        {posts.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
