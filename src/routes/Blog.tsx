import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getPosts, getCategories } from '../lib/api';

export function Blog() {
  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(20),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Posts */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !postsData || postsData.items.length === 0 ? (
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          ) : (
            <div className="space-y-8">
              {postsData.items.map((post) => (
                <article key={post.id} className="border-b border-gray-200 pb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <time dateTime={post.publishedAt || post.createdAt}>
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
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
                  {/* Show first paragraph as excerpt */}
                  {post.blocks.find((b) => b.type === 'paragraph') && (
                    <p className="text-gray-600">
                      {post.blocks
                        .find((b) => b.type === 'paragraph')
                        ?.value.slice(0, 200)}
                      {(post.blocks.find((b) => b.type === 'paragraph')?.value.length || 0) >
                        200 && '...'}
                    </p>
                  )}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-blue-600 hover:underline text-sm mt-4 inline-block"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          {categories && categories.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/blog/category/${cat.slug}`}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
