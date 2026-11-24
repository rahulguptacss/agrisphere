'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Handshake, Leaf, Plus, Shield, Sprout, Tractor } from 'lucide-react';
import type { FaqSectionData } from '../../types';

function ItemIcon({ name }: { name: string }) {
  const props = { className: 'h-5 w-5', strokeWidth: 1.8 };
  if (name === 'tractor') return <Tractor {...props} />;
  if (name === 'shield') return <Shield {...props} />;
  if (name === 'handshake') return <Handshake {...props} />;
  return <Sprout {...props} />;
}

export default function Faq({ data }: { data: FaqSectionData }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id={data.id} className="relative overflow-hidden bg-[#f7fbf4] py-14 sm:py-16">
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-[#1f6b34]">
            <span className="h-[2px] w-10 bg-[#1f6b34]" />
            {data.eyebrow}
            <span className="h-[2px] w-10 bg-[#1f6b34]" />
          </div>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#16351c] sm:text-5xl">
            {data.title}
            <span className="mt-1 block font-serif text-[1.05em] italic text-[#3c8f32]">{data.title_accent}</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#5c6b62]">{data.lead}</p>
          <div className="relative mt-8 max-w-md">
            <span className="absolute -bottom-3 -left-3 h-[86%] w-[92%] rounded-[24px] bg-[#d7efc4]" />
            <motion.img
              src={data.image}
              alt={data.image_alt}
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: -6 }}
              viewport={{ once: true }}
              className="relative h-52 w-full rounded-[22px] object-cover shadow-md sm:h-60"
            />
          </div>
        </motion.div>

        <div>
          <ul className="space-y-3">
            {data.items.map((item, index) => {
              const on = open === index;
              return (
                <motion.li
                  key={item.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="overflow-hidden rounded-[28px] bg-white shadow-[0_8px_24px_rgba(22,53,28,0.06)]"
                >
                  <button type="button" onClick={() => setOpen(on ? null : index)} className="flex w-full items-center gap-3 px-3 py-2.5 text-left sm:px-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e7f6df] text-[#1f6b34]">
                      <ItemIcon name={item.icon} />
                    </span>
                    <span className="flex-1 text-sm font-medium text-[#1d2b22] sm:text-[15px]">{item.question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1f6b34] text-white">
                      <Plus className={`h-4 w-4 transition ${on ? 'rotate-45' : ''}`} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {on && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden px-5 pb-4 text-sm leading-6 text-[#5c6b62]"
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-center justify-center gap-3 text-[#2f8f2a]">
            <span className="h-[2px] w-16 bg-[#2f8f2a]" />
            <Leaf className="h-5 w-5" />
            <span className="h-[2px] w-16 bg-[#2f8f2a]" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${data.scene})` }} />
    </section>
  );
}
