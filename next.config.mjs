/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: false,
    images: {
        domains: ['cms.mehadih.info'],
    },
};

export default nextConfig;
