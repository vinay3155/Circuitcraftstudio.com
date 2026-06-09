import React, { useEffect } from 'react';

export default function AdSenseUnit({ adSlot }) {
  useEffect(() => {
    try {
      // Trigger Google AdSense to render the ad unit
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense warning (this is normal if blocker is active or ads are reviewing):", e);
    }
  }, [adSlot]);

  return (
    <div 
      style={{ 
        margin: '3rem auto', 
        maxWidth: '1200px', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        padding: '0 1.5rem',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
      className="adsense-container"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-6686485530652899"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
