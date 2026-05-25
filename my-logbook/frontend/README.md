# MyLogbook Frontend

This is the React frontend for MyLogbook. It provides the visitor registration screen and the visitor activity screen.

## Features

- Visitor check-in form with required fields
- Live read-only time display on the registration page
- Visitor activity route at `/visitor`
- Calendar-based activity filtering
- Status filtering for `in-building` and `signed-out` visitors
- Search by visitor name or organisation
- Sign-out button that updates a visitor log through the backend API

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Axios
- React Router 7

## Project Structure

```text
src/
+-- components/
|   +-- Calendar.jsx
|   +-- CheckBoxes.jsx
|   +-- Header.jsx
|   +-- SearchBar.jsx
|   +-- VisitorLog.jsx
+-- images/
+-- pages/
|   +-- HomePage.jsx
|   +-- VisitorPage.jsx
+-- App.jsx
+-- main.jsx
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Vite usually serves the app at:

```text
http://localhost:5173
```

## Backend Proxy

The frontend calls the backend with `/api/...` URLs. Vite proxies those requests to:

```text
http://localhost:9000
```

Make sure the backend is running with `PORT=9000` before using the frontend.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
