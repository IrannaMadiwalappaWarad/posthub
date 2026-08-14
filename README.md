# PostHub — Explore, Read and Create Posts

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-success.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

**PostHub** is a production-minded, responsive, and fully accessible multi-page web application built for the **CodingAtom Web Development Internship** assessment. The application interacts with a real REST API ([JSONPlaceholder](https://jsonplaceholder.typicode.com/)), implementing resilient data fetching, in-flight request cancellation via `AbortController`, client-side filtering and pagination, accessible form validation, and zero-layout-shift skeleton states.

---

## 🚀 Key Features

- **Real REST API Integration:** Full CRUD interaction with JSONPlaceholder endpoints (`/posts`, `/posts/:id`, `/users`, `/users/:id`, `/posts/:id/comments`, and POST `/posts`).
- **AbortController In-Flight Cancellation:** All API requests are attached to native `AbortSignal`s. Navigating away mid-request cleanly cancels pending network operations without state leaks or false error UI.
- **Explicit 5-State UI Pattern:** Every API-driven page explicitly handles **Loading**, **Success**, **Empty**, **Error**, and **Retry** states.
- **Client-Side Filtering, Sorting & Pagination:** Fast client-side search across post titles and bodies, author filtering, and accessible pagination.
- **Accessible Form Validation:** The `/create` form features real-time validation (Title 5–100 chars, Body 20–1000 chars, Author select), character count meters, `aria-invalid` / `aria-describedby` error bindings, and pending/optimistic submission states.
- **Automated Route Focus Management:** Seamless page transitions with route-change focus shifting to headings (`<h1>`) and screen reader announcements.
- **Global Error Boundary:** Recovers gracefully from unexpected rendering exceptions with reload and return-to-home actions.
- **Mobile-First Responsive Layout:** Fluidly scales from 320px smartphones to ultra-wide displays with 44px+ touch targets and accessible mobile drawer menus.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 | Component architecture and concurrent-safe hooks |
| **Language** | TypeScript 5.8 | Strict type checking without `any` |
| **Build Tool** | Vite 6 | Fast local development and optimized production bundling |
| **Routing** | React Router 7 | Client-side routing with browser history support |
| **Styling** | Tailwind CSS 4 | Utility-first responsive design and high-contrast styling |
| **Icons** | Lucide React | Lightweight, accessible SVG icon components |
| **Testing** | Vitest & React Testing Library | Unit and integration testing suite |

---

## 🌐 API Endpoints Used

PostHub uses the public REST API hosted at `https://jsonplaceholder.typicode.com`:

| Method | Endpoint | Application View | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/posts` | Home (`/`), Posts (`/posts`) | Retrieves 100 sample articles |
| `GET` | `/posts/:id` | Post Details (`/posts/:id`) | Retrieves individual post content |
| `GET` | `/posts/:id/comments` | Post Details (`/posts/:id`) | Retrieves discussion comments |
| `GET` | `/users` | Users (`/users`), Create (`/create`) | Retrieves all 10 registered authors |
| `GET` | `/users/:id` | User Profile (`/users/:id`) | Retrieves user details & company info |
| `GET` | `/posts?userId=:id` | User Profile (`/users/:id`) | Retrieves posts authored by a specific user |
| `POST` | `/posts` | Create Post (`/create`) | Submits new post; returns mock HTTP 201 entity |

> *Note:* JSONPlaceholder is a mock REST API. Created entities are simulated and not permanently persisted on the remote database across page reloads.

---

## 🗺️ Application Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | `Home.tsx` | Dashboard featuring metrics, project overview, and recent posts |
| `/posts` | `Posts.tsx` | Searchable, filterable, and paginated post catalog |
| `/posts/:id` | `PostDetails.tsx` | Individual article view with read-time estimate and comment threads |
| `/users` | `Users.tsx` | Community authors directory with search and post counts |
| `/users/:id` | `UserProfile.tsx` | Creator profile with contact info, coordinates, and authored posts |
| `/create` | `CreatePost.tsx` | Accessible form for submitting new posts with validation |
| `/about` | `About.tsx` | Architectural documentation and assessment overview |
| `*` | `NotFound.tsx` | Accessible 404 fallback with quick navigation |

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/posthub.git
cd posthub

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

### Running Tests
```bash
# Run unit & integration tests
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## ♿ Accessibility (WCAG 2.1 AA)

- **Skip-to-Content:** Allows keyboard-only users to skip navigation and jump directly to `#main-content`.
- **Keyboard Navigation:** Full Tab/Shift+Tab support with high-contrast `:focus-visible` outlines.
- **Automated Focus on Route Changes:** Shifts focus to the main `<h1>` tag upon navigation.
- **Form ARIA Bindings:** Inputs use `aria-invalid`, `aria-describedby`, and `aria-required`.
- **Touch Target Size:** All buttons, links, and form elements adhere to the **44px $\times$ 44px** minimum standard.
- **Reduced Motion:** Animations strictly respect `@media (prefers-reduced-motion: reduce)`.

Detailed documentation: [`docs/accessibility.md`](docs/accessibility.md).

---

## ⚡ Performance Optimization

- **Zero-CLS Skeletons:** Dimension-stable placeholder cards prevent content jumping during API fetches (targeting CLS < 0.1).
- **Client-Side Slicing:** Efficient in-memory pagination prevents redundant network calls.
- **Clean Bundle Size:** Lean dependency graph utilizing native web standards.

Audit guidelines: [`docs/lighthouse-report.md`](docs/lighthouse-report.md).

---

## 🛡️ Error Handling Architecture

1. **In-Flight Cancellation:** Prevents memory leaks and React state updates on unmounted views.
2. **Error Boundary:** Catches runtime UI errors and displays a friendly recovery screen.
3. **One-Click Retries:** Every failed fetch can be retried immediately without infinite loops.

---

## 🚀 Deployment Instructions

### Deploying to Netlify
1. Create a `public/_redirects` file with the rule:
   ```text
   /* /index.html 200
   ```
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploying to Vercel
1. Add a `vercel.json` file for SPA routing:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
2. Connect your GitHub repository to Vercel.

### Deploying to GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Configure `base: '/<repo-name>/'` in `vite.config.ts`.
3. Add deploy script in `package.json`: `"deploy": "gh-pages -d dist"`

---

## 📝 Assessment Submission Materials

- **LinkedIn Post Draft:** [`docs/linkedin-post.md`](docs/linkedin-post.md)
- **60–90s Demo Video Script:** [`docs/demo-script.md`](docs/demo-script.md)
- **Lighthouse Audit Guide:** [`docs/lighthouse-report.md`](docs/lighthouse-report.md)
- **Accessibility Specification:** [`docs/accessibility.md`](docs/accessibility.md)

---

## 📄 License

MIT © CodingAtom Assessment Project
