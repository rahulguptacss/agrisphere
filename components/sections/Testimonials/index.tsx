'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { TestimonialsSectionData } from '../../types';

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const [index, setIndex] = useState(0);
  const item = data.items[index];
  const shift = (step: number) => setIndex((current) => (current + step + data.items.length) % data.items.length);

  useEffect(() => {
    const timer = setInterval(() => shift(1), 4000);
    return () => clearInterval(timer);
  }, [data.items.length]);

  return (
    <section id={data.id} className="relative overflow-hidden py-16 text-white sm:py-20">
      <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#1c2a18]/55" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.22em]">
            <span className="h-px w-12 bg-white/70 sm:w-20" />
            {data.eyebrow}
            <span className="h-px w-12 bg-white/70 sm:w-20" />
          </div>
          <h2 className="mt-4 font-serif text-4xl italic sm:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">{data.lead}</p>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <button
            type="button"
            aria-label={data.prev_label}
            onClick={() => shift(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/20 md:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={data.next_label}
            onClick={() => shift(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/20 md:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-[28px] border border-white/25 bg-[#16351c]/75 px-6 pb-8 pt-16 shadow-xl sm:px-12"
            >
              <img src={item.avatar} alt={item.name} className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover" />
              <span className="absolute left-5 top-8 font-serif text-5xl leading-none text-[#c6f35c] sm:left-8">“</span>
              <span className="absolute bottom-16 right-5 font-serif text-5xl leading-none text-[#c6f35c] sm:right-8">”</span>
              <p className="mx-auto max-w-xl font-serif text-lg italic leading-8 sm:text-xl">{item.quote}</p>
              <p className="mt-5 text-xl font-bold">{item.name}</p>
              <p className="text-sm text-[#c6f35c]">{item.role}</p>
              <p className="mt-2 flex justify-center gap-1 text-[#e2c15a]">
                {Array.from({ length: item.stars }).map((_, star) => (
                  <Star key={star} className="h-4 w-4" fill="currentColor" />
                ))}
              </p>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4 md:hidden">
          <button type="button" aria-label={data.prev_label} onClick={() => shift(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/70">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label={data.next_label} onClick={() => shift(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/70">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {data.items.map((story, dot) => (
            <button
              key={story.name}
              type="button"
              aria-label={story.name}
              onClick={() => setIndex(dot)}
              className={`h-2.5 w-2.5 rounded-full ${dot === index ? 'bg-white' : 'border border-white/80'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
