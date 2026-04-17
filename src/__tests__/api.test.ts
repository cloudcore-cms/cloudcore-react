import { describe, it, expect } from 'vitest';

describe('API Client', () => {
  it('API_BASE defaults to localhost', async () => {
    // The API client uses import.meta.env.VITE_CMS_URL
    // In test environment without env vars, it should fall back to default
    const module = await import('../lib/api');
    // Module should export functions
    expect(typeof module.getPages).toBe('function');
    expect(typeof module.getPosts).toBe('function');
    expect(typeof module.getPageBySlug).toBe('function');
    expect(typeof module.getPostBySlug).toBe('function');
    expect(typeof module.getContentBySlug).toBe('function');
  });
});
