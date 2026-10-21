import { nav, site } from '../data/index.js';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a className="shrink-0 text-base font-semibold tracking-tight text-stone-950" href="#top" aria-label={`${site.name}, home`}>
          {site.name}<span className="text-emerald-800">.</span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm text-stone-600 sm:gap-7">
          {nav.map((item) => (
            <a className="transition-colors hover:text-stone-950" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
