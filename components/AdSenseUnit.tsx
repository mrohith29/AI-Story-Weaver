import React, { useEffect, useRef, useCallback } from 'react';

// Extend the Window interface to include adsbygoogle for TypeScript compatibility.
declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const AdSenseUnit = ({ slot, format = 'auto', responsive = true, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  // Use a ref to track if the ad has been successfully pushed.
  const adPushedRef = useRef(false);

  // Memoize the ad-loading logic using useCallback.
  const attemptToLoadAd = useCallback(() => {
    // Using requestAnimationFrame ensures that we check the element's dimensions
    // after the browser has finished layout calculations, preventing race conditions.
    requestAnimationFrame(() => {
      if (adPushedRef.current) {
        return;
      }
      
      // The crucial check: the container must exist and have a rendered width > 0.
      // This directly prevents the "No slot size for availableWidth=0" error.
      if (adRef.current && adRef.current.clientWidth > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          // Mark that we've pushed an ad for this unit to prevent duplicates.
          adPushedRef.current = true;
        } catch (e) {
          console.error(`AdSense error for slot ${slot}:`, e);
        }
      }
    });
  }, [slot]); // Dependency on `slot` ensures the function is updated if the slot prop changes.

  useEffect(() => {
    // A simple debounce utility to prevent the ad load function from firing too rapidly on resize.
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedLoad = () => {
      clearTimeout(timeoutId);
      // A small delay gives the browser time to apply responsive styles and calculate layout.
      timeoutId = setTimeout(attemptToLoadAd, 200);
    };

    // Attempt to load the ad when the component mounts.
    debouncedLoad();

    // Also, listen for window resize events to handle responsive layout changes.
    window.addEventListener('resize', debouncedLoad);

    // Cleanup function: remove the event listener and clear any pending timeout.
    return () => {
      window.removeEventListener('resize', debouncedLoad);
      clearTimeout(timeoutId);
    };
  }, [attemptToLoadAd]); // The effect re-runs if `attemptToLoadAd` changes.

  return (
    <div ref={adRef} className={`ad-container ${className}`} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }} // AdSense requires 'display: block'.
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // This should be your publisher ID.
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

export default AdSenseUnit;
