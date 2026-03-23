import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

const META_PIXEL_ID = (import.meta as any).env.VITE_META_PIXEL_ID;
const GA_MEASUREMENT_ID = (import.meta as any).env.VITE_GOOGLE_ANALYTICS_ID;

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    console.log('Analytics initialized with:', { 
      hasPixel: !!META_PIXEL_ID, 
      hasGA: !!GA_MEASUREMENT_ID 
    });

    // 1. Initialize Meta Pixel
    if (META_PIXEL_ID && !window.fbq) {
      console.log('Initializing Meta Pixel:', META_PIXEL_ID);
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      window.fbq('init', META_PIXEL_ID);
      window.fbq('track', 'PageView');
    }

    // 2. Initialize Google Analytics
    if (GA_MEASUREMENT_ID && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (META_PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
      
      // Also send to server-side CAPI for better tracking
      fetch('/api/meta-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'PageView',
          eventSourceUrl: window.location.href,
          userData: {} // You can add more user data here if available
        }),
      }).catch(err => console.error('Meta CAPI error:', err));
    }
    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}
