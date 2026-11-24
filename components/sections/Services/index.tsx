'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FlaskConical, Leaf, Radar, Sprout, Tractor } from 'lucide-react';
import type { ServicesSectionData } from '../../types';

function Mark({ name }: { name: string }) {
  const props = { className: 'h-7 w-7', strokeWidth: 1.7 };
  if (name === 'flask') return <FlaskConical {...props} />;
  if (name === 'tractor') return <Tractor {...props} />;
  if (name === 'leaf') return <Leaf {...props} />;
  if (name === 'drone') return <Radar {...props} />;
  return <Sprout {...props} />;
}

export default function Services({ data }: { data: ServicesSectionData }) {
  const [index, setIndex] = useState(0);
  const [per, setPer] = useState(1);
  const canSlide = data.items.length > 4;
  const max = canSlide ? Math.max(data.items.length - per, 0) : 0;

  useEffect(() => {
    const update = () => setPer(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!canSlide) return;
    const timer = setInterval(() => setIndex((current) => (current >= max ? 0 : current + 1)), 4000);
    return () => clearInterval(timer);
  }, [max, canSlide]);

  const shift = (step: number) =>
    setIndex((current) => {
      const next = current + step;
      if (next > max) return 0;
      if (next < 0) return max;
      return next;
    });

  return (
    <section id={data.id} className="overflow-hidden bg-[#f7fbf4] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="flex items-center justify-center gap-3 text-sm font-semibold text-[#1f6b34]">
            <span className="h-[2px] w-10 bg-[#1f6b34]" />
            <Leaf className="h-4 w-4" />
            {data.eyebrow}
            <span className="h-[2px] w-10 bg-[#1f6b34]" />
          </div>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-[#16351c] sm:text-4xl">
            {data.title} <span className="text-[#1f6b34]">{data.title_accent}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#5c6b62]">{data.lead}</p>
        </motion.div>

        <div className="relative mt-10">
          {canSlide && (
            <>
              <button type="button" aria-label={data.prev_label} onClick={() => shift(-1)} className="absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-[#16351c] shadow-md">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label={data.next_label} onClick={() => shift(1)} className="absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-[#16351c] shadow-md">
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              className={`flex ${canSlide ? '' : 'flex-wrap'}`}
              animate={{ x: canSlide ? `-${(index * 100) / data.items.length}%` : '0%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: canSlide ? `${(data.items.length / per) * 100}%` : '100%' }}
            >
              {data.items.map((item) => (
                <article key={item.title} className="px-2" style={{ width: canSlide ? `${100 / data.items.length}%` : `${100 / Math.min(data.items.length, per)}%` }}>
                  {item.layout === 'text' ? (
                    <div className="flex h-[320px] flex-col justify-center rounded-[22px] bg-white px-6 shadow-[0_16px_40px_rgba(22,53,28,0.08)]">
                      <span className="text-[#1f6b34]"><Mark name={item.icon} /></span>
                      <h3 className="mt-4 max-w-[140px] text-2xl font-bold leading-tight text-[#16351c]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#5c6b62]">{item.text}</p>
                    </div>
                  ) : (
                    <div className="group relative h-[320px] overflow-hidden rounded-[22px] shadow-md">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-[#143c22]/95 px-4 py-4 text-white transition duration-300 group-hover:opacity-0">
                        <Mark name={item.icon} />
                        <h3 className="text-sm font-semibold leading-tight">{item.title}</h3>
                      </div>
                      <div className="absolute inset-0 flex translate-y-3 flex-col justify-center bg-white px-6 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-[#1f6b34]"><Mark name={item.icon} /></span>
                        <h3 className="mt-4 max-w-[160px] text-2xl font-bold leading-tight text-[#16351c]">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-[#5c6b62]">{item.text}</p>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </motion.div>
          </div>
          {canSlide && (
            <div className="mt-5 flex justify-center gap-2">
              {Array.from({ length: max + 1 }).map((_, dot) => (
                <button key={dot} type="button" aria-label={`${data.eyebrow} ${dot + 1}`} onClick={() => setIndex(dot)} className={`h-2.5 w-2.5 rounded-full ${dot === index ? 'bg-[#1f6b34]' : 'bg-[#c5d7bf]'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
