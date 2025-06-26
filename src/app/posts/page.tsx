'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Author {
    id: number
    name: string
    email: string
}

interface Post {
    id: number
    title: string
    content: string
    published: boolean
    authorId: number
    createdAt: string
    updatedAt: string
    author: Author
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [users, setUsers] = useState<Author[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedAuthor, setSelectedAuthor] = useState<string>('all')
    const [showPublished, setShowPublished] = useState<string>('all')
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [postsRes, usersRes] = await Promise.all([
                fetch(`${API_BASE_URL}/database/posts`),
                fetch(`${API_BASE_URL}/database/users`)
            ])

            if (!postsRes.ok || !usersRes.ok) throw new Error('Failed to fetch data')

            const postsData = await postsRes.json()
            const usersData = await usersRes.json()

            setPosts(postsData)
            setUsers(usersData)
        } catch (err) {
            console.error('获取数据失败:', err)
        } finally {
            setLoading(false)
        }
    }

    const deletePost = async (postId: number) => {
        if (!confirm('确定要删除这篇文章吗？')) return

        try {
            const response = await fetch(`${API_BASE_URL}/database/posts/${postId}`, {
                method: 'DELETE'
            })

            if (!response.ok) throw new Error('删除失败')

            setPosts(posts.filter(post => post.id !== postId))
        } catch (err) {
            alert('删除失败')
        }
    }

    const filteredPosts = posts.filter(post => {
        const authorMatch = selectedAuthor === 'all' || post.authorId.toString() === selectedAuthor
        const publishedMatch = showPublished === 'all' ||
            (showPublished === 'published' && post.published) ||
            (showPublished === 'draft' && !post.published)

        return authorMatch && publishedMatch
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* 页面标题和操作 */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">文章列表</h1>
                    <p className="text-gray-600">共 {filteredPosts.length} 篇文章</p>
                </div>
                <Link
                    href="/posts/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    ✏️ 写文章
                </Link>
            </div>

            {/* 筛选器 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            作者筛选
                        </label>
                        <select
                            value={selectedAuthor}
                            onChange={(e) => setSelectedAuthor(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 text-sm"
                        >
                            <option value="all">全部作者</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id.toString()}>
                                    {user.name || user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            发布状态
                        </label>
                        <select
                            value={showPublished}
                            onChange={(e) => setShowPublished(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 text-sm"
                        >
                            <option value="all">全部状态</option>
                            <option value="published">已发布</option>
                            <option value="draft">草稿</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 文章列表 */}
            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {post.title}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <span>👤 {post.author.name || post.author.email}</span>
                                    <span>📅 {formatDate(post.createdAt)}</span>
                                    <span className={`px-2 py-1 rounded text-xs ${post.published
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {post.published ? '已发布' : '草稿'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => deletePost(post.id)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                >
                                    🗑️ 删除
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">
                            {post.content?.slice(0, 200) || '暂无内容'}
                            {(post.content?.length || 0) > 200 && '...'}
                        </p>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">暂无文章</p>
                    <Link
                        href="/posts/create"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        创建第一篇文章 →
                    </Link>
                </div>
            )}
        </div>
    )
}