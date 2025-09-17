# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Auth Ready**: Supabase Auth integrated (signup, login, session, protected routes)
- **Discover**: Search recipes via backend MealDB proxy
- **My Recipes**: Save, view, update (notes/rating), and delete recipes (stored in Supabase)
- **Quote Header**: Random quote via backend proxy
- **Ocean Professional** theme with TailwindCSS

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
  - `REACT_APP_BACKEND_BASE_URL` (e.g. http://localhost:8000)

3) Configure Supabase Auth (Dashboard → Authentication → URL Configuration)
- Site URL: http://localhost:3000/
- Add redirect allowlist: http://localhost:3000/**

4) Start the app
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000)

## Routes

Hash-based routing (no external router dependency):
- `#/` Home
- `#/discover` Discover/search recipes
- `#/my-recipes` Protected: manage saved recipes
- `#/login` Email/password login and magic link
- `#/signup` Email/password signup
- `#/auth/callback` Supabase auth callback
- `#/dashboard` Protected sample dashboard

## Data and APIs

- Supabase table `public.recipes` with RLS (see project assets/supabase.md)
- Backend proxy endpoints:
  - GET `/api/quotes/random`
  - GET `/api/recipes/search?q=...`
  - GET `/api/recipes/{meal_id}`
- Frontend reads `REACT_APP_BACKEND_BASE_URL` for proxy base URL.

## Customization

- Colors/theme in `src/index.css` (CSS variables) + Tailwind utilities.
- Components in `src/components/`.
- API helpers in `src/utils/api.js`.

## Learn More

- React: https://reactjs.org/
- Supabase: https://supabase.com/docs
