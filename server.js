const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

function serveFile(filePath, statusCode, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0].replace(/\/$/, '') || '/';

  console.log(req.method + ' ' + url);

  if (url === '/style.css') {
    serveFile(path.join(__dirname, 'pages/style.css'), 200, 'text/css', res);
    return;
  }

  if (url === '/' || url === '/home') {
    serveFile(path.join(__dirname, 'pages/home.html'), 200, 'text/html', res);
  } else if (url === '/about') {
    serveFile(path.join(__dirname, 'pages/about.html'), 200, 'text/html', res);
  } else if (url === '/contact') {
    serveFile(path.join(__dirname, 'pages/contact.html'), 200, 'text/html', res);
  } else if (url === '/services') {
    serveFile(path.join(__dirname, 'pages/services.html'), 200, 'text/html', res);
  } else {
    serveFile(path.join(__dirname, 'pages/404.html'), 404, 'text/html', res);
  }
});

server.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
