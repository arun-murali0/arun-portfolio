import { motion, useReducedMotion } from 'framer-motion';
import { approach } from '../data/index.js';

export default function ApproachSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="approach" className="scroll-mt-8 border-y border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <motion.div
          className="grid gap-6 md:grid-cols-3 md:gap-12"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
        >
          <p className="text-sm font-medium text-stone-500">{approach.label}</p>
          <div className="md:col-span-2">
            <h2 className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight text-stone-950 sm:text-4xl">
              {approach.heading.before}<span className="editorial-highlight">{approach.heading.highlight}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700">{approach.intro}</p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {approach.principles.map((principle, index) => (
            <motion.article
              className="border-t border-stone-300 pt-5"
              key={principle.number}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 9 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            >
              <p className="text-xs font-medium text-emerald-800">{principle.number} / Principle</p>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-stone-950">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{principle.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
