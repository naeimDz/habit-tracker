const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',

  // ⚡ Advanced PWA Config for "100% Offline" Confidence
  cacheOnFrontEndNav: true,     // Cache pages as user navigates
  reloadOnOnline: false,        // Don't auto-reload when back online (let sync handle it)
  fallbacks: {
    // If the user is offline and the page isn't cached, what shows?
    // document: '/_offline',  // (Optional: We would need to create an _offline page)
  },
})

module.exports = withPWA({
  reactStrictMode: true,
})
