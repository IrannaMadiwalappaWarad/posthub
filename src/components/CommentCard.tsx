import { Mail } from 'lucide-react';
import { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const initials = comment.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article
      id={`comment-${comment.id}`}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs transition-colors hover:border-slate-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
            <h3 className="text-sm font-semibold text-slate-900 capitalize truncate">
              {comment.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <a
                href={`mailto:${comment.email}`}
                className="hover:text-indigo-600 transition-colors truncate focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
              >
                {comment.email.toLowerCase()}
              </a>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed capitalize">
            {comment.body}
          </p>
        </div>
      </div>
    </article>
  );
}
