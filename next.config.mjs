/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.011st.com', 'salt.tikicdn.com'],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
