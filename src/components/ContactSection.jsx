import { motion, useReducedMotion } from 'framer-motion';
import { contact, site } from '../data/index.js';

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="scroll-mt-8 mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <motion.div
        className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-stone-500">{contact.label}</p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">
            {contact.heading.before}<span className="editorial-highlight">{contact.heading.highlight}</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-700">{contact.text}</p>
          <p className="mt-3 text-sm text-stone-600">
            <a className="font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-emerald-800" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a className="editorial-primary-link" href={`mailto:${site.email}`}>
            {contact.emailLabel} <span aria-hidden="true">→</span>
          </a>
          <a className="editorial-secondary-link" href={site.socials.github} target="_blank" rel="noreferrer">
            {contact.githubLabel} <span aria-hidden="true">↗</span>
          </a>
          <a className="editorial-secondary-link" href={site.socials.linkedIn} target="_blank" rel="noreferrer">
            {contact.linkedInLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
