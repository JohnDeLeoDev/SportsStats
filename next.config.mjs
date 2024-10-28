/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
        REACT_APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    }
}

export default nextConfig
