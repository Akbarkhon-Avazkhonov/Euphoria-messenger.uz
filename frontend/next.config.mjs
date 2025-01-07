/** @type {import('next').NextConfig} */
const nextConfig = {
    // add image 
    output: "standalone",
    images: {
        domains: ['localhost'],
    },
};

export default nextConfig;
