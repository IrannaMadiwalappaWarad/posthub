import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare, User as UserIcon, Building2, Mail, Share2, Check } from 'lucide-react';
import { getPost, getUser, getPostComments, FetchError } from '../api/api';
import { Post, User, Comment } from '../types';
import { PostDetailSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { CommentCard } from '../components/CommentCard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const pageTitle = post ? post.title.slice(0, 30) + '...' : 'Post Details';
  useDocumentTitle(pageTitle);

  const loadPostDetails = useCallback(async (signal?: AbortSignal, isRetry = false) => {
    if (!id) return;
    if (isRetry) setIsRetrying(true);
    else setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch the post and comments
      const [fetchedPost, fetchedComments] = await Promise.all([
        getPost(id, signal),
        getPostComments(id, signal),
      ]);

      setPost(fetchedPost);
      setComments(fetchedComments);

      // 2. Fetch author
      if (fetchedPost.userId) {
        try {
          const fetchedUser = await getUser(fetchedPost.userId, signal);
          setAuthor(fetchedUser);
        } catch {
          // Author fetch failure shouldn't crash post view
          setAuthor(null);
        }
      }
    } catch (err: unknown) {
      if (err instanceof FetchError && err.isAborted) return;
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to load this post. It may not exist or the server could not be reached.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    loadPostDetails(controller.signal);
    return () => controller.abort();
  }, [loadPostDetails]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PostDetailSkeleton />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ErrorState
          title="Post Not Found or Failed to Load"
          message={error || 'The requested post could not be retrieved from the REST API.'}
          onRetry={() => {
            const controller = new AbortController();
            loadPostDetails(controller.signal, true);
          }}
          isRetrying={isRetrying}
          backTo="/posts"
          backLabel="Back to Posts Listing"
        />
      </div>
    );
  }

  const wordCount = (post.title + ' ' + post.body).split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 40));
  const authorInitials = author
    ? author.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : `U${post.userId}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-sm font-medium transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 text-sm font-medium transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-500 min-h-[44px]"
            aria-label="Copy link to this post"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span className="text-emerald-600 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" aria-hidden="true" />
                <span>Share Post</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Post Article */}
      <article
        id={`post-article-${post.id}`}
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8"
      >
        {/* Post Meta Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center px-3 py-1 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            Article #{post.id}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{readTime} min read (~{wordCount} words)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{comments.length} Comments</span>
          </span>
        </div>

        {/* Post Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight capitalize">
          {post.title}
        </h1>

        {/* Author Snapshot Bar */}
        {author ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
            <Link
              to={`/users/${author.id}`}
              className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-xs flex-shrink-0">
                {authorInitials}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {author.name}
                </p>
                <p className="text-xs text-slate-500">@{author.username} • {author.company.name}</p>
              </div>
            </Link>

            <Link
              to={`/users/${author.id}`}
              className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors min-h-[38px]"
            >
              View Author Profile
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-3 border-y border-slate-100 text-xs text-slate-500">
            <UserIcon className="w-4 h-4" aria-hidden="true" />
            <span>Author ID: #{post.userId}</span>
          </div>
        )}

        {/* Post Body Content */}
        <div className="prose prose-slate max-w-none">
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed capitalize">
            {post.body}
          </p>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mt-4">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
      </article>

      {/* Author Card Info (Extended) */}
      {author && (
        <section
          aria-labelledby="author-section-heading"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center text-base">
                {authorInitials}
              </div>
              <div>
                <h2 id="author-section-heading" className="text-base font-bold text-slate-900">
                  About the Author: {author.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {author.company.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {author.email}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={`/users/${author.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors min-h-[44px]"
            >
              <span>See more by {author.name.split(' ')[0]}</span>
            </Link>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section
        aria-labelledby="comments-section-heading"
        className="space-y-6 pt-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            <h2
              id="comments-section-heading"
              className="text-xl font-bold text-slate-900 tracking-tight"
            >
              Responses & Discussion
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
            {comments.length}
          </span>
        </div>

        {comments.length === 0 ? (
          <p className="text-sm text-slate-500 italic py-4">
            No comments available for this post.
          </p>
        ) : (
          <div className="space-y-4" role="feed" aria-label="Post comments">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
