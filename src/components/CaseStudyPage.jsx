import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/index.js';

function StorySection({ section, index, shouldReduceMotion }) {
  return (
    <motion.section
      id={section.id}
      className="scroll-mt-28 border-t border-stone-200 py-10 sm:py-12"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: 'easeOut' }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">{section.eyebrow ?? `${String(index + 1).padStart(2, '0')} / ${section.label}`}</p>
      <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-stone-950 sm:text-4xl">{section.title}</h2>
      <div className="mt-5 max-w-2xl space-y-4 text-base leading-8 text-stone-700">
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {section.bullets?.length > 0 && (
        <ul className="mt-6 max-w-2xl space-y-3">
          {section.bullets.map((bullet) => (
            <li className="flex gap-3 text-sm leading-7 text-stone-700" key={bullet}>
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-orange-700" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {section.architecture?.length > 0 && (
        <div className="mt-8 max-w-2xl border-y border-stone-200">
          {section.architecture.map((item, stepIndex) => (
            <div className="grid gap-3 border-b border-stone-200 py-5 last:border-b-0 sm:grid-cols-6 sm:gap-5" key={item.step}>
              <p className="text-xs font-semibold text-emerald-800 sm:col-span-1">Step {item.step}</p>
              <div className="sm:col-span-5">
                <h3 className="font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-1 text-sm leading-7 text-stone-600">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {section.table && (
        <div className="mt-8 max-w-full overflow-x-auto border-y border-stone-200">
          <table className="w-full min-w-96 border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-stone-300 bg-stone-50">
                {section.table.headers.map((header) => (
                  <th className="px-4 py-3 font-semibold text-stone-800" key={header} scope="col">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr className="border-b border-stone-100 last:border-b-0" key={`${row[0]}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td className={`px-4 py-3 align-top leading-6 ${cellIndex === 0 ? 'font-medium text-stone-900' : 'text-stone-600'}`} key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.callout && (
        <aside className={`mt-8 max-w-2xl border-l-2 px-5 py-4 ${section.callout.tone === 'caution' ? 'border-orange-700 bg-orange-50' : 'border-emerald-800 bg-emerald-50/70'}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-600">{section.callout.label}</p>
          <p className="mt-2 text-sm font-medium leading-7 text-stone-900">{section.callout.text}</p>
        </aside>
      )}
    </motion.section>
  );
}

export default function CaseStudyPage({ project, projects, onBack, onNavigateProject }) {
  const shouldReduceMotion = useReducedMotion();
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main id="case-top" className="min-h-screen bg-white text-stone-950">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <button className="flex items-center gap-2 text-sm font-semibold text-stone-800 transition-colors hover:text-emerald-800" onClick={onBack} type="button">
            <span aria-hidden="true">←</span> Back to portfolio
          </button>
          <span className="hidden text-xs text-stone-500 sm:block">Case study <span aria-hidden="true">/</span> {project.title}</span>
          <a className="text-sm font-semibold text-stone-700 transition-colors hover:text-stone-950" href={site.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="grid gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' }}
        >
          <div className="lg:col-span-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">{project.caseStudy.eyebrow}</p>
              <span className={`editorial-status ${project.statusTone === 'caution' ? 'editorial-status--caution' : 'editorial-status--progress'}`}>{project.status}</span>
            </div>
            <p className="text-sm font-medium text-stone-500">{project.descriptor}</p>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">{project.caseStudy.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">{project.caseStudy.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => <span className="editorial-tag" key={tag}>{tag}</span>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repositoryUrl ? (
                <a className="editorial-primary-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">{project.repositoryLabel} <span aria-hidden="true">↗</span></a>
              ) : (
                <span className="inline-flex items-center gap-2 border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-500">Source link will be added when available</span>
              )}
              <button className="editorial-secondary-link" onClick={onBack} type="button">Return to selected work <span aria-hidden="true">↗</span></button>
            </div>
          </div>

          <aside className="self-start border-y border-stone-200 py-5 lg:col-span-4 lg:mt-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">Project snapshot</p>
            <dl className="space-y-4">
              {project.caseStudy.snapshot.map((item) => (
                <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-3 last:border-b-0 last:pb-0" key={item.label}>
                  <dt className="text-sm text-stone-500">{item.label}</dt>
                  <dd className="text-right text-sm font-semibold text-stone-900">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-l-2 border-orange-700 bg-orange-50 px-4 py-3 text-sm leading-6 text-stone-800">
              <strong className="font-semibold">Scope note</strong>
              <p className="mt-1">{site.scopeNote}</p>
            </div>
          </aside>
        </motion.div>

        <div className="grid gap-12 border-t border-stone-200 lg:grid-cols-12 lg:gap-16">
          <aside className="self-start pt-8 lg:sticky lg:top-24 lg:col-span-3 lg:max-h-screen lg:overflow-y-auto lg:pb-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">On this page</p>
            <nav aria-label="Case study sections" className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {project.caseStudy.sections.map((section, index) => (
                <a className="case-nav-link" href={`#${section.id}`} key={section.id}>
                  <span className="case-nav-number">{String(index + 1).padStart(2, '0')}</span>{section.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {project.caseStudy.sections.map((section, index) => (
              <StorySection key={section.id} section={section} index={index} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        </div>
      </div>

      <section className="mt-6 border-t border-stone-200 bg-stone-50">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 sm:grid-cols-2">
          {previousProject ? (
            <button className="project-pagination group text-left" onClick={() => onNavigateProject(previousProject.slug)} type="button">
              <span className="text-xs uppercase tracking-widest text-stone-500">← Previous project</span>
              <span className="mt-2 block text-lg font-semibold text-stone-950 group-hover:text-emerald-800">{previousProject.title}</span>
            </button>
          ) : <div />}
          {nextProject ? (
            <button className="project-pagination group text-left sm:text-right" onClick={() => onNavigateProject(nextProject.slug)} type="button">
              <span className="text-xs uppercase tracking-widest text-stone-500">Next project →</span>
              <span className="mt-2 block text-lg font-semibold text-stone-950 group-hover:text-emerald-800">{nextProject.title}</span>
            </button>
          ) : <button className="project-pagination group text-left sm:text-right" onClick={onBack} type="button">
            <span className="text-xs uppercase tracking-widest text-stone-500">End of selected work</span>
            <span className="mt-2 block text-lg font-semibold text-stone-950 group-hover:text-emerald-800">Back to portfolio ↗</span>
          </button>}
        </div>
      </section>
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <button className="font-medium transition-colors hover:text-stone-950" onClick={onBack} type="button">Back to all projects ↑</button>
        </div>
      </footer>
    </main>
  );
}
