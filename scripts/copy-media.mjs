#!/usr/bin/env node
/**
 * Copy media files from ./media to ./public/media
 * This allows developers to add local images that get served as static assets
 */
import { cpSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const mediaDir = join(root, 'media');
const publicMediaDir = join(root, 'public', 'media');

if (existsSync(mediaDir)) {
  // Ensure public/media exists
  mkdirSync(publicMediaDir, { recursive: true });

  // Copy all files from media to public/media
  cpSync(mediaDir, publicMediaDir, {
    recursive: true,
    filter: (src) => !src.endsWith('.gitkeep') // Skip .gitkeep files
  });

  console.log('Media files copied to public/media');
} else {
  console.log('No media folder found, skipping copy');
}
