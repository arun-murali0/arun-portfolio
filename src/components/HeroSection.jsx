import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { hero } from '../data/index.js';

const scatterPieces = [
  { className: 'scatter-piece scatter-piece--dot-one', duration: 4.8, delay: 0.1, y: -7 },
  { className: 'scatter-piece scatter-piece--dot-two', duration: 5.6, delay: 0.5, y: 8 },
  { className: 'scatter-piece scatter-piece--ring', duration: 6.2, delay: 0.2, y: -9 },
  { className: 'scatter-piece scatter-piece--plus', duration: 5.2, delay: 0.8, y: 6 },
  { className: 'scatter-piece scatter-piece--dot-three', duration: 4.4, delay: 0.3, y: -5 },
  { className: 'scatter-piece scatter-piece--cross', duration: 6.4, delay: 0.6, y: 7 },
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-stone-200">
      <div aria-hidden="true" className="editorial-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="scatter-field">
        {scatterPieces.map((piece) => (
          <motion.span
            className={piece.className}
            key={piece.className}
            animate={shouldReduceMotion ? { opacity: 0.45 } : { opacity: [0.25, 0.72, 0.4], y: [0, piece.y, 0], rotate: [0, 7, 0] }}
            transition={{ duration: piece.duration, delay: piece.delay, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: 'easeOut' }}
      >
        <p className="mb-7 flex flex-wrap items-center gap-3 text-sm font-medium text-stone-600">
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-700" />
          {hero.eyebrow.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && <span aria-hidden="true" className="text-stone-300">/</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </p>

        <h1 className="max-w-4xl font-serif text-5xl font-medium leading-tight tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
          {hero.headline.before}<span className="editorial-highlight">{hero.headline.highlight}</span>{hero.headline.after}
        </h1>

        <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-12">
          <p className="text-lg leading-8 text-stone-700 md:col-span-2">
            {hero.intro.before}<strong className="font-semibold text-stone-950">{hero.intro.strong}</strong>{hero.intro.after}
          </p>
          <aside className="border-l border-stone-300 pl-5 text-sm leading-7 text-stone-600">
            <p className="mb-2 font-semibold uppercase tracking-widest text-stone-900">{hero.aside.label}</p>
            <p>{hero.aside.text}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-stone-100 px-2 py-1 font-medium text-stone-800">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-orange-700" />
              {hero.aside.badge}
            </p>
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
          <a className="editorial-primary-link" href={hero.primaryCta.href}>{hero.primaryCta.label} <span aria-hidden="true">↓</span></a>
          <a className="editorial-secondary-link" href={hero.secondaryCta.href} target="_blank" rel="noreferrer">
            {hero.secondaryCta.label} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
