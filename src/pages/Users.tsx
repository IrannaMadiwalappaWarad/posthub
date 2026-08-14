import { Search, X, Users as UsersIcon, RefreshCw } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { UserCard } from '../components/UserCard';
import { UserListSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

export function Users() {
  useDocumentTitle('Users');

  const {
    users,
    allUsers,
    totalCount,
    userPostCounts,
    isLoading,
    error,
    isRetrying,
    retry,
    searchQuery,
    setSearchQuery,
  } = useUsers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Community & Authors
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Authors Directory
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Browse all {allUsers.length || 10} verified creators registered on JSONPlaceholder. Inspect their profiles, company affiliations, and published articles.
          </p>
        </div>

        <button
          type="button"
          onClick={retry}
          disabled={isLoading || isRetrying}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-semibold transition-colors disabled:opacity-50 min-h-[44px] focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Refresh users list from API"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span>{isRetrying ? 'Refreshing...' : 'Refresh Users'}</span>
        </button>
      </div>

      {/* Search Bar */}
      <section
        aria-label="Search Authors"
        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs"
      >
        <div className="relative max-w-md">
          <label htmlFor="users-search-input" className="sr-only">
            Search authors by name, company, city, or username
          </label>
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="users-search-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search authors by name, company, or city..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none min-h-[44px]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded"
              aria-label="Clear user search query"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>

      {/* Content Grid */}
      <section aria-label="Authors Grid">
        {isLoading ? (
          <UserListSkeleton count={8} />
        ) : error ? (
          <ErrorState
            title="Failed to load author directory"
            message={error}
            onRetry={retry}
            isRetrying={isRetrying}
          />
        ) : totalCount === 0 ? (
          <EmptyState
            title="No authors found"
            description={`No creators matched your search query "${searchQuery}".`}
            actionText="Clear Search"
            onActionClick={() => setSearchQuery('')}
            icon={UsersIcon}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                postCount={userPostCounts[user.id]}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
