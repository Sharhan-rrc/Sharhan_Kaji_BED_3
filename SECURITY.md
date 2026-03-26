# Security Configuration Justification

This file explains why Helmet and CORS were configured the way they are in this API.

## Helmet.js Configuration

### Configuration Applied

```typescript
// Development
helmet({
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: false,
});

// Production
helmet({
  contentSecurityPolicy: false,
  hidePoweredBy: true,
  noSniff: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "no-referrer" },
});
```

### Why These Choices Were Made

1. **contentSecurityPolicy: false**  
   Disabled because this project is a JSON API and does not render HTML pages. CSP is mainly useful for controlling scripts/resources in browser-rendered pages.

2. **hidePoweredBy: true**  
   Removes the `X-Powered-By` header so the app does not reveal it is running on Express. This reduces stack fingerprinting.

3. **noSniff: true**  
   Sends `X-Content-Type-Options: nosniff` to stop MIME sniffing. This helps prevent browsers from interpreting files as a different type.

4. **hsts: false in development**  
   HSTS is disabled in local development because local environments often use HTTP.

5. **hsts enabled in production**  
   In production, HSTS is enabled with 1 year max-age, subdomains, and preload to enforce HTTPS and reduce downgrade/MITM risks.

6. **frameguard: deny (production)**  
   Sets `X-Frame-Options: DENY` to prevent clickjacking by blocking iframe embedding.

7. **referrerPolicy: no-referrer (production)**  
   Prevents referrer information from being sent, reducing accidental URL data leakage.

### Sources

1. Helmet.js official documentation: https://helmetjs.github.io/
2. OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
3. MDN - Strict-Transport-Security: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security

## CORS Configuration

### Configuration Applied

```typescript
// Development
cors({
  origin: true,
  credentials: true,
});

// Production
cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
```

### Why These Choices Were Made

1. **origin: true in development**  
   Allows easier local testing from different local frontend ports.

2. **origin from ALLOWED_ORIGINS in production**  
   Only trusted origins from environment variables can call the API from browsers. This reduces cross-origin abuse.

3. **credentials: true**  
   Allows credentials for cross-origin requests when needed (for example cookies or auth flows).

4. **methods restricted in production**  
   Only methods used by this API are allowed: GET, POST, PUT, DELETE, OPTIONS.

5. **allowedHeaders restricted in production**  
   Only required headers are allowed: `Content-Type` for JSON and `Authorization` for auth tokens.

### Sources

1. MDN - CORS guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
2. Express CORS middleware docs: https://expressjs.com/en/resources/middleware/cors.html
3. OWASP - CORS guidance (HTML5 Security Cheat Sheet): https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html
