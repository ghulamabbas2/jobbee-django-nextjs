/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // API_URL: "http://localhost:8000",
    API_URL: "https://jobbee-django.herokuapp.com",
    MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1IjoiZ2h1bGFtYWJiYXMyNTgiLCJhIjoiY2t1bXduZ3ByMDMzcjJ2cXJwbGZvNXdmdiJ9.WSfFtn0Wb0NNlB-IxDd3AA",
  },
};

module.exports = nextConfig;
