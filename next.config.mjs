/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // served as AVIF/WebP at the width each screen needs (phones no longer download the 1.2MB PNG)
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2560],
  },
  // Keep the old static URLs alive — the SMS program registration and past messages link to them.
  async redirects() {
    return [
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/sms-terms.html', destination: '/sms-terms', permanent: true },
    ]
  },
}

export default nextConfig
