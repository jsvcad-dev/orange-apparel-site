'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function NotifyForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Something went wrong. Please try again.');
      setStatus('done');
      setMessage("You're on the list. We'll be in touch.");
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className="mt-10 font-serif text-[24px] italic text-citrus-light md:text-[28px]">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 w-full max-w-md text-left" noValidate>
      <label htmlFor="notify-email" className="label-caps text-[11px] text-cream/60">
        Email address
      </label>
      <div className="mt-2 flex items-stretch border-b border-cream/70 focus-within:border-cream">
        <input
          id="notify-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-3 text-[17px] text-cream placeholder:text-cream/35 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="label-caps min-h-[44px] shrink-0 pl-4 text-cream transition-colors hover:text-citrus-light disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Notify me'}
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-[20px] text-[14px] text-citrus-light">
        {status === 'error' ? message : ''}
      </p>
    </form>
  );
}
