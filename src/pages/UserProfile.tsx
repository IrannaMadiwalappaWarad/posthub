import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, Building2, MapPin, Navigation, BookOpen, User as UserIcon } from 'lucide-react';
import { getUser, getUserPosts, FetchError } from '../api/api';
import { User, Post } from '../types';
import { PostCard } from '../components/PostCard';
import { UserProfileSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const pageTitle = user ? `${user.name}'s Profile` : 'User Profile';
  useDocumentTitle(pageTitle);

  const loadUserData = useCallback(async (signal?: AbortSignal, isRetry = false) => {
    if (!id) return;
    if (isRetry) setIsRetrying(true);
    else setIsLoading(true);
    setError(null);

    try {
      const [fetchedUser, fetchedPosts] = await Promise.all([
        getUser(id, signal),
        getUserPosts(id, signal),
      ]);

      setUser(fetchedUser);
      setPosts(fetchedPosts);
    } catch (err: unknown) {
      if (err instanceof FetchError && err.isAborted) return;
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to load user profile. The author might not exist or the network failed.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadUserData(controller.signal);
    return () => controller.abort();
  }, [loadUserData]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <UserProfileSkeleton />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ErrorState
          title="User Profile Not Found"
          message={error || 'The requested creator could not be found.'}
          onRetry={() => {
            const controller = new AbortController();
            loadUserData(controller.signal, true);
          }}
          isRetrying={isRetrying}
          backTo="/users"
          backLabel="Back to Authors Directory"
        />
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-sm font-medium transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Authors</span>
        </button>
      </div>

      {/* User Header Profile Card */}
      <section
        aria-labelledby="user-profile-heading"
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md flex-shrink-0">
            {initials}
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                id="user-profile-heading"
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
              >
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                Author ID #{user.id}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">@{user.username}</p>
            <p className="text-sm text-slate-600 italic">
              "{user.company.catchPhrase}"
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          {/* Contact Details */}
          <div className="space-y-3.5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/60">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Contact & Digital Presence
            </h2>
            <div className="space-y-2.5 text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${user.email}`}
                  className="hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
                >
                  {user.email.toLowerCase()}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${user.phone}`}
                  className="hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
                >
                  {user.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          {/* Company & Location */}
          <div className="space-y-3.5 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/60">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Company & Residence
            </h2>
            <div className="space-y-2.5 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-900">{user.company.name}</p>
                  <p className="text-xs text-slate-500">{user.company.bs}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p>{user.address.suite}, {user.address.street}</p>
                  <p className="text-xs text-slate-500">{user.address.city}, {user.address.zipcode}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Navigation className="w-4 h-4 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <span>Geo Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User's Published Posts */}
      <section
        aria-labelledby="user-posts-heading"
        className="space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            <h2
              id="user-posts-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
            >
              Posts by {user.name}
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
            {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {posts.length === 0 ? (
          <EmptyState
            title="No posts published yet"
            description={`${user.name} has not authored any articles on JSONPlaceholder.`}
            icon={UserIcon}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} author={user} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
