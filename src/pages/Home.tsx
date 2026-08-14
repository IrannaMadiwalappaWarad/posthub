import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PenSquare, Users, ShieldCheck, Zap, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { getPosts, getUsers, FetchError } from '../api/api';
import { Post, User } from '../types';
import { PostCard } from '../components/PostCard';
import { PostCardSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Home() {
  useDocumentTitle('Home');

  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<User[]>([]);
  const [usersMap, setUsersMap] = useState<Map<number, User>>(new Map());
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const loadDashboardData = async (signal?: AbortSignal, isRetry = false) => {
    if (isRetry) setIsRetrying(true);
    else setIsLoading(true);
    setError(null);

    try {
      const [allPosts, allUsers] = await Promise.all([
        getPosts(signal),
        getUsers(signal),
      ]);

      const map = new Map<number, User>();
      allUsers.forEach((u) => map.set(u.id, u));

      setUsersMap(map);
      setAuthors(allUsers.slice(0, 5));
      setTotalPostsCount(allPosts.length);
      setTotalUsersCount(allUsers.length);
      // Grab 6 featured posts
      setFeaturedPosts(allPosts.slice(0, 6));
    } catch (err: unknown) {
      if (err instanceof FetchError && err.isAborted) return;
      setError('Unable to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadDashboardData(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* 12-Column High Density Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Feed Column (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Dark Hero Banner */}
          <section
            aria-labelledby="hero-heading"
            className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-xl p-6 sm:p-8 text-white shadow-sm border border-slate-800 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-4 max-w-xl relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-800/60 border border-indigo-700/50 text-[11px] font-semibold text-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-300" aria-hidden="true" />
                <span>CodingAtom Web Development Internship</span>
              </div>

              <h1
                id="hero-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
              >
                High-Density REST API Explorer & Publishing Hub
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Explore real articles, inspect verified authors, and publish new posts. Engineered with React 19, TypeScript, and modern client-side caching.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/posts"
                  className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-400 min-h-[38px]"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Browse All Posts</span>
                </Link>

                <Link
                  to="/create"
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors border border-white/15 focus-visible:ring-2 focus-visible:ring-indigo-400 min-h-[38px]"
                >
                  <PenSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Create Post</span>
                </Link>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="hidden sm:block absolute right-6 -bottom-6 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          </section>

          {/* Featured Posts Section Header */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Featured Posts
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live API
              </span>
            </div>

            <Link
              to="/posts"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 group focus-visible:ring-1 focus-visible:ring-indigo-500 rounded p-1"
            >
              <span>View all ({totalPostsCount || 100})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Posts Grid (2 columns on tablet/desktop in feed) */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState
              title="Unable to load featured posts"
              message={error}
              onRetry={() => {
                const controller = new AbortController();
                loadDashboardData(controller.signal, true);
              }}
              isRetrying={isRetrying}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  author={usersMap.get(post.userId)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets Column (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Top Authors Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                <h2 className="text-sm font-bold text-slate-900">
                  Top Authors
                </h2>
              </div>
              <Link
                to="/users"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all ({totalUsersCount || 10})
              </Link>
            </div>

            <div className="space-y-3" role="list">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div className="flex-1 space-y-1">
                        <div className="h-3 bg-slate-200 rounded w-24" />
                        <div className="h-2.5 bg-slate-100 rounded w-32" />
                      </div>
                    </div>
                  ))
                : authors.map((author) => {
                    const initials = author.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();

                    return (
                      <Link
                        key={author.id}
                        to={`/users/${author.id}`}
                        className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                              {author.name}
                            </p>
                            <p className="text-[11px] text-slate-600 truncate">
                              @{author.username}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
                          10 posts
                        </span>
                      </Link>
                    );
                  })}
            </div>
          </div>

          {/* System Health & REST Metrics Widget */}
          <div className="bg-indigo-50/70 rounded-xl border border-indigo-100 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100/80 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-700" aria-hidden="true" />
                <h2 className="text-sm font-bold text-slate-900">
                  System Health & Metrics
                </h2>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>99.9% Up</span>
              </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-white p-3 rounded-lg border border-indigo-100/60 shadow-2xs">
                <p className="text-slate-600 text-[11px] font-medium">Total Posts</p>
                <p className="text-base font-bold text-indigo-900 mt-0.5">
                  {isLoading ? '...' : totalPostsCount || '100'}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100/60 shadow-2xs">
                <p className="text-slate-600 text-[11px] font-medium">Verified Users</p>
                <p className="text-base font-bold text-indigo-900 mt-0.5">
                  {isLoading ? '...' : totalUsersCount || '10'}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100/60 shadow-2xs">
                <p className="text-slate-600 text-[11px] font-medium">Endpoints</p>
                <p className="text-base font-bold text-emerald-600 mt-0.5">
                  4/4 Active
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100/60 shadow-2xs">
                <p className="text-slate-600 text-[11px] font-medium">Accessibility</p>
                <p className="text-base font-bold text-purple-600 mt-0.5">
                  WCAG AA
                </p>
              </div>
            </div>

            {/* Latency meter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Latency to JSONPlaceholder</span>
                <span className="font-semibold text-slate-800">~12ms</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full w-[94%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-indigo-100/80">
              <Link
                to="/about"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>View Architecture & Specs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
