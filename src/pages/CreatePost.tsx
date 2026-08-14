import { useState, useEffect, useId, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { PenSquare, Send, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Info, ArrowRight, BookOpen } from 'lucide-react';
import { getUsers, createPost, FetchError } from '../api/api';
import { User, CreatedPostResponse, FormErrors } from '../types';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function CreatePost() {
  useDocumentTitle('Create Post');

  const titleId = useId();
  const bodyId = useId();
  const authorId = useId();

  // Form Fields
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState<string>('');

  // Touched state for validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});

  // Authors / Users state
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdPost, setCreatedPost] = useState<CreatedPostResponse | null>(null);
  const [createdPostsHistory, setCreatedPostsHistory] = useState<CreatedPostResponse[]>([]);

  // Fetch users for author select
  useEffect(() => {
    const controller = new AbortController();
    async function loadUsers() {
      setIsLoadingUsers(true);
      try {
        const data = await getUsers(controller.signal);
        setUsers(data);
        if (data.length > 0) {
          setUserId(String(data[0].id));
        }
      } catch (err: unknown) {
        if (err instanceof FetchError && err.isAborted) return;
        console.error('Failed to load authors for dropdown:', err);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  // Validation function
  const validate = (fieldValues = { title, body, userId }): FormErrors => {
    const newErrors: FormErrors = {};

    // Title validation: min 5, max 100
    if (!fieldValues.title.trim()) {
      newErrors.title = 'Post title is required.';
    } else if (fieldValues.title.trim().length < 5) {
      newErrors.title = `Title must be at least 5 characters (currently ${fieldValues.title.trim().length}).`;
    } else if (fieldValues.title.length > 100) {
      newErrors.title = `Title must not exceed 100 characters (currently ${fieldValues.title.length}).`;
    }

    // Body validation: min 20, max 1000
    if (!fieldValues.body.trim()) {
      newErrors.body = 'Post body content is required.';
    } else if (fieldValues.body.trim().length < 20) {
      newErrors.body = `Body must be at least 20 characters (currently ${fieldValues.body.trim().length}).`;
    } else if (fieldValues.body.length > 1000) {
      newErrors.body = `Body must not exceed 1000 characters (currently ${fieldValues.body.length}).`;
    }

    // Author validation
    if (!fieldValues.userId) {
      newErrors.userId = 'Please select an author for the post.';
    }

    return newErrors;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, body: true, userId: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await createPost({
        title: title.trim(),
        body: body.trim(),
        userId: Number(userId),
      });

      setCreatedPost(response);
      setCreatedPostsHistory((prev) => [response, ...prev]);

      // Reset form fields
      setTitle('');
      setBody('');
      setTouched({});
      setErrors({});
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to submit post to the REST API. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAuthor = users.find((u) => u.id === Number(userId));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          REST API Submission
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Publish a New Post
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Submit article data via an HTTP POST request to JSONPlaceholder. Experience real-time client-side validation, accessible error feedback, and optimistic success reconciliation.
        </p>
      </div>

      {/* Persistence Note Banner */}
      <div
        role="note"
        aria-label="Demo API notice"
        className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-amber-900 text-xs sm:text-sm"
      >
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">
            Note on JSONPlaceholder REST Mocking
          </p>
          <p className="text-amber-800 leading-relaxed">
            JSONPlaceholder simulates successful HTTP POST mutations and returns a mock entity with an assigned ID (e.g. #101). Because it is a public testing service, the newly created post is not permanently persisted on their remote database upon page refresh.
          </p>
        </div>
      </div>

      {/* Success Confirmation Card */}
      {createdPost && (
        <section
          role="status"
          aria-live="polite"
          className="bg-emerald-50/90 border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-emerald-950">
                  Post Successfully Published!
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Assigned ID #{createdPost.id}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800">
                HTTP 201 Created confirmation received from REST API at {new Date(createdPost.createdAt || '').toLocaleTimeString()}.
              </p>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-4 border border-emerald-200/80 space-y-2 text-xs sm:text-sm">
            <p className="font-bold text-slate-900 capitalize">
              Title: {createdPost.title}
            </p>
            <p className="text-slate-700 capitalize">
              {createdPost.body}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 border-t border-emerald-100">
              <span>Author ID: #{createdPost.userId}</span>
              <span>•</span>
              <span>Status: Successfully Mocked</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCreatedPost(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors min-h-[40px]"
            >
              <PenSquare className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Publish Another Post</span>
            </button>
            <Link
              to="/posts"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-emerald-100/50 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-colors min-h-[40px]"
            >
              <span>Browse All Posts</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}

      {/* Main Creation Form */}
      <section
        aria-labelledby="form-heading"
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6"
      >
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <PenSquare className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <h2 id="form-heading" className="text-xl font-bold text-slate-900">
            Article Details & Author Configuration
          </h2>
        </div>

        {/* Global Error Banner */}
        {submitError && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-red-800 text-xs sm:text-sm"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-semibold">Submission Failed</p>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Field: Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor={titleId}
                className="block text-sm font-bold text-slate-800"
              >
                Post Title <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {title.length}/100 chars (min 5)
              </span>
            </div>

            <input
              id={titleId}
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (touched.title) {
                  setErrors(validate({ title: e.target.value, body, userId }));
                }
              }}
              onBlur={() => handleBlur('title')}
              placeholder="e.g. Modern Web Architecture with React and TypeScript"
              aria-required="true"
              aria-invalid={touched.title && !!errors.title}
              aria-describedby={errors.title && touched.title ? `${titleId}-error` : `${titleId}-hint`}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border text-slate-900 text-sm placeholder:text-slate-400 transition-all outline-none min-h-[44px] ${
                touched.title && errors.title
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />

            <div className="flex items-center justify-between text-xs">
              {touched.title && errors.title ? (
                <p id={`${titleId}-error`} role="alert" className="text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{errors.title}</span>
                </p>
              ) : (
                <p id={`${titleId}-hint`} className="text-slate-500">
                  Provide a concise, descriptive title between 5 and 100 characters.
                </p>
              )}
            </div>
          </div>

          {/* Field: Author Selection */}
          <div className="space-y-2">
            <label
              htmlFor={authorId}
              className="block text-sm font-bold text-slate-800"
            >
              Select Author <span className="text-red-500" aria-hidden="true">*</span>
            </label>

            <select
              id={authorId}
              name="userId"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                if (touched.userId) {
                  setErrors(validate({ title, body, userId: e.target.value }));
                }
              }}
              onBlur={() => handleBlur('userId')}
              aria-required="true"
              aria-invalid={touched.userId && !!errors.userId}
              aria-describedby={errors.userId && touched.userId ? `${authorId}-error` : `${authorId}-hint`}
              disabled={isSubmitting || isLoadingUsers}
              className={`w-full px-4 py-3 rounded-xl border text-slate-900 text-sm font-medium transition-all outline-none min-h-[44px] ${
                touched.userId && errors.userId
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            >
              {isLoadingUsers ? (
                <option value="">Loading registered authors...</option>
              ) : (
                users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} (@{u.username} • {u.company.name})
                  </option>
                ))
              )}
            </select>

            <div className="text-xs">
              {touched.userId && errors.userId ? (
                <p id={`${authorId}-error`} role="alert" className="text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{errors.userId}</span>
                </p>
              ) : (
                <p id={`${authorId}-hint`} className="text-slate-500">
                  Assign this post to one of the verified author profiles in the system.
                </p>
              )}
            </div>
          </div>

          {/* Field: Body */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor={bodyId}
                className="block text-sm font-bold text-slate-800"
              >
                Post Body / Content <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {body.length}/1000 chars (min 20)
              </span>
            </div>

            <textarea
              id={bodyId}
              name="body"
              rows={6}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                if (touched.body) {
                  setErrors(validate({ title, body: e.target.value, userId }));
                }
              }}
              onBlur={() => handleBlur('body')}
              placeholder="Write the full content of your article here. Elaborate with insights, context, and takeaways (minimum 20 characters)..."
              aria-required="true"
              aria-invalid={touched.body && !!errors.body}
              aria-describedby={errors.body && touched.body ? `${bodyId}-error` : `${bodyId}-hint`}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border text-slate-900 text-sm placeholder:text-slate-400 transition-all outline-none ${
                touched.body && errors.body
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />

            <div className="flex items-center justify-between text-xs">
              {touched.body && errors.body ? (
                <p id={`${bodyId}-error`} role="alert" className="text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{errors.body}</span>
                </p>
              ) : (
                <p id={`${bodyId}-hint`} className="text-slate-500">
                  Write at least 20 characters. Express your ideas clearly.
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              {selectedAuthor && (
                <span>Posting as: <strong className="text-slate-800">{selectedAuthor.name}</strong></span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="reset"
                onClick={() => {
                  setTitle('');
                  setBody('');
                  setTouched({});
                  setErrors({});
                  setSubmitError(null);
                }}
                disabled={isSubmitting || (!title && !body)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-40 min-h-[44px]"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 min-h-[44px]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Creating post...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Publish Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Session Submission History */}
      {createdPostsHistory.length > 0 && (
        <section
          aria-labelledby="session-history-heading"
          className="space-y-4 pt-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" aria-hidden="true" />
              <h2
                id="session-history-heading"
                className="text-lg font-bold text-slate-900"
              >
                Session Created Posts ({createdPostsHistory.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">In-memory session log</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {createdPostsHistory.map((post, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    Mock Post #{post.id}
                  </span>
                  <span className="text-slate-400">
                    {new Date(post.createdAt || '').toLocaleTimeString()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 capitalize truncate">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
