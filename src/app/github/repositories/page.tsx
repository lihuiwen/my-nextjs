'use client'

import { useState, useEffect } from 'react'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  private: boolean
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export default function GitHubRepositoriesPage() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://1fbfby34gd.execute-api.us-east-2.amazonaws.com/dev'

  useEffect(() => {
    fetchRepositories()
  }, [])

  const fetchRepositories = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${API_BASE_URL}/github/repositories`)
      if (!response.ok) throw new Error('Failed to fetch repositories')
      const data = await response.json()
      setRepositories(data)
    } catch (err) {
      setError('获取仓库列表失败')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
  }

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-500',
    }
    return colors[language] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchRepositories}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">GitHub 仓库</h1>
        <p className="text-gray-600">共 {repositories.length} 个仓库</p>
      </div>

      {/* 刷新按钮 */}
      <div className="mb-6">
        <button
          onClick={fetchRepositories}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          刷新列表
        </button>
      </div>

      {/* 仓库列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {repo.name}
              </h3>
              {repo.private && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  私有
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {repo.description || '暂无描述'}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              {repo.language && (
                <div className="flex items-center">
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${getLanguageColor(repo.language)}`}
                  ></span>
                  {repo.language}
                </div>
              )}
              <div className="flex items-center space-x-4">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🔄 {repo.forks_count}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                更新于 {formatDate(repo.updated_at)}
              </span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                查看仓库 →
              </a>
            </div>
          </div>
        ))}
      </div>

      {repositories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无仓库数据</p>
        </div>
      )}
    </div>
  )
}