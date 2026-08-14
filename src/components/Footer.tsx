import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 px-4 sm:px-8 py-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-slate-500">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="font-semibold text-slate-700">API Status: Operational</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>© {currentYear} PostHub • CodingAtom Assessment</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/posts"
            className="hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
          >
            Posts
          </Link>
          <Link
            to="/users"
            className="hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
          >
            Users
          </Link>
          <Link
            to="/create"
            className="hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
          >
            Create Post
          </Link>
          <Link
            to="/about"
            className="hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
          >
            Architecture
          </Link>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-600 font-mono text-[11px]">React 19 + TypeScript + Tailwind 4</span>
        </div>
      </div>
    </footer>
  );
}
