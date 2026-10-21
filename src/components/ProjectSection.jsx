import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects, projectFilters, projectsSection, reservedProjectSlots } from '../data/index.js';

export default function ProjectSection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState(projectFilters[0]);
  const shouldReduceMotion = useReducedMotion();

  const visibleProjects = useMemo(() => {
    if (activeFilter === projectFilters[0]) return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-16 sm:py-20">
      <motion.div
        className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <div>
          <p className="mb-3 text-sm font-medium text-stone-500">{projectsSection.label}</p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-stone-950 sm:text-4xl">{projectsSection.heading}</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-stone-600">{projectsSection.intro}</p>
      </motion.div>

      <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter projects">
        {projectFilters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              aria-pressed={isActive}
              className={`editorial-filter ${isActive ? 'editorial-filter--active' : ''}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <motion.article
            className="h-full"
            key={project.slug}
            layout
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.38, delay: shouldReduceMotion ? 0 : index * 0.045, ease: 'easeOut' }}
          >
            <button
              className="editorial-project-card group flex h-full min-h-72 w-full flex-col text-left"
              onClick={() => onSelectProject(project.slug)}
              type="button"
              aria-label={`Open ${project.title} case study`}
            >
              <span className="flex w-full items-center justify-between gap-4 text-xs text-stone-500">
                <span>{project.number} / {project.category}</span>
                <span className={`editorial-status ${project.statusTone === 'caution' ? 'editorial-status--caution' : 'editorial-status--progress'}`}>
                  {project.status}
                </span>
              </span>
              <span className="mt-7 flex items-start justify-between gap-4">
                <span className="font-serif text-3xl font-medium tracking-tight text-stone-950 sm:text-4xl">{project.title}</span>
                <span aria-hidden="true" className="editorial-arrow">↗</span>
              </span>
              <span className="mt-3 block max-w-xl text-sm leading-7 text-stone-700">{project.summary}</span>
              <span className="mt-auto flex flex-wrap gap-2 pt-7">
                {project.tags.map((tag) => <span className="editorial-tag" key={tag}>{tag}</span>)}
              </span>
              <span className="mt-6 flex items-center gap-2 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">
                Read case study <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
          </motion.article>
        ))}
      </motion.div>

      {visibleProjects.length === 0 && (
        <p className="border border-dashed border-stone-300 px-5 py-8 text-sm text-stone-600">{projectsSection.emptyMessage}</p>
      )}

      <div className="mt-8 flex flex-col gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-stone-500">{projectsSection.reservedNote}</p>
        <div className="flex flex-wrap gap-2" aria-label="Reserved project slots">
          {reservedProjectSlots.map((slot) => (
            <span className="inline-flex items-center gap-2 border border-dashed border-stone-300 px-3 py-2 text-xs text-stone-500" key={slot.number}>
              <span className="font-mono text-stone-400">{slot.number}</span>
              <span>{slot.status}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
