'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import type { AboutSectionData } from '../../types';

function Badge({ label }: { label: string }) {
  const ring = `${label} • ${label} • ${label} • ${label} • `;
  return (
    <div className="relative grid h-28 w-28 place-items-center rounded-full bg-white shadow-lg">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin" style={{ animationDuration: '12s' }}>
        <defs>
          <path id="about-ring" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
        </defs>
        <text fill="#1f6b34" fontSize="11" fontWeight="700" letterSpacing="1.5">
          <textPath href="#about-ring">{ring}</textPath>
        </text>
      </svg>
      <Leaf className="h-7 w-7 text-[#2f8f2a]" />
    </div>
  );
}

export default function About({ data }: { data: AboutSectionData }) {
  return (
    <section id={data.id} className="bg-[#f6f4ee] py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-[#1f6b34]">
            {data.eyebrow}
            <span className="h-[2px] w-12 bg-[#1f6b34]" />
          </div>
          <h2 className="mt-4 max-w-md text-4xl font-semibold leading-[1.1] text-[#1a241c] sm:text-5xl">
            {data.title}{' '}
            <span className="font-serif italic text-[#3c8f32]">{data.title_accent}</span>
          </h2>
          <div className="relative mt-8 max-w-sm">
            <motion.img
              src={data.image}
              alt={data.image_alt}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-80 w-full object-cover object-top sm:h-[420px]"
            />
            <div className="absolute -bottom-6 -left-2 sm:bottom-4 sm:left-[-18px]">
              <Badge label={data.badge_label} />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <img src={data.field_image} alt={data.field_alt} className="h-64 w-full object-cover sm:h-80" />
          <span className="mt-6 block h-[2px] w-10 bg-[#1f6b34]" />
          <p className="mt-4 max-w-md text-sm font-medium leading-7 text-[#1a241c] sm:text-[15px]">{data.text}</p>
        </motion.div>
      </div>
    </section>
  );
}
