'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 类型定义
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreatePostData {
  title: string;
  content: string;
  authorId: number;
  published: boolean;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

// API配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://1fbfby34gd.execute-api.us-east-2.amazonaws.com/dev'

export default function CreatePostPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 表单数据
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    authorId: 0,
    published: false,
  });

  // 表单验证错误
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    content?: string;
    authorId?: string;
  }>({});

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/database/users`, {
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
      
      // 直接解析为 User 数组，因为接口返回的就是用户数组
      const users: User[] = await response.json();
      
      // 直接设置用户数据
      setUsers(users);
      // 如果只有一个用户，自动选择
      if (users.length === 1) {
        setFormData(prev => ({ ...prev, authorId: users[0].id }));
      }
    } catch (err) {
      setError('网络错误，请检查连接');
      console.error('获取用户失败:', err);
    } finally {
      setLoading(false);
    }
  };

  // 表单验证
  const validateForm = (): boolean => {
    const errors: any = {};

    if (!formData.title.trim()) {
      errors.title = '标题不能为空';
    } else if (formData.title.length > 200) {
      errors.title = '标题不能超过200个字符';
    }

    if (!formData.content.trim()) {
      errors.content = '内容不能为空';
    } else if (formData.content.length < 10) {
      errors.content = '内容至少需要10个字符';
    }

    if (!formData.authorId) {
      errors.authorId = '请选择作者';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/database/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 如果需要身份验证，取消注释以下行
        // credentials: 'include',
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          authorId: formData.authorId,
          published: formData.published,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 直接解析返回的文章对象，创建成功后跳转到列表页
      await response.json();
      
      // 创建成功，跳转到列表页
      router.push('/posts');
    } catch (err) {
      setError('提交失败，请重试');
      console.error('创建文章失败:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // 重置表单
  const handleReset = () => {
    setFormData({
      title: '',
      content: '',
      authorId: users.length === 1 ? users[0].id : 0,
      published: false,
    });
    setValidationErrors({});
    setError(null);
  };

  // 组件挂载时获取用户列表
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">✏️ 创建文章</h1>
              <p className="text-gray-600 mt-2">分享您的想法和见解</p>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ← 返回
            </button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">⚠️</div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 作者选择 */}
            <div>
              <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-2">
                作者 <span className="text-red-500">*</span>
              </label>
              {loading ? (
                <div className="animate-pulse bg-gray-200 h-10 rounded-md"></div>
              ) : (
                <select
                  id="authorId"
                  value={formData.authorId}
                  onChange={(e) => setFormData({ ...formData, authorId: Number(e.target.value) })}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.authorId ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value={0}>请选择作者</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              )}
              {validationErrors.authorId && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.authorId}</p>
              )}
            </div>

            {/* 标题 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="请输入文章标题"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                maxLength={200}
              />
              <div className="flex justify-between mt-1">
                {validationErrors.title ? (
                  <p className="text-sm text-red-600">{validationErrors.title}</p>
                ) : (
                  <p className="text-sm text-gray-500">输入一个吸引人的标题</p>
                )}
                <p className="text-sm text-gray-400">{formData.title.length}/200</p>
              </div>
            </div>

            {/* 内容 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="请输入文章内容..."
                rows={12}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                  validationErrors.content ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between mt-1">
                {validationErrors.content ? (
                  <p className="text-sm text-red-600">{validationErrors.content}</p>
                ) : (
                  <p className="text-sm text-gray-500">详细描述您的想法</p>
                )}
                <p className="text-sm text-gray-400">{formData.content.length} 字符</p>
              </div>
            </div>

            {/* 发布选项 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                立即发布（否则保存为草稿）
              </label>
            </div>

            {/* 按钮组 */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                重置表单
              </button>
              
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium border border-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    submitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      创建中...
                    </span>
                  ) : (
                    `${formData.published ? '发布文章' : '保存草稿'}`
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 预览区域 */}
        {(formData.title || formData.content) && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">📋 预览</h3>
              <div className="prose max-w-none">
                {formData.title && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{formData.title}</h2>
                )}
                {formData.content && (
                  <div className="text-gray-700 whitespace-pre-wrap">{formData.content}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 