import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './routes/Home';
import { Blog } from './routes/Blog';
import { BlogPost } from './routes/BlogPost';
import { Page } from './routes/Page';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/*" element={<Page />} />
      </Routes>
    </Layout>
  );
}
