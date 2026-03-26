# Security Configuration

## Helmet.js Configuration

### Configuration Applied
```typescript
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

### What Was Configured

1. **contentSecurityPolicy: false** — Disabled because this API only returns JSON data, not HTML. CSP is designed to prevent XSS in browsers rendering HTML content and is not applicable here.

2. **hidePoweredBy: true** — Removes the `X-Powered-By: Express` header. This prevents attackers from knowing what technology stack is used, reducing targeted attacks.

3. **noSniff: true** — Sets `X-Content-Type-Options: nosniff`. Prevents browsers from MIME-sniffing the content type, which can lead to XSS attacks.

4. **hsts** — Sets `Strict-Transport-Security` with a 1-year max-age. Forces clients to use HTTPS, protecting data in transit from man-in-the-middle attacks.

5. **frameguard: { action: "deny" }** — Sets `X-Frame-Options: DENY`. Prevents the API responses from being embedded in iframes, protecting against clickjacking.

6. **referrerPolicy: { policy: "no-referrer" }** — Sets `Referrer-Policy: no-referrer`. Prevents sending referrer information in requests, protecting sensitive URL data.

### External Sources

1. Helmet.js Official Documentation — https://helmetjs.github.io/
2. OWASP Secure Headers Project — https://owasp.org/www-project-secure-headers/

---

## CORS Configuration

### Configuration Applied
```typescript
cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
```

### What Was Configured

1. **origin** — In production, only explicitly listed origins from environment variables are allowed. This prevents unauthorized domains from accessing the API.

2. **credentials: true** — Allows cookies and authorization headers to be sent with cross-origin requests. Required for authenticated API calls.

3. **methods** — Only allows HTTP methods the API actually uses (GET, POST, PUT, DELETE, OPTIONS). OPTIONS is required for preflight requests.

4. **allowedHeaders** — Restricts which headers can be sent. `Content-Type` is needed for JSON bodies; `Authorization` is needed for future auth implementation.

### External Sources

1. MDN Web Docs — CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. OWASP CORS Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
```

---

## STEP 16 — Update `.gitignore`

Make sure these lines are in your `.gitignore`:
```
.env
serviceAccountKey.json
node_modules/
openapi.json
```

---

## 📁 Final Folder Structure

Here's what your project should look like after all changes:
```
project-root/
├── .env                          ← NEW (gitignored)
├── .env.example                  ← NEW
├── .gitignore                    ← UPDATED
├── SECURITY.md                   ← NEW
├── README.md                     ← UPDATE (add docs links + examples)
├── package.json                  ← UPDATED (add generate-docs script)
├── .github/
│   └── workflows/
│       └── deploy-docs.yml       ← NEW
├── scripts/
│   └── generate-openapi.ts       ← NEW
└── src/
    ├── app.ts                    ← UPDATED
    ├── server.ts                 ← unchanged
    ├── config/
    │   ├── firebaseConfig.ts     ← UPDATED (env vars)
    │   ├── helmetConfig.ts       ← NEW
    │   ├── corsConfig.ts         ← NEW
    │   ├── swaggerOptions.ts     ← NEW
    │   └── swagger.ts            ← NEW
    ├── constants/
    │   └── httpConstants.ts      ← unchanged
    └── api/v1/
        ├── routes/
        │   └── eventRoutes.ts    ← UPDATED (JSDoc added)
        ├── validation/
        │   └── event.schema.ts   ← UPDATED (JSDoc added)
        ├── controllers/          
        ├── services/             
        ├── repositories/         
        └── models/               