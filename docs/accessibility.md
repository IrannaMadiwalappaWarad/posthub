# Accessibility (A11y) Compliance & Architecture

PostHub was engineered with strict adherence to **WCAG 2.1 Level AA** standards. Below is a comprehensive audit of the implemented patterns.

---

## 1. Semantic HTML Structure

- **Landmarks:** Every view uses landmark tags:
  - `<header>`: Application brand and primary navigation.
  - `<nav aria-label="...">`: Clearly labeled navigation contexts for desktop and mobile.
  - `<main id="main-content">`: Main content landmark targeted by skip-links.
  - `<article>`: Encapsulates individual self-contained entities (Posts, Users, Comments).
  - `<section aria-labelledby="...">`: Logical page sections tied to unique heading IDs.
  - `<footer>`: Application metadata, repository links, and copyright info.

---

## 2. Keyboard Navigation & Focus Management

- **Skip-to-Content Link:** Hidden off-screen by default; becomes visible on first tab keypress (`:focus:not-sr-only`) allowing users to bypass repetitive header navigation and jump directly to `#main-content`.
- **Automated Route Focus Management (`RouteFocusManager.tsx`):** On every internal route transition, keyboard focus is automatically shifted to the primary `<h1>` heading or the `<main>` container, preventing keyboard focus from being trapped in dead DOM nodes.
- **Visible Focus Rings:** Custom high-contrast `:focus-visible` styling (`outline: 2px solid #4f46e5; outline-offset: 2px;`) applied globally across all interactive elements.
- **Escape Key Handling:** The mobile navigation drawer listens for the `Escape` key and cleanly returns focus to the menu trigger button.

---

## 3. Screen Reader Support & ARIA

- **Live Regions (`aria-live="polite"`):** Dynamic page title changes and status notifications are announced politely to screen readers without interrupting user speech synthesis.
- **Form Error Associations:**
  - Form fields bind to error messages using `aria-describedby="[field]-error"`.
  - Invalid inputs flag `aria-invalid="true"`.
  - Required fields are explicitly marked with `aria-required="true"`.
- **Loading & Skeleton Roles:** Skeletons include `role="status"` and accessible text announcements (`<span className="sr-only">Loading content, please wait...</span>`).

---

## 4. Touch Targets & Responsive Ergonomics

- **Minimum Size:** All interactive buttons, navigation items, pagination controls, and links maintain a minimum interactive hit area of **44px $\times$ 44px**.
- **No Overflow:** Layout scales smoothly down to **320px viewport width** without horizontal scrolling or clipping.

---

## 5. Reduced Motion

- All CSS animations and transitions respect the user's OS-level motion preferences via `@media (prefers-reduced-motion: reduce)`.
