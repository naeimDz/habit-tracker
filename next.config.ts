const defaultRuntimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',

  // ⚡ Advanced PWA Config for "100% Offline" Confidence
  cacheOnFrontEndNav: true,     // Cache pages as user navigates
  reloadOnOnline: false,        // Don't auto-reload when back online (let sync handle it)
  fallbacks: {
    document: '/offline',
  },
  runtimeCaching: [
    {
      urlPattern: '/',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'start-url',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    ...defaultRuntimeCaching
  ]
})

module.exports = withPWA({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/workbox-:hash.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
})
