# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Backend API configuration and fixing "Cannot POST /notes"

If you see "Cannot POST /notes" when trying to create a note, it means the frontend is sending requests to the React dev server instead of the backend API.

To fix:

1) Start the backend FastAPI server
   - Ensure your FastAPI backend is running and listening on http://localhost:3001
   - The backend should expose a POST /notes endpoint (see its OpenAPI docs)

2) Development (recommended): use the dev proxy
   - We configured a CRA proxy in package.json:
     "proxy": "http://localhost:3001"
   - With this, relative requests like /notes from http://localhost:3000 will be forwarded to http://localhost:3001, avoiding CORS.

3) Alternatively: set a base URL via environment variable
   - Copy .env.example to .env and set:
     REACT_APP_API_BASE_URL=http://localhost:3001
   - This makes the frontend call the backend directly at that origin. If you do this in development without the proxy, your backend must enable CORS for http://localhost:3000.

4) Production:
   - Set REACT_APP_API_BASE_URL to your deployment URL (e.g., https://api.example.com) before building:
     REACT_APP_API_BASE_URL=https://api.example.com npm run build
   - Ensure your backend CORS settings allow the production frontend origin.

Troubleshooting:
- 404 or "Cannot POST /notes": backend not running, wrong port, or missing proxy/env var.
- CORS errors when using REACT_APP_API_BASE_URL: enable CORS on the backend or use the dev proxy in development.
- Verify backend endpoints (example): GET/POST /notes; PATCH/DELETE /notes/{id}.
