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
  className,
  referrerPolicy = 'no-referrer',
  ...rest
}) => {
  return (
    <img
      src={src}
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
      {...rest}
    />
  );
};
