import { Link } from 'react-router-dom';
import { Home, BookOpen, Users, PenSquare, FileQuestion } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('404 Page Not Found');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-8">
      <div className="mx-auto w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
        <FileQuestion className="w-10 h-10" aria-hidden="true" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          HTTP Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          The requested route does not exist or has been moved. Explore one of the active pages below.
        </p>
      </div>

      {/* Suggested navigation grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Home Dashboard</p>
            <p className="text-xs text-slate-500">Return to main overview</p>
          </div>
        </Link>

        <Link
          to="/posts"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Browse Posts</p>
            <p className="text-xs text-slate-500">Search and filter articles</p>
          </div>
        </Link>

        <Link
          to="/users"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Authors Directory</p>
            <p className="text-xs text-slate-500">Find user profiles</p>
          </div>
        </Link>

        <Link
          to="/create"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <PenSquare className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Publish Post</p>
            <p className="text-xs text-slate-500">Submit a new article</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
