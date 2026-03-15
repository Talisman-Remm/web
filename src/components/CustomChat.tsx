import React, { useEffect } from 'react';

export const CustomChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs?v=" + Date.now();

    script.onload = () => {
      (window as any).voiceflow.chat.load({
        verify: { projectID: '696ac22f54102c6bbf90660a' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        theme: {
          primaryColor: '#D4AF37',
          launcher: '/img_5485.png' // launcher (ya funciona)
        },
        assistant: {
          stylesheet: 'data:text/css;base64,LyogQ2FtYmlhIGVsIGZvbmRvIGRlIGxhIHZlbnRhbmEgZGVsIGNoYXQgcG9yIHR1IGltYWdlbiAqLwoudmZyYy1jaGF0IHsKICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChyZ2JhKDAsMCwwLDAuODUpLCByZ2JhKDAsMCwwLDAuODUpKSwgdXJsKCcvaW1nXzU0ODQucG5nJykgIWltcG9ydGFudDsKICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXIgIWltcG9ydGFudDsKICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDAgIWltcG9ydGFudDsKfQovKiBDYWJlY2VyYSBuZWdyYSBjb24gYm9yZGUgZG9yYWRvICovCi52ZnJjLWhlYWRlciB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwICFpbXBvcnRhbnQ7CiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0Q0QUYzNyAhaW1wb3J0YW50Owp9Ci8qIEJ1cmJ1amFzIGRlbCBjaGF0IGVzdGlsbyBvc2N1cm8gKi8KLnZmcmMtbWVzc2FnZS0tY2hhdCB7CiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTExMTExICFpbXBvcnRhbnQ7CiAgICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50OwogICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyMTIsIDE3NSwgNTUsIDAuMikgIWltcG9ydGFudDsKfQovKiBFbCBib3TDo24gY2lyY3VsYXIgZGUgYXBlcnR1cmEgKi8KLnZmcmMtbGF1bmNoZXIgewogICAgYmFja2dyb3VuZC1jb2xvcjogI0Q0QUYzNyAhaW1wb3J0YW50OwogICAgYm94LXNoYWRvdzogMCA0cHggMTVweCByZ2JhKDIxMiwxNzUsNTUsIDAuNCkgIWltcG9ydGFudDsKfQ==',

          // Fuerza Agent Image (avatar en burbujas)
          avatar: {
            hide: false,
            imageUrl: '/img_5485.png'  // o usa URL absoluta: 'https://tu-proyecto.bolt.new/img_5485.png'
          },

          // Fuerza Banner image
          banner: {
            hide: false,
            imageUrl: '/img_5485.png'
          },

          // Fuerza Header image (logo en barra superior)
          header: {
            hideImage: false,
            imageUrl: '/img_5485.png'
          }
        }
      });
    };
    document.body.appendChild(script);
  }, []);
  return null;
};