# Local Media Folder

This folder is for storing local media files that will be copied to `public/media/` during the build process.

## Usage

1. Add your images, videos, or other media files to this `media/` folder
2. Organize them in subfolders if needed (e.g., `media/images/`, `media/icons/`)
3. Run `npm run build` - files will automatically be copied to `public/media/`
4. Reference them in your code as `/media/your-file.jpg`

## Development vs Production

- **Development**: Files in `media/` are NOT automatically served. Run `npm run copy-media` to copy them to `public/media/` for local testing.
- **Production**: The build script automatically copies media files before building.

## Workflow for Forking

1. Fork the repository
2. Add your images to this `media/` folder
3. Commit and deploy
4. The deployment will run `npm run build`, which copies media to public

## Notes

- The `.gitkeep` file ensures this folder exists in git (it won't be copied)
- Files in `public/media/` are gitignored to avoid duplicating assets
- For CMS-managed media, use the admin panel upload instead
