import { footer, site } from '../data/index.js';

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="flex flex-wrap items-center gap-4">
          <a className="transition-colors hover:text-stone-950" href={`mailto:${site.email}`}>{site.email}</a>
          <a className="transition-colors hover:text-stone-950" href={site.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <span>{footer.tagline}</span>
        </span>
      </div>
    </footer>
  );
}
