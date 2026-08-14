import { ElementType } from 'react';
import { SearchX, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  icon?: ElementType;
}

export function EmptyState({
  title = 'No results found',
  description = 'We could not find any records matching your criteria. Try adjusting your search query or filters.',
  actionText,
  actionHref,
  onActionClick,
  icon: Icon = SearchX,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs my-8"
    >
      <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4">
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        {title}
      </h2>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && (
        <div className="flex justify-center">
          {actionHref ? (
            <Link
              to={actionHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              <span>{actionText}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 min-h-[44px]"
            >
              <span>{actionText}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
