# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

For Codespaces, define `VITE_CODESPACE_NAME` in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend builds API URLs with Vite environment variables:

```js
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api` to avoid `https://undefined-8000...` URLs.
