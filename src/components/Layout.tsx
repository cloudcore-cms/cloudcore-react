import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSetting } from '../lib/api';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { data: siteName } = useQuery({
    queryKey: ['settings', 'siteName'],
    queryFn: () => getSetting<string>('siteName'),
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200">
        <nav className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              {siteName || 'Cloudcore Site'}
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link to="/blog" className="hover:text-gray-600">
                Blog
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {siteName || 'Cloudcore Site'}. Powered by
            Cloudcore CMS.
          </p>
        </div>
      </footer>
    </div>
  );
}
