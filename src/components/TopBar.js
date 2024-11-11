import Link from 'next/link';
import Image from 'next-image-export-optimizer';

import { ThemeSelector } from '@/components/ThemeSelector';
import Logo from '@/images/logo-main.svg';

export function TopBar() {

  return (
    <div className="supports-backdrop-blur:bg-white/60 sticky top-0 z-50 mx-auto w-full max-w-6xl flex-none bg-white/95 px-4 backdrop-blur transition-colors duration-500 sm:px-6 lg:px-8 xl:px-12 dark:bg-transparent">
      <div className="flex h-[3.75rem] items-center justify-between border-b border-slate-900/10 dark:border-slate-50/[0.06]">
        <div className="relative flex grow basis-0 items-center">
          <Link className="flex items-center" href="https://augurrank.com" aria-label="AugurRank" target="_blank" rel="noreferrer">
            <Image className="h-8 w-auto" src={Logo} alt="AugurRank logo" placeholder="empty" />
            <span className="ml-1 hidden text-xl font-medium text-slate-800 sm:inline dark:text-slate-100">AugurRank</span>
          </Link>
        </div>
        <div className="relative flex basis-0 justify-end md:grow">
          <ThemeSelector className="relative z-10 -mr-3" />
        </div>
      </div>
    </div>
  );
}
