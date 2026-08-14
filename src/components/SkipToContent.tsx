export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only pointer-events-none focus:pointer-events-auto focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Skip to main content
    </a>
  );
}