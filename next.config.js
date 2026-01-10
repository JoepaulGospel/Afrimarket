/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
remotePatterns: [
{ protocol: 'https', hostname: '**.amazon.com' },
{ protocol: 'https', hostname: '**.media-amazon.com' },
{ protocol: 'https', hostname: '**.ebayimg.com' },
{ protocol: 'https', hostname: 'images.unsplash.com' },
{ protocol: 'https', hostname: 'via.placeholder.com' },
],
},
}
module.exports = nextConfig
