/** @type {import('next').NextConfig} */
const nextConfig = {
    // add image 
    output: "standalone",
    images: {
        domains: ['localhost'],
    },
    future: {
        ignoreBuildErrors: true, // Игнорировать ошибки при сборке
      },
};

export default nextConfig;
