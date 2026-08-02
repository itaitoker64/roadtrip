/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Capacitor serves the app from the APK's asset bundle over https://localhost.
  // There is no Node server on the device, so every route must be a static file.
  output: "export",

  // next/image's optimizer is a server feature, unavailable in a static export.
  images: { unoptimized: true },

  // The WebView resolves routes as file paths, and a directory only loads if it
  // contains an index.html. Trailing slashes give every route one.
  trailingSlash: true,
};
export default nextConfig;
