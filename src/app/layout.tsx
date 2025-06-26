import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NestJS API Demo',
  description: 'GitHub 仓库和文章管理系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-xl font-bold text-gray-900">
                  📝 Demo App
                </a>
                <div className="flex space-x-6">
                  <a href="/posts" className="text-gray-600 hover:text-gray-900 transition-colors">
                    文章列表
                  </a>
                  <a href="/posts/create" className="text-gray-600 hover:text-gray-900 transition-colors">
                    写文章
                  </a>
                  <a href="/github/repositories" className="text-gray-600 hover:text-gray-900 transition-colors">
                    GitHub 仓库
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}