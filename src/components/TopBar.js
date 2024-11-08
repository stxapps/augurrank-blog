import Link from 'next/link';
import Image from 'next-image-export-optimizer';

import { ThemeSelector } from '@/components/ThemeSelector';
import Logo from '@/images/logo.svg';

export function TopBar() {

  return (
    <div className="sticky top-0 z-50 flex h-14 flex-none flex-wrap items-center justify-between bg-white dark:bg-slate-900">
      <div className="relative flex grow basis-0 items-center lg:pl-8 xl:pl-12">
        <Link className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" href="https://justnote.cc" aria-label="Justnote" target="_blank" rel="noreferrer">
          <Image className="block h-8 w-auto lg:hidden dark:hidden dark:lg:hidden" src={Logo} alt="AugurRank logo" />
        </Link>
      </div>
      <div className="relative mr-4 flex basis-0 justify-end sm:mr-6 md:grow lg:mr-8 xl:mr-12">
        <ThemeSelector className="relative z-10" />
      </div>
    </div>
  );
}
