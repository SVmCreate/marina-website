import React from 'react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

/**
 * Helper to ensure Sanity CDN URLs deliver properly resampled, high-quality web images
 * (auto=format, q=90, max width) to prevent client-side GPU downsampling grain/aliasing.
 */
function optimizeSanityUrl(url: string, targetWidth?: number | string): string {
  if (!url || typeof url !== 'string') return url;
  
  // If it's a Sanity CDN image URL without explicit width parameters
  if (url.includes('cdn.sanity.io') && !url.includes('w=')) {
    const w = targetWidth ? String(targetWidth) : '1800';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=max&q=90&w=${w}`;
  }
  
  return url;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className = '',
  referrerPolicy = 'no-referrer',
  style,
  ...rest
}) => {
  const optimizedSrc = optimizeSanityUrl(src, width);

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      {...(fetchPriority ? { fetchPriority } : {})}
      className={className}
      referrerPolicy={referrerPolicy}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        ...style,
      }}
      {...rest}
    />
  );
};