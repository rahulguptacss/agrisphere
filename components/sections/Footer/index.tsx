'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import type { FooterData } from '../../types';

const socialPaths: Record<string, string> = {
  Facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  X: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.726-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  LinkedIn: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z',
  Instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  YouTube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.929.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d={socialPaths[name] ?? socialPaths.Facebook} />
    </svg>
  );
}

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function Footer({ data }: { data: FooterData }) {
  return (
    <footer className="bg-[#123c28] text-white">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-2 pt-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-0">
          <motion.div custom={0} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col justify-between lg:pr-10">
            <a href="#home" className="inline-flex w-fit items-center">
              <img src={data.logo} alt={data.logo_text} className="h-24 w-auto sm:h-28" />
            </a>
            <div className="mt-8 flex gap-3">
              {data.socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  whileHover={{ y: -3 }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/70 text-white"
                >
                  <SocialIcon name={social.name} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="border-white/25 lg:border-l lg:pl-10">
            <motion.div custom={1} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="max-w-md text-lg font-medium leading-snug sm:text-xl">
                {data.help_title}{' '}
                <a href={`mailto:${data.help_email}`} className="font-semibold text-[#c6f35c]">{data.help_email}</a>{' '}
                {data.help_note}
              </p>
              <motion.a
                href={data.button_href}
                whileHover={{ y: -2 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#c6f35c] px-5 py-2.5 text-sm font-semibold text-[#123c28]"
              >
                {data.button_text}
                <span aria-hidden>↗</span>
              </motion.a>
            </motion.div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-6">
              <motion.div custom={2} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} className="sm:border-r sm:border-white/25 sm:pr-6">
                <h3 className="text-lg font-bold">{data.menu_title}</h3>
                <span className="mt-1 block h-1 w-10 rounded-full bg-[#c6f35c]" />
                <ul className="mt-3 space-y-1 text-[15px]">
                  {data.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="inline-flex items-center gap-2 hover:text-[#c6f35c]">
                        <span className="text-xs">›</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div custom={3} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} className="sm:pl-2">
                <h3 className="text-lg font-bold">{data.contact_title}</h3>
                <span className="mt-1 block h-1 w-10 rounded-full bg-[#c6f35c]" />
                <ul className="mt-4 space-y-4 text-[15px]">
                  <li className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#c6f35c] text-[#123c28]">
                      <MapPin className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                    <span className="max-w-[180px] leading-snug">{data.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#c6f35c] text-[#123c28]">
                      <Phone className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                    <a href={data.phone_href}>{data.phone}</a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
      <p
        className="pointer-events-none select-none px-4 py-1 text-center text-[14vw] leading-none tracking-tight sm:text-[88px] lg:text-[120px]"
        style={{ fontFamily: "var(--font-sora), 'Sora', sans-serif", fontWeight: 300, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
      >
        {data.watermark}
      </p>
      <div className="bg-white px-4 py-3 text-sm text-[#16351c] sm:px-8">
        <p className="mx-auto max-w-6xl">{data.copyright}</p>
      </div>
    </footer>
  );
}
