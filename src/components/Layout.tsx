import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SkipToContent } from './SkipToContent';
import { RouteFocusManager } from './RouteFocusManager';

export function Layout() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 text-slate-900">
      <SkipToContent />
      <RouteFocusManager />
      <Header />
      <main id="main-content" className="flex-1 w-full focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
