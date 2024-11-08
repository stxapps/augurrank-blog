import Link from 'next/link';
import Image from 'next-image-export-optimizer';
import clsx from 'clsx';

import { isString } from '@/utils';

function A(props) {
  const extProps = {};
  if (isString(props.href) && props.href.toLowerCase().startsWith('http')) {
    extProps.target = '_blank';
    extProps.rel = 'noreferrer';
  }

  return <Link {...props} {...extProps} />;
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 7.75h1.5v3.5" />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  );
}

function Note({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-green-500/20 bg-green-50/50 p-4 leading-6 text-green-900 dark:border-green-500/30 dark:bg-green-500/5 dark:text-green-200 dark:[--tw-prose-links-hover:theme(colors.green.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 size-4 flex-none fill-green-500 stroke-white dark:fill-green-200/20 dark:stroke-green-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

function Row({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  );
}

function Col({ children, sticky = false }) {
  return (
    <div className={clsx(
      '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
      sticky && 'xl:sticky xl:top-24',
    )}>
      {children}
    </div>
  );
}

function Properties({ children }) {
  return (
    <div className="my-6">
      <ul role="list" className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-slate-900/5 p-0 dark:divide-white/5">
        {children}
      </ul>
    </div>
  );
}

function Property({ name, children, type }) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (<>
          <dt className="sr-only">Type</dt>
          <dd className="font-mono text-xs text-slate-400 dark:text-slate-500">
            {type}
          </dd>
        </>)}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  );
}

const moreComponents = {
  a: A, Image, Note, Row, Col, Properties, Property,
};

export function useMDXComponents(components) {
  return { ...components, ...moreComponents };
}
