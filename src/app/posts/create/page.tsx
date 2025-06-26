'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Author {
  id: number
  name: string
  email: string
}

export default function CreatePostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorId: '',
    published: false
  })
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/database/users`)
      if (!response.ok) throw new Error('Failed to fetch authors')
      const data = await response.json()
      setAuthors(data)
    } catch (err) {
      console.error('获取作者列表失败:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('请输入文章标题')
      return
    }
    
    if (!formData.authorId) {
      alert('请选择作者')
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch(`${API_BASE_URL}/database/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          authorId: parseInt(formData.authorId),
          published: formData.published
        })
      })

      if (!response.ok) throw new Error('创建失败')

      alert('文章创建成功！')
      router.push('/posts')
    } catch (err) {
      alert('创建失败，请重试')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (confirm('确定要取消吗？未保存的内容将丢失。')) {
        router.push('/posts')
      }
    } else {
      router.push('/posts')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">创建文章</h1>
        <p className="text-gray-600">填写下面的信息来创建新文章</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        {/* 文章标题 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            文章标题 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="请输入文章标题"
            required
          />
        </div>

        {/* 作者选择 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            作者 <span className="text-red-500">*</span>
          </label>
          {loading ? (
            <div className="text-gray-500">加载作者列表中...</div>
          ) : (
            <select
              name="authorId"
              value={formData.authorId}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">请选择作者</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name || author.email}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 文章内容 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            文章内容
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={12}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
            placeholder="请输入文章内容..."
          />
          <p className="text-xs text-gray-500 mt-1">
            已输入 {formData.content.length} 字符
          </p>
        </div>

        {/* 发布设置 */}
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">立即发布</span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            取消勾选将保存为草稿
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? '创建中...' : (formData.published ? '发布文章' : '保存草稿')}
          </button>
        </div>
      </form>
    </div>
  )
}
