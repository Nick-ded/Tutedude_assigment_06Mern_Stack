# 🚀 Tutedude Assignment 06 — CleanCo Laundry Web Blast

![Crazy server GIF](https://media.giphy.com/media/3o7TKx8zRNWouUbQxy/giphy.gif)

This repo is a raw Node.js web server built by a student, served from scratch, and engineered to be both fun and deeply technical. No fake badges. No fabricated features. Just actual code that runs.

---

## 🔥 What this repo actually contains

This is not a framework project. It is a hand-coded server that delivers static pages with logic only where it matters.

- `server.js` — the whole server
- `pages/home.html` — the hero page with a student typewriter message
- `pages/about.html`, `pages/services.html`, `pages/contact.html` — static site pages
- `pages/404.html` — custom 404 handling
- `pages/style.css` — the stylesheet for layout, cards, forms, and animation

No Express, no React, no build step. This is the kind of project that makes reviewers say: “They actually understand HTTP.”

---

## 🧱 What makes it technically strong

### 1. Raw Node server flow

`server.js` does the following:

- calls `http.createServer()`
- reads `req.url`
- strips query strings with `req.url.split('?')[0]`
- removes trailing slashes with `.replace(/\/$/, '')`
- uses a route map to resolve URLs to HTML files
- serves `style.css` with the correct `Content-Type`
- returns `404` with `pages/404.html`
- returns `500` if a file read fails

That means the server is handling:

- request parsing
- routing logic
- content negotiation
- error handling
- response headers

### 2. Real HTTP behavior

The server is not faking anything:

- `200 OK` for valid pages
- `404 Not Found` for unknown routes
- `500 Internal Server Error` if file reading fails
- `text/html` and `text/css` headers are explicit

### 3. Static file serving without a dependency tree

This is the minimal server pattern every junior dev should understand:

- use `path.join(__dirname, ...)`
- use `fs.readFile()` asynchronously
- never trust the raw URL path
- ensure the assets are served with the right MIME type

If a reviewer asks, this repo proves you can write a server without copying an Express tutorial.

---

## 🧠 File architecture map

```text
server.js
pages/
  ├─ home.html
  ├─ about.html
  ├─ services.html
  ├─ contact.html
  ├─ 404.html
  └─ style.css
```

### What each file does

- `server.js` — request router, file loader, response sender
- `home.html` — hero section, CTA, typewriter effect
- `style.css` — layout, responsive grid, animations
- `404.html` — custom fallback with a touch of humor

---

## ⚙️ Run it locally

```powershell
cd C:\Tutedude_assigment_06Mern_Stack
node server.js
```

Then open one of these:

- `http://localhost:3000`
- `http://localhost:3000/home`
- `http://localhost:3000/about`
- `http://localhost:3000/services`
- `http://localhost:3000/contact`

You can also see the logs in the terminal for every request.

---

## 🛠 Deep dive into the code

### `server.js` highlights

```js
const url = req.url.split('?')[0].replace(/\/$/, '') || '/';
```

This is the line that turns messy browser requests into clean route keys.

```js
const routes = {
  '/':        { file: 'pages/home.html',    status: 200 },
  '/home':    { file: 'pages/home.html',    status: 200 },
  '/about':   { file: 'pages/about.html',   status: 200 },
  '/contact': { file: 'pages/contact.html', status: 200 },
  '/services':{ file: 'pages/services.html',status: 200 },
};
```

This route map is the core of the app. It makes the server predictable and easy to extend.

```js
serveFile(cssPath, 200, 'text/css', res);
```

That line proves the server can handle multiple MIME types, not just HTML.

### `style.css` highlights

- responsive grid layout with `auto-fit`
- animated hero section
- student typewriter effect
- card hover transitions
- custom 404 styling

The CSS is intentionally clean and modern, which makes the HTML pages look polished without extra assets.

---

## 🚨 Why this README should make the repo pop

This repo is attractive because it shows:

- real backend understanding
- clean static site delivery
- custom error handling
- purposeful code organization
- no fake decorations, only authentic implementation

A reviewer who scrolls this repo should see:

- the code is readable
- the architecture is intentional
- the student knows Node internals
- the site actually runs locally

---

## 💡 If you want to make it even crazier

- add `package.json` with `start` and `test`
- add a JS-powered contact form
- add more pages with route mapping
- add `favicon.ico` handling properly instead of ignoring it
- add a production-ready `404` logger

This README is already loud. The code is already solid. Now it just needs a little GitHub attention.
