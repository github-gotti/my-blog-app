// src/pages/index.tsx

import Link from 'next/link';
import { client } from '@/libs/client';

type Blog = {
  id: string;
  title: string;
};

type Props = {
  blogs: Blog[];
};

export default function Home({ blogs }: Props) {
  return (
    <main>
      <h1>Goのブログ</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

// SSGで記事一覧を取得
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blogs: data.contents,
    },
  };
};
