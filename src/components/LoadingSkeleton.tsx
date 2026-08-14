export function PostCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between animate-pulse"
      aria-hidden="true"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="h-5 w-20 bg-slate-200 rounded-full" />
          <div className="h-4 w-16 bg-slate-100 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-slate-200 rounded" />
        <div className="space-y-2 pt-1">
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-5/6 bg-slate-100 rounded" />
          <div className="h-4 w-2/3 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <div className="space-y-1">
            <div className="h-3.5 w-24 bg-slate-200 rounded" />
            <div className="h-3 w-16 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="h-4 w-20 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading posts"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <span className="sr-only">Loading content, please wait...</span>
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs animate-pulse flex flex-col justify-between"
      aria-hidden="true"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="h-3.5 w-20 bg-slate-100 rounded" />
          <div className="h-4 w-28 bg-slate-100 rounded-full" />
        </div>
      </div>

      <div className="my-5 pt-4 border-t border-slate-100 space-y-2.5">
        <div className="h-4 w-48 bg-slate-100 rounded" />
        <div className="h-4 w-36 bg-slate-100 rounded" />
        <div className="h-4 w-40 bg-slate-100 rounded" />
      </div>

      <div className="h-10 w-full bg-slate-100 rounded-xl" />
    </div>
  );
}

export function UserListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading users"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <span className="sr-only">Loading users directory...</span>
      {Array.from({ length: count }).map((_, index) => (
        <UserCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading post details"
      className="max-w-4xl mx-auto space-y-8 animate-pulse"
    >
      <span className="sr-only">Loading post and comments...</span>
      <div className="h-9 w-32 bg-slate-200 rounded-lg" />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="h-5 w-24 bg-slate-200 rounded-full" />
        <div className="h-10 w-4/5 bg-slate-200 rounded" />
        <div className="flex items-center gap-3 py-2 border-y border-slate-100">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-11/12 bg-slate-100 rounded" />
          <div className="h-4 w-4/5 bg-slate-100 rounded" />
        </div>
      </div>

      <div className="space-y-4 pt-6">
        <div className="h-7 w-48 bg-slate-200 rounded" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200" />
                <div className="h-4 w-36 bg-slate-200 rounded" />
              </div>
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-2/3 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UserProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading user profile"
      className="max-w-5xl mx-auto space-y-8 animate-pulse"
    >
      <span className="sr-only">Loading user profile and posts...</span>
      <div className="h-9 w-32 bg-slate-200 rounded-lg" />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-200 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-8 w-48 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-100 rounded" />
            <div className="h-4 w-64 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-7 w-40 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </div>
    </div>
  );
}
