import { motion, useReducedMotion } from 'framer-motion';

export default function FeaturedProject({ project, onSelectProject }) {
  const shouldReduceMotion = useReducedMotion();
  const architectureSection = project.caseStudy.sections.find((section) => section.architecture?.length);
  const architectureSteps = architectureSection?.architecture?.slice(0, 4) ?? [];

  return (
    <section aria-labelledby="featured-title" className="border-b border-stone-200 bg-white">
      <motion.div
        className="mx-auto max-w-6xl px-6 py-12 sm:py-16"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' }}
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-stone-500">{project.number} / Featured case study</p>
          <span className={`editorial-status ${project.statusTone === 'caution' ? 'editorial-status--caution' : 'editorial-status--progress'}`}>{project.status}</span>
        </div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-800">{project.category}</p>
            <h2 id="featured-title" className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight text-stone-950 sm:text-4xl">
              {project.caseStudy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
              {project.caseStudy.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => <span key={tag} className="editorial-tag">{tag}</span>)}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end md:justify-end">
            <div className="editorial-mini-diagram" aria-label="Selected architecture layers">
              {architectureSteps.map((step, index) => (
                <span className={index === 2 ? 'editorial-mini-diagram__active' : ''} key={step.step}>
                  {step.title}
                </span>
              ))}
              {architectureSteps.slice(0, -1).map((step) => <b aria-hidden="true" key={`arrow-${step.step}`}>↓</b>)}
            </div>
            <button className="editorial-primary-link" onClick={() => onSelectProject(project.slug)} type="button">
              Read the case study <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
