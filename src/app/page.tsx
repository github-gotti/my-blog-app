// app/page.tsx
import { client } from '@/libs/client';

type Blog = {
  id: string;
  title: string;
};

export default async function HomePage() {
  const data = await client.get<{ contents: Blog[] }>({ endpoint: 'blogs' });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">ブログ一覧</h1>
      <ul>
        {data.contents.map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
