# recipe-journal-21395-21405

This repository contains the React frontend for Recipe Journal.

Auth Setup:
- Supabase client initialized in `src/utils/supabaseClient.js`
- Auth context/provider in `src/context/AuthContext.js`
- Protected route with `src/components/ProtectedRoute.js`
- Basic UI: Login, Signup, AuthCallback, Dashboard
- Hash-based navigation: `#/login`, `#/signup`, `#/auth/callback`, `#/dashboard`

Environment:
- Copy `react_frontend/.env.example` to `react_frontend/.env` and fill `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, `REACT_APP_SITE_URL`.

Run frontend:
- cd react_frontend
- npm install
- npm start