import { Search, Filter, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PostCard } from '../components/PostCard';
import { PostListSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/Pagination';
import { SortOption } from '../types';

export function Posts() {
  useDocumentTitle('Posts');

  const {
    posts,
    allFilteredPosts,
    totalCount,
    users,
    usersMap,
    isLoading,
    error,
    isRetrying,
    retry,
    searchQuery,
    setSearchQuery,
    selectedUserId,
    setSelectedUserId,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    clearFilters,
  } = usePosts({ itemsPerPage: 9, initialSort: 'latest' });

  const hasActiveFilters = searchQuery !== '' || selectedUserId !== 'all' || sortBy !== 'latest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            REST API Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Browse All Posts
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Explore 100+ public posts dynamically fetched from JSONPlaceholder with client-side filtering, sorting, and pagination.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={retry}
            disabled={isLoading || isRetrying}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-xs font-semibold transition-colors disabled:opacity-50 min-h-[44px] focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="Refresh posts list from API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{isRetrying ? 'Refreshing...' : 'Refresh API'}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <section
        aria-label="Search and Filter Controls"
        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <label htmlFor="posts-search-input" className="sr-only">
              Search posts by title or keyword
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="posts-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts by title or content..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none min-h-[44px]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Author Filter Dropdown */}
          <div>
            <label htmlFor="author-select-filter" className="sr-only">
              Filter by author
            </label>
            <div className="relative">
              <Filter
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <select
                id="author-select-filter"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none min-h-[44px]"
              >
                <option value="all">All Authors ({users.length})</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label htmlFor="sort-by-select" className="sr-only">
              Sort posts
            </label>
            <div className="relative">
              <SlidersHorizontal
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none min-h-[44px]"
              >
                <option value="latest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="title-asc">Sort: Title (A-Z)</option>
                <option value="title-desc">Sort: Title (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active filter badges / summary */}
        {hasActiveFilters && (
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                  Keyword: "{searchQuery}"
                </span>
              )}
              {selectedUserId !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                  Author: {usersMap.get(Number(selectedUserId))?.name || `ID #${selectedUserId}`}
                </span>
              )}
              {sortBy !== 'latest' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                  Sorted: {sortBy}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-indigo-600 hover:text-indigo-800 font-semibold focus-visible:ring-1 focus-visible:ring-indigo-500 rounded p-1"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* Main Content Area */}
      <section aria-label="Posts list">
        {isLoading ? (
          <PostListSkeleton count={9} />
        ) : error ? (
          <ErrorState
            title="Failed to fetch posts"
            message={error}
            onRetry={retry}
            isRetrying={isRetrying}
          />
        ) : allFilteredPosts.length === 0 ? (
          <EmptyState
            title="No matching posts found"
            description={
              searchQuery || selectedUserId !== 'all'
                ? `No posts matched your search query "${searchQuery}" or selected author filter.`
                : 'No posts are currently available from the REST endpoint.'
            }
            actionText="Clear Filters"
            onActionClick={clearFilters}
          />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  author={usersMap.get(post.userId)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}
