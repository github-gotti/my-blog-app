import Link from 'next/link'
import { client } from '@/libs/client'

type Blog = {
  id: string
  title: string
  createdAt: string
  eyecatch?: {
    url: string
    width: number
    height: number
  }
  category?: {
    name: string
  }
}

export default async function BlogListPage() {
  const data = await client.get<{ contents: Blog[] }>({ endpoint: 'blogs' })

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        📝 ブログ一覧
      </h1>

      {/* レスポンシブ対応：1列→2列→3列 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.contents.map((post) => {
          const date = new Date(post.createdAt).toLocaleDateString('ja-JP')

          return (
            <div
              key={post.id}
              className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              {post.eyecatch?.url && (
                <img
                  src={post.eyecatch.url}
                  alt="アイキャッチ"
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{post.title}</h2>

                <p className="text-sm text-gray-400">投稿日：{date}</p>

                {post.category?.name && (
                  <span className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full self-start">
                    {post.category.name}
                  </span>
                )}

                <Link
                  href={`/blogs/${post.id}`}
                  className="text-blue-400 text-sm hover:underline mt-2"
                >
                  → 記事詳細を見る
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
