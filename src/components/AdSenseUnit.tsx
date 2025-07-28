import React, { useEffect, useRef, useCallback } from 'react';
import AdPlaceholder from './AdPlaceholder';

// Extend the Window interface to include adsbygoogle for TypeScript compatibility.
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseUnitProps {
  slot: string | number;
  format?: string;
  responsive?: boolean;
  className?: string;
  showPlaceholder?: boolean;
}

const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  showPlaceholder = false,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adPushedRef = useRef(false);

  const attemptToLoadAd = useCallback(() => {
    requestAnimationFrame(() => {
      if (adPushedRef.current) return;
      if (adRef.current && adRef.current.clientWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adPushedRef.current = true;
        } catch (e) {
          console.error(`AdSense error for slot ${slot}:`, e);
        }
      }
    });
  }, [slot]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedLoad = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(attemptToLoadAd, 200);
    };
    debouncedLoad();
    window.addEventListener('resize', debouncedLoad);
    return () => {
      window.removeEventListener('resize', debouncedLoad);
      clearTimeout(timeoutId);
    };
  }, [attemptToLoadAd]);

  return (
    <div ref={adRef} className={`ad-container relative ${className}`} aria-label="Advertisement">
      {showPlaceholder && (
        <AdPlaceholder className="absolute inset-0 z-0" />
      )}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3882845778136393"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

export default AdSenseUnit;
