import { CheckCircle2, ShieldCheck, Zap, Layers, Server, Code, Heart, BookOpen, Users, PenSquare, RefreshCw } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function About() {
  useDocumentTitle('About');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          CodingAtom Assessment Showcase
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          About PostHub & Architecture
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
          PostHub was engineered to demonstrate senior-grade frontend design patterns: strict TypeScript type-safety, accessible user flows, resilient REST API cancellation with AbortController, and responsive layout craftsmanship.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <section aria-labelledby="tech-stack-heading" className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <h2 id="tech-stack-heading" className="text-2xl font-bold text-slate-900">
            Technology Stack & Libraries
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">React 19</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700">Core</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Functional components, custom hooks, and concurrent-safe state lifecycles.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">TypeScript 5.8</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">Types</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict type interfaces, discriminated unions, and zero unvalidated <code className="font-mono text-xs text-indigo-600">any</code> types.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">React Router</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-50 text-violet-700">Routing</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Client-side navigation with route focus management and scroll restoration.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Tailwind CSS 4</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">Design</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Responsive mobile-first utility classes, high contrast palettes, and reduced-motion rules.
            </p>
          </div>
        </div>
      </section>

      {/* REST API Endpoints Map */}
      <section aria-labelledby="api-endpoints-heading" className="space-y-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <h2 id="api-endpoints-heading" className="text-2xl font-bold text-slate-900">
            Real REST API Integration (JSONPlaceholder)
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                <tr>
                  <th className="px-4 py-3">HTTP Method</th>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Application Route</th>
                  <th className="px-4 py-3">Description & Handling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">GET</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/posts</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/posts, /</td>
                  <td className="px-4 py-3">Fetches 100 sample articles. Paginated, searchable by title/body.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">GET</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/posts/:id</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/posts/:id</td>
                  <td className="px-4 py-3">Fetches single post details and calculates read time estimations.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">GET</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/posts/:id/comments</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/posts/:id</td>
                  <td className="px-4 py-3">Fetches comment threads and discussion responses.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">GET</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/users</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/users, /posts, /create</td>
                  <td className="px-4 py-3">Fetches all 10 registered authors with company and location info.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">GET</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/users/:id</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/users/:id</td>
                  <td className="px-4 py-3">Fetches single user profile and addresses.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">GET</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/posts?userId=:id</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/users/:id</td>
                  <td className="px-4 py-3">Fetches user-specific authored articles.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600">POST</td>
                  <td className="px-4 py-3 font-mono text-slate-900">/posts</td>
                  <td className="px-4 py-3 text-indigo-600 font-medium">/create</td>
                  <td className="px-4 py-3">Submits validated post payload; receives mock HTTP 201 Created entity.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pillars: Accessibility, Performance, Error Handling */}
      <section aria-labelledby="pillars-heading" className="space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <h2 id="pillars-heading" className="text-2xl font-bold text-slate-900">
            Architectural Pillars & Quality Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Accessibility */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              A11y
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              WCAG 2.1 AA Standards
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Skip-to-Content:</strong> Accessible bypass link for keyboard users.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Semantic Elements:</strong> &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, &lt;footer&gt;.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Focus Management:</strong> Automated route heading focus and live announcements.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>44px Touch Targets:</strong> Every button, nav item, and link passes touch target standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>ARIA Describedby:</strong> Form inputs bound to accessible validation error labels.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Performance */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Performance & CLS &lt; 0.1
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Zero-CLS Skeletons:</strong> Dimension-stable skeletons matching card heights precisely.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Client-Side Slicing:</strong> Smooth 9-item pagination without unnecessary refetches.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Prefers-Reduced-Motion:</strong> Respects system motion settings for zero disorientation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Optimized Asset Footprint:</strong> Zero heavy external image dependencies.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Error Handling & In-Flight Cancellation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Resilient Request Lifecycles
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>AbortController Signals:</strong> In-flight fetches are instantly aborted on route transitions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Graceful Silent Aborts:</strong> Abort errors are caught silently to prevent false error UI.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>One-Click Retries:</strong> Safe retry buttons on every error state without infinite loops.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Global ErrorBoundary:</strong> Catches unexpected rendering crashes with recovery actions.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Challenges & Lessons Learned */}
      <section aria-labelledby="lessons-heading" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 id="lessons-heading" className="text-2xl font-bold text-slate-900">
          Challenges & Key Engineering Takeaways
        </h2>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            1. <strong>Synchronizing AbortController with React 19 StrictMode:</strong> In modern React, components mount, unmount, and remount during development checks. Proper cleanup in the <code className="font-mono text-xs text-indigo-600">useEffect</code> hook required ensuring that abort signals differentiate between intentional route transitions and actual network errors.
          </p>
          <p>
            2. <strong>Accessible Form Error Announcement:</strong> Pairing real-time client validation with assistive technologies requires rigorous binding of <code className="font-mono text-xs text-indigo-600">aria-invalid</code>, <code className="font-mono text-xs text-indigo-600">aria-describedby</code>, and semantic <code className="font-mono text-xs text-indigo-600">role="alert"</code> hints so screen readers immediately inform the user of input constraints.
          </p>
          <p>
            3. <strong>Client-Side Routing & SPA Fallbacks:</strong> Ensuring deep links such as <code className="font-mono text-xs text-indigo-600">/posts/42</code> and <code className="font-mono text-xs text-indigo-600">/users/3</code> function identically upon direct URL entry or browser reload without 404 server drops.
          </p>
        </div>
      </section>
    </div>
  );
}
