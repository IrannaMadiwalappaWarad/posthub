import { Link } from 'react-router-dom';
import { ArrowRight, User as UserIcon } from 'lucide-react';
import { Post, User } from '../types';

interface PostCardProps {
  post: Post;
  author?: User;
}

const CATEGORIES = [
  { label: 'Technology', bg: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { label: 'Engineering', bg: 'bg-blue-50 text-blue-700 border-blue-100' },
  { label: 'Architecture', bg: 'bg-purple-50 text-purple-700 border-purple-100' },
  { label: 'Design', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { label: 'Performance', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
  { label: 'Security', bg: 'bg-rose-50 text-rose-700 border-rose-100' },
];

export function PostCard({ post, author }: PostCardProps) {
  // Estimate read time (words / 200 wpm)
  const wordCount = (post.title + ' ' + post.body).split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 40));

  // Consistent category based on ID
  const category = CATEGORIES[post.id % CATEGORIES.length];

  // Author initials
  const initials = author
    ? author.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : `U${post.userId}`;

  return (
    <article
      id={`post-card-${post.id}`}
      className="group bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
    >
      <div className="space-y-2.5">
        {/* Header metadata */}
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${category.bg}`}>
              {category.label}
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Post #{post.id}
            </span>
          </div>
          <span className="text-slate-600 font-medium text-[11px]">
            {readTime} min read
          </span>
        </div>

        {/* Post Title */}
        <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 capitalize leading-snug">
          <Link
            to={`/posts/${post.id}`}
            className="focus-visible:ring-2 focus-visible:ring-indigo-500 rounded outline-none"
          >
            {post.title}
          </Link>
        </h2>

        {/* Post Body preview */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {post.body}
        </p>
      </div>

      {/* Footer / Author section */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        {author ? (
          <Link
            to={`/users/${author.id}`}
            className="flex items-center gap-2 group/author focus-visible:ring-2 focus-visible:ring-indigo-500 rounded p-0.5"
            title={`View profile of ${author.name}`}
          >
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
              {initials}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 group-hover/author:text-indigo-600 transition-colors truncate max-w-[120px] sm:max-w-[140px]">
                {author.name}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <UserIcon className="w-3 h-3" aria-hidden="true" />
            </div>
            <span className="text-xs">User #{post.userId}</span>
          </div>
        )}

        <Link
          to={`/posts/${post.id}`}
          aria-label={`Read full post: ${post.title}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors p-1 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
