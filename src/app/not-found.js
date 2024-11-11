import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-auto px-4 pb-20 text-center sm:px-6 lg:px-8 xl:px-12">
      <div className="h-1/3 min-h-20" />
      <p className="text-sm font-medium text-slate-900 dark:text-white">404</p>
      <h1 className="mt-3 text-3xl tracking-tight text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sorry, we couldn’t find the page you’re looking for.</p>
      <Link href="/" className="mt-8 text-sm font-medium text-slate-900 dark:text-white">Go back home</Link>
    </div>
  );
}
