import { Link } from 'react-router-dom';
import { Mail, Building2, MapPin, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  postCount?: number;
}

export function UserCard({ user, postCount }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article
      id={`user-card-${user.id}`}
      className="group bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
    >
      <div>
        {/* User Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-2xs">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              <Link
                to={`/users/${user.id}`}
                className="focus-visible:ring-2 focus-visible:ring-indigo-500 rounded outline-none"
              >
                {user.name}
              </Link>
            </h2>
            <p className="text-xs text-slate-600 truncate">@{user.username}</p>
            {postCount !== undefined && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">
                {postCount} {postCount === 1 ? 'post' : 'posts'}
              </span>
            )}
          </div>
        </div>

        {/* User Metadata */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate" title={`Company: ${user.company.name}`}>
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
            <span className="truncate font-medium text-slate-700">{user.company.name}</span>
          </div>

          <div className="flex items-center gap-2 truncate" title={`Location: ${user.address.city}`}>
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{user.address.city}</span>
          </div>

          <div className="flex items-center gap-2 truncate" title={`Email: ${user.email}`}>
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${user.email}`}
              className="truncate hover:text-indigo-600 transition-colors focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
            >
              {user.email.toLowerCase()}
            </a>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <Link
          to={`/users/${user.id}`}
          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-semibold transition-all min-h-[38px] focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span>View Profile & Posts</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
