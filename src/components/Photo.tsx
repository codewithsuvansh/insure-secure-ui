import { photoAlt, type PhotoName } from '@/content/photos';

interface PhotoProps {
  name: PhotoName;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Pass an empty string for decorative use. */
  alt?: string;
  style?: React.CSSProperties;
}

export function srcSetFor(name: PhotoName): string {
  return [480, 800, 1200].map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
}

export function Photo({ name, sizes, className, priority, alt, style }: PhotoProps) {
  return (
    <img
      src={`/images/${name}-1200.webp`}
      srcSet={srcSetFor(name)}
      sizes={sizes}
      alt={alt ?? photoAlt[name]}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
