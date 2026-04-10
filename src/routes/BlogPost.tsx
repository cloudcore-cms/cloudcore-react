import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/api';
import { BlockRenderer } from '../components/BlockRenderer';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.publishedAt || post.createdAt}>
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.categories && post.categories.length > 0 && (
            <span>
              in{' '}
              {post.categories.map((cat, i) => (
                <span key={cat.id}>
                  <Link
                    to={`/blog/category/${cat.slug}`}
                    className="hover:text-blue-600"
                  >
                    {cat.name}
                  </Link>
                  {i < post.categories!.length - 1 && ', '}
                </span>
              ))}
            </span>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/blog/tag/${tag.slug}`}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        <BlockRenderer blocks={post.blocks} />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link to="/blog" className="text-blue-600 hover:underline">
          ← Back to blog
        </Link>
      </footer>
    </article>
  );
}
