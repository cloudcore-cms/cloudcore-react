// Cloudcore CMS API Client for React

const API_BASE = import.meta.env.VITE_CMS_URL || 'http://localhost:8787/api/v1';

export interface ContentBlock {
  id: string;
  type: string;
  value: string;
  options?: Record<string, unknown>;
  mediaId?: string;
  mediaIds?: string[];
}

export interface Content {
  id: string;
  type: 'page' | 'post';
  title: string;
  slug: string;
  status: 'draft' | 'published';
  blocks: ContentBlock[];
  authorId: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categories?: { id: string; slug: string; name: string }[];
  tags?: { id: string; slug: string; name: string }[];
}

export interface Media {
  id: string;
  filename: string;
  mimeType: string;
  size: number | null;
  width: number | null;
  height: number | null;
  alt: string | null;
  url: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  children?: Category[];
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

interface ListResponse<T> {
  items: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore?: boolean;
  };
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
}

// Content — uses public API (no auth required, published content only)
export async function getContent(params?: {
  type?: 'page' | 'post';
  limit?: number;
  offset?: number;
}): Promise<ListResponse<Content>> {
  const searchParams = new URLSearchParams();
  if (params?.type) searchParams.set('type', params.type);
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());
  return fetchApi(`/public/content?${searchParams}`);
}

export async function getContentBySlug(
  type: 'page' | 'post',
  slug: string
): Promise<Content | null> {
  try {
    return await fetchApi(`/public/content/${type}/${slug}`);
  } catch {
    return null;
  }
}

// Pages
export async function getPages(): Promise<Content[]> {
  const result = await getContent({ type: 'page' });
  return result.items;
}

export async function getPageBySlug(slug: string): Promise<Content | null> {
  return getContentBySlug('page', slug);
}

// Posts
export async function getPosts(limit = 10, offset = 0): Promise<ListResponse<Content>> {
  return getContent({ type: 'post', limit, offset });
}

export async function getPostBySlug(slug: string): Promise<Content | null> {
  return getContentBySlug('post', slug);
}

// Media
export async function getMedia(id: string): Promise<Media> {
  return fetchApi(`/media/${id}`);
}

export function getMediaUrl(id: string): string {
  return `${API_BASE}/media/${id}/file`;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const result = await fetchApi<{ items: Category[] }>('/categories');
  return result.items;
}

// Tags
export async function getTags(): Promise<Tag[]> {
  const result = await fetchApi<{ items: Tag[] }>('/tags');
  return result.items;
}

// Settings
export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  try {
    const result = await fetchApi<{ key: string; value: T }>(`/settings/${key}`);
    return result.value;
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<Record<string, unknown>> {
  return fetchApi('/settings');
}
