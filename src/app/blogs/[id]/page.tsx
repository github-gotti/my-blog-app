// app/blogs/[id]/page.tsx

import { client } from '@/libs/client';

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogDetailPage({ params }: Props) {
  const id = params.id;

  console.log('params:', params); // ← ここに { id: "◯◯◯" } が出るはず！

  const blog = await client.get({
    endpoint: 'blogs',
    contentId: id,
  });

  return (
    <main className="p-4">
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </main>
  );
}
