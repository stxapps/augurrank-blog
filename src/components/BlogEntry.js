import Link from 'next/link';
import clsx from 'clsx';

import { getFormattedDate } from '@/utils';

export function BlogEntry({ children, ...props }) {
  const { title, date } = props;

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="flex px-4 pb-10 pt-8 sm:px-6 lg:px-8 xl:px-12">
          <Link className="group flex text-sm font-semibold leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white" href="/">
            <svg viewBox="0 -9 3 24" className="mr-3 h-6 w-auto overflow-visible text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
              <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Go back
          </Link>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto max-w-3xl">
          <main>
            <article className="relative pt-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
              <div className="text-sm leading-6">
                <dl>
                  <dt className="sr-only">Date</dt>
                  <dd className="absolute inset-x-0 top-0 text-slate-500 dark:text-slate-400">
                    <time dateTime={date}>{getFormattedDate(date)}</time>
                  </dd>
                </dl>
              </div>
              <div className={clsx(
                'mt-5',
                'prose max-w-none text-slate-500 dark:prose-invert dark:text-slate-400',
                'prose-headings:scroll-mt-28',
                'focus:prose-a:outline-none focus-visible:prose-a:rounded focus-visible:prose-a:ring-2 focus-visible:prose-a:ring-slate-400 dark:focus-visible:prose-a:ring-slate-500',
              )}>
                {children}
              </div>
            </article>
          </main>
        </div>
      </div>
      <div className="h-40 px-4 sm:px-6 lg:px-8 xl:px-12"></div>
    </div>
  );
}
