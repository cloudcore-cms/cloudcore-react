import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getPageBySlug, getPosts } from '../lib/api';
import { BlockRenderer } from '../components/BlockRenderer';

export function Home() {
  const { data: homepage } = useQuery({
    queryKey: ['page', 'home'],
    queryFn: () => getPageBySlug('home'),
  });

  const { data: postsData } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => getPosts(3),
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {homepage ? (
        <BlockRenderer blocks={homepage.blocks} />
      ) : (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Cloudcore</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your headless CMS is ready. Create a page with slug "home" to customize
            this content.
          </p>
        </div>
      )}

      {postsData && postsData.items.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {postsData.items.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="text-blue-600 hover:underline">
              View all posts →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
