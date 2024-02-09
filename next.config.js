/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        
    },
    images: {
        // domains: [
        //     "res.cloudinary.com",
        // ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '**',
            },
          ],
    },
    
}

module.exports = nextConfig
