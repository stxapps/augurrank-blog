import Link from 'next/link';

import { getFormattedDate } from '@/utils';

export function BlogListItem(props) {
  const { blogInfo } = props;

  return (
    <article className="group relative">
      <div className="absolute -inset-x-4 -inset-y-2.5 group-hover:bg-slate-50/70 sm:rounded-2xl lg:-inset-x-5 lg:-inset-y-3.5 dark:group-hover:bg-slate-800/50"></div>
      <div className="relative">
        <h3 className="pt-8 text-base font-semibold tracking-tight text-slate-900 lg:pt-0 dark:text-slate-200">{blogInfo.title}</h3>
        <div className="prose mb-4 mt-2 line-clamp-2 text-slate-500 dark:prose-invert dark:text-slate-400">
          <p>{blogInfo.description}</p>
        </div>
        <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
          <dt className="sr-only">Date</dt>
          <dd className="whitespace-nowrap text-sm leading-6 text-slate-500 dark:text-slate-400">
            <time dateTime={blogInfo.date}>{getFormattedDate(blogInfo.date)}</time>
          </dd>
        </dl>
      </div>
      <Link className="flex items-center text-sm font-medium text-orange-500" href={blogInfo.path} prefetch={false}>
        <span className="absolute -inset-x-4 -inset-y-2.5 sm:rounded-2xl lg:-inset-x-5 lg:-inset-y-3.5"></span>
        <span className="relative">Read more</span>
        <svg className="relative ml-2.5 mt-px overflow-visible text-orange-300 dark:text-orange-700" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 0L3 3L0 6"></path>
        </svg>
      </Link>
    </article>
  );
}
