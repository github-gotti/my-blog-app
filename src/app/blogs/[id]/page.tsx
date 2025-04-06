// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { client } from '@/libs/client';

// 本体：記事詳細表示
export default async function Page({ params }) {
  const blog = await client.get({
    endpoint: 'blogs',
    contentId: params.id,
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </main>
  );
}

// ビルド時に Next にパラメータを教える
export async function generateStaticParams() {
  const data = await client.get({ endpoint: 'blogs' });
  return data.contents.map((content) => ({
    id: content.id,
  }));
}
