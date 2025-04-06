// pages/index.tsx
import { client } from '../libs/client';
import Link from 'next/link';

export default function Home({ blog }: any) {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {blog.map((item: any) => (
          <li key={item.id}>
            <Link href={`/blog/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blog: data.contents,
    },
  };
};
