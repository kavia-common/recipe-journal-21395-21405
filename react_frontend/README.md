# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **Auth Ready**: Supabase Auth integrated (signup, login, session, protected routes)

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Configure environment variables
- Copy `.env.example` to `.env` in this folder and fill:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`
  - `REACT_APP_SITE_URL` (e.g. http://localhost:3000)

3) Configure Supabase Auth (Dashboard → Authentication → URL Configuration)
- Site URL: http://localhost:3000/
- Add redirect allowlist: http://localhost:3000/**

4) Start the app
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000)

## Routes

This template uses hash-based routing (no external router dependency):
- `#/` Home
- `#/login` Email/password login and magic link
- `#/signup` Email/password signup
- `#/auth/callback` Supabase auth callback (email confirmation / magic link)
- `#/dashboard` Protected route (requires login)

## Auth API

Auth context is provided at `src/context/AuthContext.js`:
- `useAuth()` hook exposes `{ user, session, loading, signUp, signInWithPassword, signOut }`

Supabase is initialized at `src/utils/supabaseClient.js` and uses `REACT_APP_*` env vars.

## Customization

- Colors and theme toggling live in `src/App.css`.
- Components are in `src/components/`.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
