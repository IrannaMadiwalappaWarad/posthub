import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteFocusManager() {
  const location = useLocation();
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll window to top cleanly on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Announce route change to assistive technology without hijacking interactive focus
    if (liveRegionRef.current) {
      const pageTitle = document.title || 'Page loaded';
      liveRegionRef.current.textContent = `Navigated to ${pageTitle}`;
    }
  }, [location.pathname, location.search]);

  return (
    <div
      ref={liveRegionRef}
      className="sr-only pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    />
  );
}

