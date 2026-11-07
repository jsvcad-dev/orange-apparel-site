import clsx from 'clsx';

export default function OpenCart({ className, quantity }: { className?: string; quantity?: number }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-forest-hover">
      <svg
        aria-hidden="true"
        className={clsx('h-5 w-5', className)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 8h14l-1 13H6L5 8z" />
        <path d="M9 8V6a3 3 0 016 0v2" />
      </svg>
      {quantity ? (
        <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-forest px-1 text-[11px] font-semibold text-cream">
          {quantity}
        </span>
      ) : null}
    </div>
  );
}
