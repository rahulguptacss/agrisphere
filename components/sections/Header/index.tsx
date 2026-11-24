'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { motion } from 'framer-motion';
import type { HeaderData } from '../../types';

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <a href="#home" className="flex h-[72px] shrink-0 items-center overflow-hidden">
      <img src={src} alt={alt} className="h-16 w-auto max-h-[72px] sm:h-[72px]" />
    </a>
  );
}

export default function Header({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(data.links[0]?.href ?? '#home');
  const dragY = useRef(0);

  const onTouchStart = (event: TouchEvent) => {
    dragY.current = event.touches[0].clientY;
  };

  const onTouchMove = (event: TouchEvent) => {
    const y = event.touches[0].clientY;
    window.scrollBy(0, dragY.current - y);
    dragY.current = y;
  };

  useEffect(() => {
    const onScroll = () => {
      const line = 96;
      let current = data.links[0]?.href ?? '#home';
      [...data.links.map((link) => link.href), data.button_href].forEach((href) => {
        const section = document.getElementById(href.replace('#', ''));
        if (!section) return;
        const box = section.getBoundingClientRect();
        if (box.top <= line && box.bottom > line) current = href;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [data.links, data.button_href]);

  return (
    <motion.header
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      className="sticky top-0 z-50 border-b border-[#e7f0e4] bg-[#f6fbf4]/95"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto flex h-[78px] max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo src={data.logo} alt={data.logo_text} />
        <nav className="ml-auto hidden items-center gap-8 xl:flex">
          {data.links.map((link, index) => {
            const on = active === link.href;
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`relative py-2 text-[15px] font-medium ${on ? 'text-[#1c3b22]' : 'text-[#4d5d50] hover:text-[#1c3b22]'}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {link.name}
                {on && <motion.span layoutId="nav-line" className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-[#1c3b22]" />}
              </motion.a>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center gap-4 lg:flex xl:ml-8">
          <a href={data.phone_href} className="flex items-center gap-2 text-[15px] font-semibold text-[#1c3b22]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7f6df] text-[#3c8f32]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3.5h3l1.2 3-2 1.2a12 12 0 0 0 5.1 5.1l1.2-2 3 1.2v3A2 2 0 0 1 16.5 17 14.5 14.5 0 0 1 5 5.5 2 2 0 0 1 7 3.5z" /></svg>
            </span>
            {data.phone}
          </a>
          <motion.a
            href={data.button_href}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-3 rounded-full bg-[#1f6b34] py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-white"
          >
            {data.button_text}
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#1f6b34]">→</span>
          </motion.a>
        </div>
        <button
          type="button"
          className="relative ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#d7e6d4] bg-white xl:hidden"
          aria-label={open ? data.close_label : data.menu_label}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`block h-0.5 w-5 rounded-full bg-[#1c3b22] transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-[#1c3b22] transition ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 rounded-full bg-[#1c3b22] transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>
      {open && (
          <nav className="border-t border-[#e7f0e4] bg-white xl:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {data.links.map((link) => {
                const on = active === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => { setActive(link.href); setOpen(false); }}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium ${on ? 'bg-[#e7f6df] text-[#1f6b34]' : 'text-[#1c3b22]'}`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a href={data.phone_href} className="px-3 py-2 text-sm font-semibold text-[#1f6b34]">{data.phone}</a>
              <a href={data.button_href} onClick={() => setOpen(false)} className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-[#1f6b34] py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white">
                {data.button_text}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#1f6b34]">→</span>
              </a>
            </div>
          </nav>
      )}
    </motion.header>
  );
}
