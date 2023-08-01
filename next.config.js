/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.namava.ir'],
        remotePatterns: [
            {
              protocol: "https",
              hostname:'www.namava.ir',
            },
          ],
      },
}

module.exports = nextConfig
