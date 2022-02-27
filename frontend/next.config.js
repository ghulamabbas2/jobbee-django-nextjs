/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // API_URL: "http://localhost:8000",
    API_URL: "https://jobbee-django.herokuapp.com",
  },
};

module.exports = nextConfig;
