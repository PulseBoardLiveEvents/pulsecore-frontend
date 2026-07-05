# PulseBoard — Frontend

A React + TypeScript single-page app for real-time conference check-in,
pre-registration, and organizer reporting, backed by the
[`pulseboard-backend`](../pulseboard-backend) Spring Boot API.

## Live Demo

Deployed on [Render](https://render.com): https://eventcheckin-pulsecore-frontend.onrender.com/

Talks to the live backend at https://pulsecore-backend.onrender.com/. Free-tier
Render services spin down after inactivity, so the first load (and its first
API calls) may take 30-60s while the backend instance wakes up.

## Tech Stack

- **React 19** + **TypeScript**, built with **Vite**
- **React Router 7** for client-side routing
- A small hand-rolled `fetch` API client (`src/api/client.ts`) — no axios — with a typed `ApiError` that surfaces backend validation messages
- Global live state via React Context (`src/context/LiveDataContext.tsx`), polling the backend on an interval (`LIVE_POLL_INTERVAL_MS`) and diffing consecutive polls to synthesize a client-side activity feed
- **CSS Modules** per component, plus shared global/theme stylesheets (`src/styles/`) — no Tailwind, no styled-components
- **Oxlint** for linting

## Pages / Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | `LandingPage` | Marketing/home page with quick actions into the flows below |
| `/checkin` | `CheckInPage` | Front-desk view: search/scan to check attendees in, undo check-ins, add walk-ins |
| `/register` | `RegisterPage` | Pre-register an attendee for a session ahead of time (no check-in yet) |
| `/create-event` | `CreateEventPage` | Create a new session (name + capacity) at runtime |
| `/dashboard` | `DashboardPage` | Organizer view: live counts, per-session capacity, VIP arrivals, activity feed |

## Project layout

```
src/
├── pages/
│   ├── LandingPage/        # Hero, QuickActions, StatsStrip, HowItWorks, FeaturesGrid, CtaSection
│   ├── CheckInPage/         # SearchBar, FilterChips, AttendeeCard, WalkInForm, RecentCheckInsPanel
│   ├── RegisterPage/        # RegisterForm
│   ├── CreateEventPage/     # CreateSessionForm
│   └── DashboardPage/       # ActivityFeed, AttendeeTable, CapacityAlertBanner, SessionCapacityList, VipArrivalsList
├── components/
│   ├── common/              # Avatar, Badge, Button, Card, ErrorBanner, LivePulse, ProgressBar, StatCard
│   └── layout/               # NavBar, TopBar, Footer
├── context/                  # LiveDataContext + its type definition
├── api/                      # apiClient wrapper + attendeesApi (all endpoint calls)
├── hooks/                     # useLiveData, useNow
├── constants/                 # routes, site copy, runtime config
├── types/                     # Shared TypeScript types (Attendee, Session, DashboardData, ...)
└── utils/                     # formatters, stat helpers, avatar tinting
```

## Running locally

Requires Node 18+.

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`. By default it talks to the backend at
`http://localhost:8080/api` — override with a `VITE_API_BASE_URL` env var
(see `src/constants/config.ts`) if the backend runs elsewhere.

Other scripts:
```bash
npm run build     # type-check (tsc -b) + production build
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

### Via Docker

From the repo root:

```bash
docker compose up --build frontend
```

Note: `VITE_API_BASE_URL` is baked into the JS bundle at Docker **build**
time (see `pulseboard-frontend/Dockerfile`), since the browser — not the
frontend container — calls the backend directly. If the backend isn't at
`http://localhost:8080/api`, pass a build arg:
```bash
docker compose build --build-arg VITE_API_BASE_URL=http://your-backend-host:8080/api frontend
```

## Deployment note

`public/_redirects` provides a Netlify-style SPA fallback (`/* /index.html
200`) so client-side routing works when deployed to Netlify. The Docker/nginx
target achieves the same thing via `try_files` in `nginx.conf`.
