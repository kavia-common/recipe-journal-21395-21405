# recipe-journal-21395-21405

This repository contains the React frontend for Recipe Journal.

Auth Setup:
- Supabase client initialized in `src/utils/supabaseClient.js`
- Auth context/provider in `src/context/AuthContext.js`
- Protected route with `src/components/ProtectedRoute.js`
- UI: Login, Signup, AuthCallback, Dashboard, Discover, My Recipes, Navbar, QuoteHeader, SearchBar, RecipeCard
- Hash-based navigation with protected routes.

Environment:
- Copy `react_frontend/.env.example` to `react_frontend/.env` and fill:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`
  - `REACT_APP_SITE_URL`
  - `REACT_APP_BACKEND_BASE_URL` (e.g., http://localhost:8000)

Backend integration:
- Frontend calls backend proxy endpoints:
  - GET `${REACT_APP_BACKEND_BASE_URL}/api/quotes/random`
  - GET `${REACT_APP_BACKEND_BASE_URL}/api/recipes/search?q=...`
  - GET `${REACT_APP_BACKEND_BASE_URL}/api/recipes/{meal_id}`
- Ensure the backend service is reachable at that base URL and has CORS configured for the frontend origin.

Run frontend:
- cd react_frontend
- npm install
- npm start

Routes:
- `#/` Home
- `#/discover` Recipe search and save
- `#/my-recipes` Protected: saved recipes list with edit/delete
- `#/login` Login
- `#/signup` Signup
- `#/auth/callback` Auth callback
- `#/dashboard` Protected sample dashboard

Theme:
- Ocean Professional theme with TailwindCSS utility classes and CSS variables.