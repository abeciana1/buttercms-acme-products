module.exports = {
  reactStrictMode: true,
  async redirects() {
    const sourcesRequiringAuthToken = [
      "/", "/:slug*",
    ];

    if (process.env.NEXT_PUBLIC_BUTTER_CMS_API_KEY) {
      return [
        {
          source: "/missing-token",
          destination: "/",
          permanent: false,
        }
      ];
    } else {
      return sourcesRequiringAuthToken.map(source => ({
        source: source,
        destination: "/missing-token",
        permanent: false,
      }));
    }
  },
  images: {
    domains: ["cdn.buttercms.com"],
    dangerouslyAllowSVG: true,
  },
};
