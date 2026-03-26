import cors from "cors";

export const getCorsOptions = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    return cors({
      origin: true, // Allow all origins in development
      credentials: true,
    });
  }

    // Production: strict origins
  return cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
};