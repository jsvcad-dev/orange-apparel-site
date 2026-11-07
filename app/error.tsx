'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-16 flex max-w-xl flex-col gap-4 border border-line bg-white p-8 md:p-12">
      <h2 className="font-serif text-[36px] font-medium leading-none text-forest">Something went wrong.</h2>
      <p className="text-[#3F3C37]">
        This is usually temporary. Please try again in a moment.
      </p>
      <button className="btn-primary mt-2 w-full" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
