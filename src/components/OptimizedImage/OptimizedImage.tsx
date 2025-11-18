import React, { useState, useEffect, useRef } from 'react';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  priority?: boolean; // For above-the-fold images
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage Component
 * Features:
 * - Lazy loading with Intersection Observer
 * - Low-quality placeholder
 * - Progressive image loading
 * - Automatic WebP support detection
 * - Responsive image sizing
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  onError,
  priority = false,
  objectFit = 'cover'
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URL
  const getOptimizedUrl = (url: string, targetWidth?: number): string => {
    if (!url) return '';
    
    // If it's an Unsplash image, use their optimization params
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      const params = new URLSearchParams();
      
      // Set quality and format
      params.set('auto', 'format'); // Auto WebP
      params.set('fit', 'crop');
      params.set('q', '75'); // Quality 75% (good balance)
      
      // Set width based on use case
      if (targetWidth) {
        params.set('w', targetWidth.toString());
      } else {
        params.set('w', '400'); // Default smaller size
      }
      
      return `${baseUrl}?${params.toString()}`;
    }
    
    // For other URLs, return as-is (could add your own CDN logic here)
    return url;
  };

  // Generate low-quality placeholder (tiny image for initial load)
  const getPlaceholderUrl = (url: string): string => {
    if (!url) return '';
    
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=20&q=10&blur=10`;
    }
    
    return url;
  };

  useEffect(() => {
    // If priority (above-the-fold), load immediately
    if (priority) {
      setImageSrc(getOptimizedUrl(src, width));
      return;
    }

    // Otherwise, use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(getOptimizedUrl(src, width));
            if (imgRef.current) {
              observer.unobserve(imgRef.current);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src, width, priority]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to original URL if optimized fails
    const target = e.target as HTMLImageElement;
    if (target.src !== src) {
      target.src = src;
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <div 
      className={`optimized-image-wrapper ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Low-quality placeholder */}
      {!imageLoaded && imageSrc && (
        <img
          src={getPlaceholderUrl(src)}
          alt=""
          className="optimized-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: objectFit,
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      
      {/* Main optimized image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`optimized-image ${imageLoaded ? 'loaded' : ''}`}
        onLoad={handleImageLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'} // Native lazy loading as fallback
        style={{
          width: '100%',
          height: '100%',
          objectFit: objectFit,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {/* Loading skeleton */}
      {!imageSrc && (
        <div className="optimized-image-skeleton" />
      )}
    </div>
  );
};

export default OptimizedImage;
