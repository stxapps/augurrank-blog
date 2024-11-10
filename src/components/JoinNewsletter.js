'use client';
import { useState } from 'react';

import { ADD_NEWSLETTER_EMAIL_URL, VALID } from '@/types/const';

const STATUS_INIT = 'STATUS_INIT';
const STATUS_JOINING = 'STATUS_JOINING';
const STATUS_INVALID = 'STATUS_INVALID';
const STATUS_COMMIT = 'STATUS_COMMIT';
const STATUS_ROLLBACK = 'STATUS_ROLLBACK';

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getMsg(status) {
  if (status === STATUS_JOINING) return 'Joining...';
  if (status === STATUS_INVALID) return 'Invalid email format. Please try again.';
  if (status === STATUS_COMMIT) return 'Thank you for joining. We\'ll deliver valuable updates to your inbox.';
  if (status === STATUS_ROLLBACK) return 'Please wait a bit and try again. If the issue persists, please get in touch with us.';
  return '';
}

export function JoinNewsletter() {

  const [state, setState] = useState({ status: STATUS_INIT, email: '', extraMsg: '' });

  const onEmailInputChange = async (e) => {
    setState({ status: STATUS_INIT, email: e.target.value, extraMsg: '' });
  };

  const onJoinBtnClick = async () => {
    if (!validateEmail(state.email)) {
      setState(state => ({ ...state, status: STATUS_INVALID, extraMsg: '' }));
      return;
    }

    setState(state => ({ ...state, status: STATUS_JOINING, extraMsg: '' }));
    try {
      const res = await fetch(ADD_NEWSLETTER_EMAIL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'strict-origin',
        body: JSON.stringify({ email: state.email }),
      });
      if (!res.ok) {
        const extraMsg = res.statusText;
        setState(state => ({ ...state, status: STATUS_ROLLBACK, extraMsg }));
        return;
      }

      const json = await res.json();
      if (json.status !== VALID) {
        const extraMsg = 'Invalid reqBody or email';
        setState(state => ({ ...state, status: STATUS_ROLLBACK, extraMsg }));
        return;
      }

      setState(state => ({ ...state, status: STATUS_COMMIT, extraMsg: '' }));
    } catch (error) {
      const extraMsg = error.message;
      setState(state => ({ ...state, status: STATUS_ROLLBACK, extraMsg }));
    }
  };

  return (
    <header className="px-4 pt-20 sm:px-6 sm:text-center lg:px-8 xl:px-12">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">Latest Updates</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">Stay informed with all the latest AugurRank news straight from the team.</p>
      <section className="mt-3 max-w-sm sm:mx-auto sm:px-4">
        <h2 className="sr-only">Sign up for our newsletter</h2>
        <div className="-mx-2 flex flex-wrap">
          <div className="mt-3 grow-[9999] basis-64 px-2">
            <div className="group relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 h-full w-6 text-slate-400 group-focus-within:text-orange-500 dark:group-focus-within:text-slate-400">
                <path d="M5 7.92C5 6.86 5.865 6 6.931 6h10.138C18.135 6 19 6.86 19 7.92v8.16c0 1.06-.865 1.92-1.931 1.92H6.931A1.926 1.926 0 0 1 5 16.08V7.92Z"></path>
                <path d="m6 7 6 5 6-5"></path>
              </svg>
              <input className="block w-full appearance-none rounded-full border border-transparent bg-white py-2 pl-12 pr-3 leading-5 text-slate-900 shadow ring-1 ring-slate-900/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm dark:bg-slate-700/20 dark:text-white dark:ring-slate-200/20 dark:focus:ring-orange-500" onChange={onEmailInputChange} type="email" autoComplete="email" placeholder="Email address" value={state.email} autoCapitalize="none" disabled={[STATUS_JOINING, STATUS_COMMIT].includes(state.status)} />
            </div>
          </div>
          <div className="mt-3 flex grow px-2">
            <button className="flex-auto rounded-full border-y border-transparent bg-orange-500 px-3.5 py-2 text-sm font-semibold text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 disabled:opacity-75 disabled:hover:bg-orange-500 dark:hover:bg-orange-400 dark:focus:ring-orange-700 dark:focus:ring-offset-slate-900 disabled:dark:hover:bg-orange-500" onClick={onJoinBtnClick} disabled={![STATUS_INIT, STATUS_INVALID, STATUS_ROLLBACK].includes(state.status)}>Join</button>
          </div>
        </div>
        <div className="min-h-20 py-3 text-left text-[0.9375rem]">
          {[STATUS_INVALID, STATUS_ROLLBACK].includes(state.status) && <p className="text-red-500">{getMsg(state.status)}</p>}
          {([STATUS_ROLLBACK].includes(state.status) && state.extraMsg) && <p className="text-red-500">{state.extraMsg}</p>}
          {[STATUS_JOINING].includes(state.status) && <div className="flex">
            <div className="ball-clip-rotate">
              <div />
            </div>
            <p className="ml-2 text-slate-600 dark:text-slate-300">{getMsg(state.status)}</p>
          </div>}
          {[STATUS_COMMIT].includes(state.status) && <p className="text-green-500">{getMsg(state.status)}</p>}
        </div>
      </section>
    </header>
  );
}
