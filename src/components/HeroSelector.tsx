'use client';

import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { heroOptions } from '@/content/hero';
import { photoAlt } from '@/content/photos';
import { site } from '@/content/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { srcSetFor } from './Photo';

const sizes = '(min-width: 1024px) 520px, 90vw';

export function HeroSelector() {
  const [activeId, setActiveId] = useState(heroOptions[0]!.id);
  const active = heroOptions.find((o) => o.id === activeId) ?? heroOptions[0]!;

  // Warm the other photos once the page is idle, so switching feels instant.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const option of heroOptions.slice(1)) {
        const img = new Image();
        img.sizes = sizes;
        img.srcset = srcSetFor(option.photo);
      }
    }, 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute -top-40 -right-40 size-[38rem] rounded-full bg-leaf-100/70 blur-3xl" />
          <div aria-hidden="true" className="absolute top-60 -left-52 size-[30rem] rounded-full bg-navy-100/80 blur-3xl" />
          <div className="wrap relative grid items-center gap-10 pt-9 pb-12 lg:grid-cols-[1.12fr_1fr] lg:gap-12 lg:pt-11 lg:pb-14">
            <div>
              <p className="eyebrow">Insurance and investments in Jalandhar</p>
              <h1 className="mt-4 text-[clamp(2.5rem,1.9rem+2.9vw,4.25rem)] leading-[1.04]">
                Protect what you have. Grow what’s next.
              </h1>
              <p className="lede mt-4 max-w-xl">
                Insurance for your family, home and business, plus mutual funds and SIPs for your goals, explained in plain
                language by someone you can actually call.
              </p>

              <div className="mt-6">
                <p id="protect-label" className="font-display text-xl font-semibold text-navy-900">
                  What matters most to you right now?
                </p>
                <div role="group" aria-labelledby="protect-label" className="mt-3 flex flex-wrap gap-2">
                  {heroOptions.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={o.id === activeId}
                      onClick={() => setActiveId(o.id)}
                      className={`min-h-11 rounded-full border-[1.5px] px-4 py-1.5 font-semibold transition-colors ${
                        o.id === activeId
                          ? 'border-navy-900 bg-navy-900 text-white'
                          : 'border-navy-900/25 bg-white/70 text-navy-900 hover:border-navy-900'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div aria-live="polite" className="mt-5 min-h-[13rem] sm:min-h-[11.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <p className="text-xl font-semibold text-navy-900">{active.title}</p>
                    <ul className="mt-3 grid gap-1.5 text-muted">
                      {active.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-leaf-600" strokeWidth={3} />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {active.note && <p className="mt-2 text-sm font-medium text-navy-900">{active.note}</p>}
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                <a href={whatsappUrl(active.message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" data-testid="hero-whatsapp">
                  <WhatsAppIcon />
                  Ask on WhatsApp
                </a>
                <Link href={active.href} className="btn btn-outline">
                  {active.linkLabel}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto aspect-[520/590] w-full max-w-[31rem]">
              <HandsArc />
              <div className="shield-clip absolute top-[3%] left-[13%] h-[74.5%] w-[74%] bg-navy-100">
                <AnimatePresence initial={false}>
                  <m.img
                    key={active.photo}
                    src={`/images/${active.photo}-1200.webp`}
                    srcSet={srcSetFor(active.photo)}
                    sizes={sizes}
                    alt={photoAlt[active.photo]}
                    fetchPriority={active.id === heroOptions[0]!.id ? 'high' : undefined}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0 size-full object-cover"
                    style={{ objectPosition: active.position }}
                  />
                </AnimatePresence>
              </div>
              <div className="card absolute right-0 bottom-[-0.5rem] left-0 mx-auto flex w-fit max-w-full items-center gap-3 rounded-full py-2 pr-5 pl-2 shadow-lift">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display font-semibold text-white">SM</span>
                <span className="text-sm leading-snug">
                  <span className="block font-semibold text-navy-900">{site.advisor.name}</span>
                  <span className="block text-muted">Founder, Insure Secure</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </MotionConfig>
    </LazyMotion>
  );
}

/** The two cupped hands from the logo, drawn as sweeping arcs around the shield. */
function HandsArc() {
  return (
    <svg viewBox="0 0 520 590" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
      <defs>
        <linearGradient id="arc-blue" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1a5a8e" />
          <stop offset="1" stopColor="#0d3656" />
        </linearGradient>
        <linearGradient id="arc-green" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a9d95f" />
          <stop offset="1" stopColor="#48801b" />
        </linearGradient>
      </defs>
      <ellipse cx="260" cy="552" rx="120" ry="9" fill="#3fb6c8" opacity="0.35" />
      <path fill="url(#arc-blue)" d="M36 104C20 102 8 116 8 140c0 160 82 330 232 434 8 5 16-2 10-10C130 450 70 320 60 130c-1-16-10-24-24-26Z" />
      <path fill="url(#arc-green)" d="M484 104c16-2 28 12 28 36 0 160-82 330-232 434-8 5-16-2-10-10 120-114 180-244 190-434 1-16 10-24 24-26Z" />
      <path fill="#0d3656" d="M122 530c88 26 188 26 276 0-84 40-192 40-276 0Z" />
      <path fill="#48801b" d="M150 556c70 20 150 20 220 0-66 34-154 34-220 0Z" />
    </svg>
  );
}
