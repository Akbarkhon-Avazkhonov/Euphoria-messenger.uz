/** @type {import('next').NextConfig} */
const nextConfig = {
    // add image 
    output: "standalone",
    images: {
        domains: ['localhost'],
    },
    optimizeFonts: false,
};

export default nextConfig;
