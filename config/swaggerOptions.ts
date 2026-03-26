import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Events API Documentation",
      version: "1.0.0",
      description: "API documentation for the Events Management application.",
    },

        servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: [
    "./src/api/v1/routes/*.ts",
    "./src/api/v1/validation/*.ts",
  ],
};

export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};