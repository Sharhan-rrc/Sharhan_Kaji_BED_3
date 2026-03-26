import helmet from "helmet";

export const getHelmetConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const baseConfig = {
    contentSecurityPolicy: false, // Disabled - this API returns JSON only, not HTML
    hidePoweredBy: true,          // Hides X-Powered-By: Express header
    noSniff: true,                // Prevents MIME type sniffing
  };

  if (isDevelopment) {
    return helmet({
      ...baseConfig,
      hsts: false, // No HTTPS enforcement in development
    });
  }

    // Production configuration
  return helmet({
    ...baseConfig,
    hsts: {
      maxAge: 31536000,        // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: "deny" },         // Prevents clickjacking
    referrerPolicy: { policy: "no-referrer" }, // Hides referrer info
  });
};