/**
 * Assignment 6: Simple Web Server with Node.js
 * 
 * This server uses the built-in `http` and `fs` modules to:
 *  - Listen on port 3000
 *  - Route requests to the correct HTML page
 *  - Return appropriate HTTP status codes
 *  - Serve a custom 404 page for unknown routes
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

// ─── Helper: read and serve a file asynchronously ──────────────────────────
function serveFile(filePath, statusCode, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file itself can't be read, fall back to a plain-text 500
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error: Could not read file.');
      return;
    }
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
}

// ─── Route map: URL path → { file, status } ────────────────────────────────
const routes = {
  '/':        { file: 'pages/home.html',    status: 200 },
  '/home':    { file: 'pages/home.html',    status: 200 },
  '/about':   { file: 'pages/about.html',   status: 200 },
  '/contact': { file: 'pages/contact.html', status: 200 },
  '/services':{ file: 'pages/services.html',status: 200 },
};

// ─── Create the HTTP server ─────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // Normalize URL: strip query strings and trailing slash (except root)
  const url = req.url.split('?')[0].replace(/\/$/, '') || '/';

  console.log(`[${new Date().toISOString()}]  ${req.method}  ${url}`);

  // Serve the shared CSS stylesheet
  if (url === '/style.css') {
    const cssPath = path.join(__dirname, 'pages/style.css');
    serveFile(cssPath, 200, 'text/css', res);
    return;
  }

  const route = routes[url];

  if (route) {
    // Known route – serve the corresponding HTML file
    const filePath = path.join(__dirname, route.file);
    serveFile(filePath, route.status, 'text/html', res);
  } else {
    // Unknown route – serve custom 404 page
    const notFoundPath = path.join(__dirname, 'pages/404.html');
    serveFile(notFoundPath, 404, 'text/html', res);
  }
});

// ─── Start listening ────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`✅  Server is running at http://localhost:${PORT}`);
  console.log('   Available routes:');
  console.log('   • http://localhost:' + PORT + '/home');
  console.log('   • http://localhost:' + PORT + '/about');
  console.log('   • http://localhost:' + PORT + '/contact');
  console.log('   • http://localhost:' + PORT + '/services');
});
