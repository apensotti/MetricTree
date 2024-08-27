/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    outputFileTracingIncludes: {
      '/api/csv': ['./public/*'],
    }},
};
    

export default nextConfig;
