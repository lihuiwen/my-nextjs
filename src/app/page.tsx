import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      <div className="grid md:grid-cols-3 gap-8">
        <Link href="/posts" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">文章管理</h3>
            <p className="text-gray-600">查看和管理所有文章</p>
          </div>
        </Link>

        <Link href="/posts/create" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">✏️</div>
            <h3 className="text-xl font-semibold mb-2">创建文章</h3>
            <p className="text-gray-600">写一篇新的文章</p>
          </div>
        </Link>

        <Link href="/github/repositories" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-center">
            <div className="text-4xl mb-4">🐙</div>
            <h3 className="text-xl font-semibold mb-2">GitHub 仓库</h3>
            <p className="text-gray-600">查看你的仓库列表</p>
          </div>
        </Link>
      </div>
    </div>
  )
}