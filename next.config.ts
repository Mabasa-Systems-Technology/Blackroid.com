import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Reserve text-and-data-mining rights (W3C TDMRep). Search indexing is unaffected.
  { key: "tdm-reservation", value: "1" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Never ship original source to browsers.
  productionBrowserSourceMaps: false,
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
  },
  async redirects() {
    // Older service addresses land on the matching area (an empty target means the services page).
    const hub = "enterprise-engineering";
    const moved: Array<[string, string]> = [
      ["technology-consulting", ""],
      ["strategy-and-advisory", ""],
      ["operations-and-performance", ""],
      ["systems-integration", hub],
      ["cloud-and-infrastructure", hub],
      ["technology-transformation", hub],
      ["ai-and-automation", hub],
      ["artificial-intelligence-and-data", hub],
      ["data-engineering-and-analytics", hub],
      ["custom-software-development", hub],
      ["engineering-and-implementation", hub],
      ["enterprise-technology-and-transformation", hub],
      ["healthcare-operations", ""],
    ];
    // Client sign-in lives in the portal, which handles its own authentication.
    const portal = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || "https://portal.blackroid.com";
    const pages = [
      { source: "/careers", destination: "https://www.olyxee.com/careers", permanent: false },
      { source: "/login", destination: portal, permanent: false },
      { source: "/industries", destination: "/outsourced-development", permanent: true },
      { source: "/business-review", destination: "/outsourced-development", permanent: true },
    ];
    return pages.concat(
      moved.map(([from, to]) => ({
        source: `/services/${from}`,
        destination: to ? `/services/${to}` : "/services",
        permanent: true,
      })),
    );
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
