# Demo Video Script (60–90 Seconds)

A structured walkthrough script for recording your LinkedIn video submission.

---

### [0:00 - 0:15] Introduction & Home Dashboard
- **Screen:** Show the Home Dashboard (`/`).
- **Narration:**
  > "Hi everyone! Today I'm excited to present **PostHub**, a production-minded React and TypeScript application built for the CodingAtom Web Development Internship assessment. PostHub communicates directly with the JSONPlaceholder REST API."
- **Action:** Scroll smoothly down to reveal the quick metrics, feature highlights, and featured posts grid.

---

### [0:15 - 0:35] Posts Explorer, Search & Pagination
- **Screen:** Navigate to `/posts`.
- **Narration:**
  > "Here on the Posts page, we fetch 100 articles. We have instant client-side searching across titles and body text, author filtering, and sorting. Notice how pagination is smooth, with accessible controls and zero layout shift."
- **Action:**
  1. Type `"react"` or `"qui"` into the search box.
  2. Filter by an author from the dropdown.
  3. Change the sort order.
  4. Click page 2 in the pagination bar.

---

### [0:35 - 0:50] Post Details & Comment Threads
- **Screen:** Click on any post card to open `/posts/:id`.
- **Narration:**
  > "Clicking a post opens its dedicated detail page. We fetch the post body, calculate estimated read time, display the author badge, and load the entire comments discussion thread."
- **Action:** Scroll through the post and comments, then click **View Author Profile**.

---

### [0:50 - 1:05] Authors Directory & User Profiles
- **Screen:** Navigates to `/users/:id` and `/users`.
- **Narration:**
  > "On the author's profile, we see their company, contact details, geo coordinates, and a filtered list of all articles they have written. All requests support `AbortController` cancellation if the user navigates away mid-flight."

---

### [1:05 - 1:20] Accessible Form Validation & Creation
- **Screen:** Click **Create Post** (`/create`).
- **Narration:**
  > "Let's test our accessible form. If I submit empty fields, inline validation errors appear with `aria-invalid` and `aria-describedby` associations. Let's fill out a valid title and body."
- **Action:**
  1. Click **Publish Post** to trigger validation errors.
  2. Type a title (>5 chars) and body (>20 chars).
  3. Click **Publish Post**; show pending state ("Creating post...") and the green HTTP 201 Created confirmation card.

---

### [1:20 - 1:30] Mobile Responsiveness & Closing
- **Screen:** Switch Chrome DevTools to Mobile view (iPhone / 375px) or resize window.
- **Narration:**
  > "PostHub is fully responsive down to 320px, with accessible touch targets, a keyboard-friendly drawer menu, and complete WCAG AA compliance. Thank you CodingAtom for watching!"
- **Action:** Open the mobile drawer menu and close with Escape or tap.
