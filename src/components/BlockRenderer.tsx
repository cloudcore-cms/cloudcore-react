import { ContentBlock, getMediaUrl } from '../lib/api';

interface BlockRendererProps {
  blocks: ContentBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="content-blocks">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={block.id} className="mb-4">
          {block.value}
        </p>
      );

    case 'heading': {
      const level = (block.options?.level as number) || 2;
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      const classes: Record<number, string> = {
        1: 'text-4xl font-bold mb-6',
        2: 'text-3xl font-bold mb-5',
        3: 'text-2xl font-bold mb-4',
        4: 'text-xl font-semibold mb-3',
        5: 'text-lg font-semibold mb-2',
        6: 'text-base font-semibold mb-2',
      };
      return (
        <Tag key={block.id} className={classes[level] || classes[2]}>
          {block.value}
        </Tag>
      );
    }

    case 'quote': {
      const citation = block.options?.citation ? String(block.options.citation) : null;
      return (
        <blockquote
          key={block.id}
          className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700"
        >
          <p>{block.value}</p>
          {citation && (
            <cite className="block mt-2 text-sm text-gray-500">
              — {citation}
            </cite>
          )}
        </blockquote>
      );
    }

    case 'richtext':
      return (
        <div
          key={block.id}
          className="prose max-w-none mb-4"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case 'image': {
      const imageUrl = block.mediaId ? getMediaUrl(block.mediaId) : '';
      const size = (block.options?.size as string) || 'large';
      const sizeClasses: Record<string, string> = {
        small: 'max-w-sm',
        medium: 'max-w-lg',
        large: 'max-w-2xl',
        full: 'w-full',
      };
      return (
        <figure key={block.id} className={`mb-6 ${sizeClasses[size] || sizeClasses.large}`}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={(block.options?.alt as string) || ''}
              className="rounded-lg"
            />
          )}
          {(() => {
            const caption = block.options?.caption;
            return caption ? (
              <figcaption className="mt-2 text-sm text-gray-500 text-center">
                {String(caption)}
              </figcaption>
            ) : null;
          })()}
        </figure>
      );
    }

    case 'gallery': {
      const columns = (block.options?.columns as number) || 3;
      return (
        <div
          key={block.id}
          className={`grid grid-cols-${columns} gap-4 mb-6`}
        >
          {block.mediaIds?.map((mediaId) => (
            <img
              key={mediaId}
              src={getMediaUrl(mediaId)}
              alt=""
              className="rounded-lg w-full h-48 object-cover"
            />
          ))}
        </div>
      );
    }

    case 'video': {
      const videoUrl = block.value;
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        const videoId = videoUrl.includes('youtu.be')
          ? videoUrl.split('/').pop()
          : new URL(videoUrl).searchParams.get('v');
        return (
          <div key={block.id} className="aspect-video mb-6">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <video
          key={block.id}
          src={videoUrl}
          controls
          autoPlay={block.options?.autoplay as boolean}
          className="w-full rounded-lg mb-6"
        />
      );
    }

    case 'button': {
      const style = (block.options?.style as string) || 'primary';
      const classes: Record<string, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      };
      return (
        <a
          key={block.id}
          href={block.options?.url as string}
          target={block.options?.openInNewTab ? '_blank' : undefined}
          rel={block.options?.openInNewTab ? 'noopener noreferrer' : undefined}
          className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors mb-4 ${classes[style] || classes.primary}`}
        >
          {block.value}
        </a>
      );
    }

    case 'spacer': {
      const sizes: Record<string, string> = {
        sm: 'h-4',
        md: 'h-8',
        lg: 'h-12',
        xl: 'h-16',
      };
      return (
        <div
          key={block.id}
          className={sizes[(block.options?.size as string) || 'md'] || 'h-8'}
        />
      );
    }

    case 'divider':
      return <hr key={block.id} className="border-t border-gray-200 my-8" />;

    case 'html':
      return (
        <div
          key={block.id}
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case 'code':
      return (
        <pre
          key={block.id}
          className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
        >
          <code className={`language-${(block.options?.language as string) || 'text'}`}>
            {block.value}
          </code>
        </pre>
      );

    case 'embed':
      return (
        <div
          key={block.id}
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    default:
      return (
        <div key={block.id} className="mb-4 p-4 bg-gray-100 rounded">
          {block.value}
        </div>
      );
  }
}
