/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: false,
  images: {
    unoptimized: Boolean(Number(process.env.UNOPTIMIZED_IMAGES)),
    deviceSizes: [767, 980, 1156, 1400, 1920],
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/players',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*', // Захватываем маршруты с /api/proxy
        destination: 'http://localhost:3001/:path*', // Перенаправляем на API
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeDimensions',
                  active: true,
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};
module.exports = moduleExports;
