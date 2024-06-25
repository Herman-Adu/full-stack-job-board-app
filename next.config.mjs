/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'adudev-job-board-bucket.s3.amazonaws.com',
        },
      ],
    },
  };
  
  export default nextConfig;