'use client';

import { motion } from 'framer-motion';
import { ChartColumn, Sprout } from 'lucide-react';
import type { WhySectionData } from '../../types';

function PointIcon({ name }: { name: string }) {
  const props = { className: 'h-7 w-7', strokeWidth: 1.7 };
  if (name === 'chart') return <ChartColumn {...props} />;
  return <Sprout {...props} />;
}

export default function Why({ data }: { data: WhySectionData }) {
  return (
    <section id={data.id} className="bg-[#f7f6f1] py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[440px]">
          <motion.img
            src={data.side_image}
            alt={data.side_alt}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute left-0 top-0 h-[58%] w-[46%] object-cover shadow-md"
          />
          <motion.img
            src={data.image}
            alt={data.image_alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="absolute bottom-0 right-0 h-[78%] w-[68%] object-cover shadow-lg"
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[#3c8f32]">
            {data.eyebrow}
            <span className="h-[2px] w-12 bg-[#3c8f32]" />
          </div>
          <h2 className="mt-3 max-w-md text-3xl font-medium leading-[1.2] text-[#1a241c] sm:text-4xl">
            {data.title}{' '}
            <span className="font-serif italic text-[#3c8f32]">{data.title_accent}</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#5c6b62] sm:text-[15px]">{data.lead}</p>
          <ul className="mt-8 space-y-6">
            {data.points.map((point, index) => (
              <motion.li
                key={point.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-4"
              >
                <span className="text-[#3c8f32]">
                  <PointIcon name={point.icon} />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-[#1a241c]">{point.title}</span>
                  <span className="mt-1 block text-sm text-[#5c6b62]">{point.text}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
