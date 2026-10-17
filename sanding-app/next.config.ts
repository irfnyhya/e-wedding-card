import type { NextConfig } from "next";

// Every page reads the Supabase session cookie or live card data per request,
// so Cache Components stays off and pages render dynamically.
const nextConfig: NextConfig = {};

export default nextConfig;
