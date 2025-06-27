'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 类型定义
interface Author {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

interface ApiResponse {
  success: boolean;
  data: Post[];
  message?: string;
}

// API配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://1fbfby34gd.execute-api.us-east-2.amazonaws.com/dev'

export default function PostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取文章列表
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/database/posts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 如果需要身份验证，取消注释以下行
        // credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // 直接解析为 Post 数组，因为接口返回的就是文章数组
      const posts: Post[] = await response.json();
      
      // 直接设置文章数据
      setPosts(posts);
    } catch (err) {
      setError('网络错误，请检查连接');
      console.error('获取文章失败:', err);
    } finally {
      setLoading(false);
    }
  };

  // 删除文章
  const handleDelete = async (postId: number) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      await fetch(`${API_BASE_URL}/database/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // 如果需要身份验证，取消注释以下行
        // credentials: 'include',
      });
      
      // 删除请求发送后直接刷新数据
      fetchPosts();
    } catch (err) {
      alert('删除失败，请重试');
      console.error('删除文章失败:', err);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchPosts();
  }, []);

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 截取内容预览
  const getContentPreview = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">出错了</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📚 文章列表</h1>
              <p className="text-gray-600 mt-2">共 {posts.length} 篇文章</p>
            </div>
            <Link
              href="/posts/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              ✏️ 写文章
            </Link>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-500 mb-2">还没有文章</h3>
            <p className="text-gray-400 mb-6">创建您的第一篇文章开始吧！</p>
            <Link
              href="/posts/create"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              创建文章
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                {/* 文章头部 */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {getContentPreview(post.content)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? '已发布' : '草稿'}
                      </span>
                    </div>
                  </div>

                  {/* 作者信息 */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{post.author.name}</p>
                        <p className="text-xs">{post.author.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* 时间信息 */}
                  <div className="text-xs text-gray-400 mb-4">
                    <p>创建：{formatDate(post.createdAt)}</p>
                    {post.updatedAt !== post.createdAt && (
                      <p>更新：{formatDate(post.updatedAt)}</p>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm font-medium">
                      敬请期待 ✨
                    </span>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 刷新按钮 */}
        <div className="text-center mt-12">
          <button
            onClick={fetchPosts}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            🔄 刷新列表
          </button>
        </div>
      </main>
    </div>
  );
} 