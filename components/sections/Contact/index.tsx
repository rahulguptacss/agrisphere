'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send, Tag, User } from 'lucide-react';
import type { ContactSectionData } from '../../types';

const field = 'flex h-12 items-center gap-2 rounded-lg border border-[#d5e0d4] bg-white px-3 text-sm text-[#16351c] outline-none focus-within:border-[#1f6b34]';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState('');

  return (
    <section id={data.id} className="relative overflow-hidden bg-[#f3faf1] py-14 sm:py-16">
      <p className="pointer-events-none absolute left-4 top-6 z-0 select-none text-[72px] font-extrabold leading-none text-[#16351c]/[0.06] sm:left-10 sm:text-[120px] lg:text-[160px]">
        {data.watermark}
      </p>
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-[#1f6b34]">{data.eyebrow}</p>
            <span className="h-[3px] w-14 rounded-full bg-[#1f6b34]" />
          </div>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#16351c] sm:text-5xl">
            {data.title} <span className="text-[#2f8f2a]">{data.title_accent}</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#5c6b62]">{data.lead}</p>
          <form
            className="mt-6 grid gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
              event.currentTarget.reset();
              setPhone('');
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={field}>
                <User className="h-4 w-4 shrink-0 text-[#8aa08c]" />
                <input required placeholder={`${data.name_placeholder} ${data.required_mark}`} className="w-full bg-transparent outline-none placeholder:text-[#8aa08c]" />
              </label>
              <label className={field}>
                <Phone className="h-4 w-4 shrink-0 text-[#8aa08c]" />
                <input
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value.replace(/\D/g, ''));
                    setSent(false);
                  }}
                  placeholder={`${data.phone_placeholder} ${data.required_mark}`}
                  className="w-full bg-transparent outline-none placeholder:text-[#8aa08c]"
                />
              </label>
              <label className={field}>
                <Mail className="h-4 w-4 shrink-0 text-[#8aa08c]" />
                <input required type="email" placeholder={`${data.email_placeholder} ${data.required_mark}`} className="w-full bg-transparent outline-none placeholder:text-[#8aa08c]" />
              </label>
              <label className={field}>
                <Tag className="h-4 w-4 shrink-0 text-[#8aa08c]" />
                <input placeholder={data.subject_placeholder} className="w-full bg-transparent outline-none placeholder:text-[#8aa08c]" />
              </label>
            </div>
            <label className="flex items-start gap-2 rounded-lg border border-[#d5e0d4] bg-white px-3 py-3 text-sm">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#8aa08c]" />
              <textarea required rows={4} placeholder={`${data.message_placeholder} ${data.required_mark}`} className="w-full resize-none bg-transparent outline-none placeholder:text-[#8aa08c]" />
            </label>
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              className="mt-2 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#1b4d28] px-5 text-sm font-semibold text-white"
            >
              {data.button_text}
              <Send className="h-4 w-4" />
            </motion.button>
            {sent && <p className="rounded-lg bg-[#e7f6df] px-4 py-3 text-sm font-medium text-[#1f6b34]">{data.success_message}</p>}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px]"
        >
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute right-0 top-6 z-10 w-[54%] overflow-hidden rounded-[26px] border-[7px] border-white shadow-[0_16px_40px_rgba(22,53,28,0.12)]"
          >
            <img src={data.side_image} alt={data.side_alt} className="aspect-[3/4] w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute left-3 top-4 z-20 w-[54%] overflow-hidden rounded-[26px] border-[7px] border-white shadow-[0_16px_40px_rgba(22,53,28,0.16)]"
          >
            <img src={data.image} alt={data.image_alt} className="aspect-[3/4] w-full object-cover object-[center_20%]" />
          </motion.div>
          <span className="absolute bottom-[18%] left-1/2 z-30 grid h-[72px] w-[72px] -translate-x-1/2 place-items-center rounded-[18px] bg-white text-[#2f8f2a] shadow-lg">
            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor" aria-hidden>
              <path d="M12 21c-.2-5 2.4-8.4 7.2-9.6C18.4 16.2 15.2 19.2 12 21Z" />
              <path d="M11.6 20.6C11 15 7.4 11.4 3.6 10.6c1 5.6 4.8 8.8 8 10Z" />
              <path d="M11.2 21V11.2h1.4V21h-1.4Z" />
            </svg>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
