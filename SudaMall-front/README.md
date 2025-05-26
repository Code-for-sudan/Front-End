# SudaMall Frontend – Web App

This is the frontend implementation of **SudaMall**, a Sudanese multi-category online shopping platform. The frontend is built with a **mobile-first** approach using **React**, **Tailwind CSS**, and **Vite**.

---

## Key Features

- 🛒 Online mall interface with support for various product categories (fashion, electronics, groceries, more)
- 📱 Mobile-first responsive design
- ⚡ Fast dev experience using Vite
- ♻️ Reusable, modular components for scaling UI

---

## Folder Structure

```bash
SudaMall-front/
├── public/               # Static files (favicon, etc.)
├── src/
│   ├── assets/           # Images, icons
│   ├── app/              # Redux stats control
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom react hooks
│   ├── layouts/          # Page layouts (e.g., Navbar, Footer)
│   ├── pages/            # Route-level pages (Home, about, etc.)
│   ├── routes/           # React router setup
│   ├── services/         # API calls and helpers
│   ├── utils/            # Utility functions and helpers
│   ├── App.jsx           # Root React component
│   ├── main.jsx          # Vite entry point
│   └── index.css          
├── vite.config.js        # vite configuration file
├── package.json          # vite configuration file
├── package-lock.json     # vite configuration file
├── eslint.config.js      # vite configuration file
├── vite.config.js        # vite configuration file
├── index.html            # vite configuration file
└── README.md             # You are here
```

---

## Setup Instructions

- if you haven't install vite in your machine run:
```bash
npm install vite@5.2.10 --save-dev
```
and then Install dependencies and run the development server:
```bash
npm install
npm run dev
```