# 🚀 Tutedude Assignment 06 — CleanCo Laundry Web Blast

Welcome to the wildest README in the repo galaxy. This is not your average `README.md`: it's a no-fake-badges, no-BS guide to the server-powered laundry page experience. Expect some chaos, some tech depth, and zero made-up shield icons.

---

## 🌪 What this thing actually is

This project is a tiny Node.js web server that serves a static single-page-ish website with:

- `server.js`: built with only `http`, `fs`, and `path`
- `pages/*.html`: static HTML pages for `home`, `about`, `services`, `contact`, and `404`
- `pages/style.css`: the shared stylesheet for everything
- custom 404 handling for nonsense URLs
- a student-style typewriter message on the homepage

Yes, no Express. No frameworks. Just raw Node plumbing and good old file reads.

---

## 🧠 Why this is actually kind of cool

This is not a React app, not a Next.js monster, not a `package.json` dependency forest.

It is a simple, human-readable server that does exactly what it says:

- routes requests manually
- serves HTML pages
- serves `style.css`
- returns `404` with a real page
- logs every request to the terminal

If a computer science teacher were grading this, the credit would be for understanding the HTTP request cycle.

---

## 🔧 What lives in the repo

- `server.js`
  - creates an `http` server
  - normalizes the request path
  - routes `/`, `/home`, `/about`, `/services`, `/contact`
  - serves `/style.css` as CSS
  - serves `pages/404.html` for unknown routes

- `pages/home.html`
  - homepage
  - includes a typewriter animation that says: `Code written by a student.`

- `pages/about.html`
  - about page

- `pages/services.html`
  - services page

- `pages/contact.html`
  - contact page

- `pages/404.html`
  - custom 404 not found page

- `pages/style.css`
  - global styles
  - hero section styling
  - card grid layout
  - typewriter effect CSS

---

## 🚀 How to launch it

Open a terminal, go here:

```powershell
cd C:\Tutedude_assigment_06Mern_Stack
node server.js
```

Then open your browser to:

- `http://localhost:3000`
- `http://localhost:3000/home`
- `http://localhost:3000/about`
- `http://localhost:3000/services`
- `http://localhost:3000/contact`

The server logs requests in the terminal, so you can watch it handle every page visit like a washing machine spinning code.

---

## 🤯 Crazy technical depth (but still real)

This is not a fake badge factory. Here's what the server does under the hood:

- normalizes `req.url`
- strips query strings with `req.url.split('?')[0]`
- removes trailing slashes using `.replace(/\/$/, '')`
- maps clean paths to file paths
- uses `fs.readFile()` to load HTML/CSS asynchronously
- sets `Content-Type` headers explicitly
- sends `404` status for unknown routes
- falls back to a plain-text `500` if a file read fails

That means the server handles both happy paths and error paths. Real engineering.

---

## 🎉 Read this if you want to tweak it

If you want to make this even crazier:

- add a `package.json` and scripts
- add real image assets
- add a form handler to `contact`
- add dynamic routing for a page generator
- add a client-side script in `pages/home.html`

But right now, this is the cleanest raw Node static site server you can get.

---

## 🧺 Summary

This repo is:

- simple
- Node-powered
- static-HTML-based
- student-friendly
- authentically technical

No fake badges. No fake scoreboard. Just a real Node server and a real static website.

Enjoy the chaos.
