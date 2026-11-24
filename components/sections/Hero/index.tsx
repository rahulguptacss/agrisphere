'use client';

import { motion } from 'framer-motion';
import { ChartColumn, Cog, Leaf, Sprout } from 'lucide-react';
import type { HeroSectionData } from '../../types';

function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  if (name === 'gear') return <Cog className={className} strokeWidth={2.2} />;
  if (name === 'sprout') return <Sprout className={className} strokeWidth={2.2} />;
  if (name === 'chart') return <ChartColumn className={className} strokeWidth={2.2} />;
  return <Leaf className={className} strokeWidth={2.2} />;
}

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }),
};

export default function Hero({ data }: { data: HeroSectionData }) {
  const [left, middle, right] = data.cards;

  return (
    <section id={data.id} className="overflow-hidden bg-[linear-gradient(180deg,#f4fbf2_0%,#f7fbf6_55%,#ffffff_100%)]">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pb-14 lg:pt-12">
        <div>
          <motion.div
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex items-center gap-4"
          >
            <p className="text-[12px] font-semibold tracking-[0.14em] text-[#8b948c] sm:text-[13px]">{data.eyebrow}</p>
            <span className="h-[3px] w-14 rounded-full bg-[#3c9a34] sm:w-20" />
          </motion.div>
          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-5 max-w-xl text-[40px] font-extrabold leading-[1.05] tracking-tight text-[#16351c] sm:text-[52px]"
          >
            {data.title}
            <span className="mt-1 block text-[#2f8f2a]">{data.title_accent}</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-lg text-[15px] leading-7 text-[#5e6870] sm:text-base"
          >
            {data.lead}
          </motion.p>
          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10 border-t border-[#e4e8e2] pt-6"
          >
            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-0">
              {data.features.map((item, index) => (
                <div key={item.label} className="flex items-center">
                  {index > 0 && <span className="mx-4 hidden h-9 w-px bg-[#d5ddd2] sm:mx-5 sm:block" />}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {item.icon === 'leaf' ? (
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2f8f2a] text-white sm:h-11 sm:w-11">
                        <Icon name={item.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                    ) : (
                      <span className="grid h-9 w-9 shrink-0 place-items-center text-[#2f8f2a] sm:h-11 sm:w-11">
                        <Icon name={item.icon} className="h-7 w-7 sm:h-9 sm:w-9" />
                      </span>
                    )}
                    <span className="text-[12px] font-bold leading-tight text-[#1a2e1c] sm:max-w-[92px] sm:text-[15px]">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-[540px] sm:h-[520px]">
          {middle && (
            <motion.article
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 0.2, duration: 0.5 }, y: { delay: 0.8, duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
              className="absolute left-1/2 top-[34%] z-10 w-[42%] -translate-x-1/2 rounded-[26px] bg-white p-2 shadow-[0_18px_40px_rgba(22,53,28,0.14)]"
            >
              <div className="relative overflow-hidden rounded-[18px]">
                <img src={middle.image} alt={middle.alt} className="aspect-[3/4] w-full object-cover" />
                <span className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-2xl bg-[#1b6b32] px-3 py-2.5 text-white">
                  <Icon name={middle.icon} />
                  <span className="text-[13px] font-semibold leading-tight">{middle.label}</span>
                </span>
              </div>
            </motion.article>
          )}
          {left && (
            <motion.article
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{ opacity: { duration: 0.55 }, x: { duration: 0.55 }, y: { delay: 1, duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
              className="absolute left-0 top-0 z-20 w-[48%] rounded-[26px] bg-white p-2 shadow-[0_18px_40px_rgba(22,53,28,0.16)]"
            >
              <div className="relative overflow-hidden rounded-[18px]">
                <img src={left.image} alt={left.alt} className="aspect-[4/5] w-full object-cover" />
                <span className="absolute bottom-3 left-3 flex max-w-[86%] items-center gap-2 rounded-2xl bg-[#1b6b32] px-3 py-2.5 text-white">
                  <Icon name={left.icon} />
                  <span className="text-[13px] font-semibold leading-tight">{left.label}</span>
                </span>
              </div>
            </motion.article>
          )}
          {right && (
            <motion.article
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{ opacity: { delay: 0.15, duration: 0.55 }, x: { delay: 0.15, duration: 0.55 }, y: { delay: 1.2, duration: 4.8, repeat: Infinity, ease: 'easeInOut' } }}
              className="absolute right-0 top-[2%] z-20 w-[46%] rounded-[26px] bg-white p-2 shadow-[0_18px_40px_rgba(22,53,28,0.16)]"
            >
              <div className="relative overflow-hidden rounded-[18px]">
                <img src={right.image} alt={right.alt} className="aspect-[4/5] w-full object-cover" />
                <span className="absolute bottom-3 left-3 flex max-w-[88%] items-center gap-2 rounded-2xl bg-[#1b6b32] px-3 py-2.5 text-white">
                  <Icon name={right.icon} />
                  <span className="text-[13px] font-semibold leading-tight">{right.label}</span>
                </span>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}
