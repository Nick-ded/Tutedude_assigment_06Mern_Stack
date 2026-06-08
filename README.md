<div align="center">

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDhiNno2eTN0cHQxaGZzbjVhazlxd3BuNm9oMnQ5NzVrcTNzbzA1eSZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/qgQUggAC3Pfv687qPC/giphy.gif" width="600" alt="coding gif"/>

# 🧺 CleanCo — Node.js Web Server

### Assignment 6 · MERN Stack · Tutedude

![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-ZERO-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> **A hand-crafted HTTP web server built entirely from Node.js core modules — zero npm packages, zero frameworks, pure Node.js power.**

</div>

---

## 📺 Live Routes in Action

<div align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2RjaGszeTdhemd1bGJ0YjJ5dGxoeGZoYThkMHpteTlsMnBzcWNqaCZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif" width="500" alt="server running gif"/>
</div>

| Route | Status | Page |
|-------|--------|------|
| `GET /` | `200 OK` | Redirects → Home |
| `GET /home` | `200 OK` | 🏠 Landing Page |
| `GET /about` | `200 OK` | 👥 About Page |
| `GET /contact` | `200 OK` | 📬 Contact Form |
| `GET /services` | `200 OK` | ⭐ Services Page |
| `GET /anything-else` | `404 Not Found` | 🚫 Custom 404 Page |

---

## 🗂️ Project Structure

```
Tutedude_assigment_06Mern_Stack/
│
├── server.js           ← 🚀 Entry point — HTTP server + router
│
└── pages/
    ├── style.css       ← 🎨 Shared CSS (CSS variables, grid, flexbox)
    ├── home.html       ← 🏠 /home route
    ├── about.html      ← 👥 /about route
    ├── contact.html    ← 📬 /contact route
    ├── services.html   ← ⭐ /services route
    └── 404.html        ← 🚫 Catch-all error page
```

---

## ⚙️ How It Works — Technical Deep Dive

<div align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXptZG8xcjV0b2VxcXplNXRkcXdicXhrbHF6OHdqaGZmd2lhbHd6eCZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/RbDKaczqWovIugyJmW/giphy.gif" width="480" alt="deep dive gif"/>
</div>

### 1. The HTTP Server — `http.createServer()`

Node.js exposes a raw TCP server via `http.createServer()`. Every incoming connection triggers the callback with two objects:

- **`req` (IncomingMessage)** — the readable stream carrying method, URL, headers, and body
- **`res` (ServerResponse)** — the writable stream you pipe the HTML response into

```js
const server = http.createServer((req, res) => {
  // req.url  → "/about"
  // req.method → "GET"
});
server.listen(3001);
```

### 2. The Router — Pure Object Lookup

Instead of a chain of `if/else` blocks, routes are stored in a **plain object** (a hash map). Lookup is **O(1)** — constant time regardless of how many routes you add.

```js
const routes = {
  '/':         { file: 'pages/home.html',     status: 200 },
  '/home':     { file: 'pages/home.html',     status: 200 },
  '/about':    { file: 'pages/about.html',    status: 200 },
  '/contact':  { file: 'pages/contact.html',  status: 200 },
  '/services': { file: 'pages/services.html', status: 200 },
};

const route = routes[url];   // O(1) hash lookup
```

### 3. Async File I/O — `fs.readFile()`

HTML files are read using **non-blocking async I/O**. Node's event loop is never blocked — while the OS fetches the file, other requests can be processed concurrently.

```
Request arrives
      │
      ▼
  Route lookup (sync, ~nanoseconds)
      │
      ▼
  fs.readFile() ──► OS kernel reads file ──► callback fires
      │                                           │
      │  (event loop free to handle other         │
      │   requests during this time ✅)           │
      └───────────────────────────────────────────►
                                            res.end(data)
```

```js
function serveFile(filePath, statusCode, contentType, res) {
  fs.readFile(filePath, (err, data) => {  // ← async callback
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
}
```

### 4. HTTP Status Codes

Every response includes a semantically correct status code:

| Code | Meaning | When Used |
|------|---------|-----------|
| `200` | OK | Valid route found, file served |
| `404` | Not Found | URL doesn't match any route |
| `500` | Internal Server Error | File exists in route but can't be read |

### 5. URL Normalization

Raw URLs can contain query strings (`?ref=google`) or trailing slashes (`/home/`). Both are stripped before routing:

```js
const url = req.url
  .split('?')[0]        // remove ?query=string
  .replace(/\/$/, '')   // remove trailing slash
  || '/';               // default to root if empty
```

### 6. Content-Type Headers

The `Content-Type` header tells the browser how to parse the response body. Sending wrong content types breaks rendering:

```js
// HTML pages
res.writeHead(200, { 'Content-Type': 'text/html' });

// CSS stylesheet
res.writeHead(200, { 'Content-Type': 'text/css' });
```

---

## 🎨 CSS Architecture

<div align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXc1ZGduYXFsMThpNmJhZWp3NXFwMDZobjZwMGJkcmd0emh3eDZsbiZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/13FrpeVH09Zrb2/giphy.gif" width="400" alt="css magic gif"/>
</div>

The stylesheet uses **CSS Custom Properties** (variables) for a consistent design system across all pages:

```css
:root {
  --primary:   #2563eb;   /* Brand blue */
  --secondary: #1e40af;   /* Darker blue */
  --accent:    #f59e0b;   /* Amber highlight */
  --radius:    10px;      /* Border radius token */
  --shadow:    0 4px 20px rgba(0,0,0,0.10);
}
```

Key layout techniques used:
- **CSS Grid** — responsive card layouts with `auto-fit` + `minmax()`
- **Flexbox** — navigation bar and two-column page layouts  
- **CSS transitions** — hover effects on cards and buttons (no JS needed)
- **Media queries** — single breakpoint at `700px` for mobile stacking

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ installed (zero other dependencies)

### Run the server

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/Tutedude_assigment_06Mern_Stack.git
cd Tutedude_assigment_06Mern_Stack

# Start the server (no npm install needed!)
node server.js
```

You'll see:

```
✅  Server is running at http://localhost:3001
   Available routes:
   • http://localhost:3001/home
   • http://localhost:3001/about
   • http://localhost:3001/contact
   • http://localhost:3001/services
```

Open your browser and visit **[http://localhost:3001/home](http://localhost:3001/home)** 🎉

---

## 🧪 Test All Routes

```bash
# PowerShell — test every route and see status codes
@("/home", "/about", "/contact", "/services", "/blah") | ForEach-Object {
  try   { $r = Invoke-WebRequest "http://localhost:3001$_" -UseBasicParsing; Write-Host "$_ → $($r.StatusCode)" }
  catch { Write-Host "$_ → 404" }
}
```

Expected output:
```
/home     → 200
/about    → 200
/contact  → 200
/services → 200
/blah     → 404
```

---

## 📋 Request/Response Flow

```
Browser                          Node.js Server
   │                                   │
   │  GET /about HTTP/1.1              │
   │ ─────────────────────────────────►│
   │                                   │  url = "/about"
   │                                   │  routes["/about"] → about.html ✅
   │                                   │  fs.readFile("pages/about.html")
   │                                   │       │ (async, non-blocking)
   │                                   │       ▼
   │                                   │  callback fires with file data
   │  HTTP/1.1 200 OK                  │
   │  Content-Type: text/html          │
   │  <html>...</html>                 │
   │ ◄─────────────────────────────────│
   │                                   │
   │  GET /style.css                   │
   │ ─────────────────────────────────►│
   │  HTTP/1.1 200 OK                  │
   │  Content-Type: text/css           │
   │ ◄─────────────────────────────────│
```

---

## 📁 Modules Used

| Module | Type | Purpose |
|--------|------|---------|
| `http` | Built-in | Create the TCP/HTTP server |
| `fs` | Built-in | Read HTML/CSS files from disk asynchronously |
| `path` | Built-in | Safely join file paths across OS platforms |

> 📦 **Total npm packages installed: 0**  
> Everything runs on Node.js core — no `node_modules`, no `package.json` required.

---

## 🌐 Why Pure Node.js (No Express)?

<div align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjd0bXY3bGc3cHh3dW92NWRoc3IxcGVxY3BtYTY0Y3U2aTg3czlqYyZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/LmNwrBhejkK9EFP504/giphy.gif" width="420" alt="why gif"/>
</div>

This assignment intentionally avoids Express.js to demonstrate understanding of what happens **under the hood**:

| | Pure `http` module | Express.js |
|--|--|--|
| Dependencies | 0 | ~50+ |
| Learning value | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Routing | Manual (O(1) map) | Framework-managed |
| Middleware | Manual | `app.use()` |
| Control | Total | Abstracted |

Understanding raw Node.js HTTP **makes you better at Express**, because you know what Express is doing for you.

---

## 👨‍💻 Author

<div align="center">
<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm9pNXVob2Y5aHpwamJldHFpNXoyNmpzOXVxdjN3NHZxbThhcXY5eSZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="200" alt="author gif"/>

**Built with 💙 for Tutedude MERN Stack — Assignment 6**

*"The best way to understand a framework is to build without it first."*

</div>

---

<div align="center">

**⭐ Star this repo if it helped you understand Node.js HTTP servers!**

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGZmMzN4anZsMnhmNW96OWFxMXZrd2wwNXE5OWZvNTdha3dtcTU0aSZlcD12MV9pbnRlcm5hbGdfaWZfaWQmY3Q9Zw/3oEjHWpiVIOGXT5l9m/giphy.gif" width="300" alt="star gif"/>

</div>
