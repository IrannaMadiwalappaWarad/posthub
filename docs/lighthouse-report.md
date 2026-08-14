# Lighthouse & Web Vitals Audit Guide

This document outlines the performance, accessibility, best practices, and SEO benchmarks targeted by **PostHub**, along with step-by-step instructions for running an independent audit.

---

## Target Metrics

| Category | Target Score | Optimization Strategy |
| :--- | :--- | :--- |
| **Performance** | $\ge$ 90 | Dimension-stable skeleton loaders, zero layout shifts (CLS < 0.1), client-side slicing, lightweight asset footprint. |
| **Accessibility (A11y)** | $\ge$ 90 | Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), visible focus rings, ARIA attributes, 44px+ touch targets. |
| **Best Practices** | $\ge$ 90 | Modern ES modules, zero console errors, HTTPS-ready assets, strict type safety. |
| **SEO** | $\ge$ 90 | Dynamic document titles per route (`useDocumentTitle`), meta descriptions, Open Graph tags. |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Pre-allocated skeleton placeholder heights matching real rendered post and user cards. |

---

## How to Run a Lighthouse Audit

To obtain verified, real-time audit scores:

1. **Build and Preview the Production App:**
   ```bash
   npm run build
   npm run preview
   ```
2. **Open Google Chrome in Incognito Mode** (to ensure browser extensions do not skew metrics).
3. Navigate to the local preview URL (typically `http://localhost:3000` or `http://localhost:4173`).
4. Press `F12` or `Ctrl + Shift + I` (`Cmd + Option + I` on macOS) to open Chrome DevTools.
5. Select the **Lighthouse** tab.
6. Configure the audit settings:
   - **Mode:** Navigation (Default)
   - **Device:** Mobile (Throttled 4G / Simulated Slow CPU)
   - **Categories:** Performance, Accessibility, Best Practices, SEO
7. Click **Analyze page load**.
8. Export the JSON or HTML report and save screenshots inside this `docs/` directory.

---

## How to Run an axe DevTools Accessibility Audit

1. Install the [axe DevTools Chrome Extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd).
2. Open DevTools on `http://localhost:3000`.
3. Switch to the **axe DevTools** tab.
4. Click **Scan FULL Page**.
5. Verify zero critical or serious WCAG 2.1 AA violations across all 7 routes (`/`, `/posts`, `/posts/:id`, `/users`, `/users/:id`, `/create`, `/about`).
