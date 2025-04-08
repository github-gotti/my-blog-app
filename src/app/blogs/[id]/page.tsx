// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { client } from '@/libs/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'

export default async function Page({ params }) {
  const blog = await client.get({
    endpoint: 'blogs',
    contentId: params.id,
  });

  if (!blog) notFound();

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('ja-JP');

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blogs" className="text-blue-500 text-sm hover:underline block mb-4">
        ← 記事一覧に戻る
      </Link>

      {blog.eyecatch?.url && (
        <Image
          src={blog.eyecatch.url}
          alt="アイキャッチ"
          width={800}
          height={400}
          className="w-full h-auto rounded-xl object-cover"
        />
      )}

      <p className="text-sm text-gray-400 mb-1">投稿日：{formattedDate}</p>

      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        {blog.title}
      </h1>

      <div
        className="prose prose-invert prose-sm leading-relaxed max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
}
