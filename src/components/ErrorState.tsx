import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  backTo?: string;
  backLabel?: string;
}

export function ErrorState({
  title = 'Unable to load content',
  message = 'We encountered an issue communicating with the server. Please check your connection and try again.',
  onRetry,
  isRetrying = false,
  backTo,
  backLabel = 'Go back',
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="bg-white rounded-2xl border border-red-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-8"
    >
      <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4 ring-8 ring-red-50/50">
        <AlertCircle className="w-7 h-7" aria-hidden="true" />
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        {title}
      </h2>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px]"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>{isRetrying ? 'Retrying...' : 'Try Again'}</span>
          </button>
        )}

        {backTo && (
          <Link
            to={backTo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{backLabel}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
