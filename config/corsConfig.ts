import cors from "cors";

export const getCorsOptions = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    return cors({
      origin: true, // Allow all origins in development
      credentials: true,
    });
  }