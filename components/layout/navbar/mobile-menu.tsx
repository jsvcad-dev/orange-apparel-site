'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BRAND } from 'lib/brand';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { NavLink } from './index';

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="-ml-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 left-0 flex w-full max-w-sm flex-col bg-white px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl text-forest">{BRAND.name}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <ul className="mt-10 flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  className="block py-4 font-serif text-[28px] leading-tight text-forest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-caps mt-auto text-muted hover:text-forest"
          >
            Instagram
          </a>
        </DialogPanel>
      </Dialog>
    </>
  );
}
