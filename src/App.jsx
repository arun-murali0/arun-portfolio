import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SiteHeader from './components/SiteHeader.jsx';
import HeroSection from './components/HeroSection.jsx';
import FeaturedProject from './components/FeaturedProject.jsx';
import ProjectSection from './components/ProjectSection.jsx';
import ApproachSection from './components/ApproachSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import CaseStudyPage from './components/CaseStudyPage.jsx';
import { projects, site } from './data/index.js';

function readProjectFromUrl() {
  return new URLSearchParams(window.location.search).get('project');
}

export default function App() {
  const [selectedSlug, setSelectedSlug] = useState(readProjectFromUrl);
  const shouldReduceMotion = useReducedMotion();
  const selectedProject = projects.find((project) => project.slug === selectedSlug) ?? null;

  useEffect(() => {
    document.title = site.pageTitle;
  }, []);

  useEffect(() => {
    const syncFromHistory = () => setSelectedSlug(readProjectFromUrl());
    window.addEventListener('popstate', syncFromHistory);
    return () => window.removeEventListener('popstate', syncFromHistory);
  }, []);

  const openProject = useCallback((slug) => {
    const url = new URL(window.location.href);
    url.searchParams.set('project', slug);
    url.hash = '';
    window.history.pushState({ project: slug }, '', url);
    setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [shouldReduceMotion]);

  const closeProject = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    url.hash = 'projects';
    window.history.pushState({}, '', url);
    setSelectedSlug(null);
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }, shouldReduceMotion ? 0 : 80);
  }, [shouldReduceMotion]);

  const goToProject = useCallback((slug) => {
    if (slug) openProject(slug);
  }, [openProject]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <AnimatePresence mode="wait" initial={false}>
        {selectedProject ? (
          <motion.div
            key={selectedProject.slug}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -6 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: 'easeOut' }}
          >
            <CaseStudyPage
              project={selectedProject}
              onBack={closeProject}
              onNavigateProject={goToProject}
              projects={projects}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            <SiteHeader />
            <main>
              <HeroSection />
              <FeaturedProject project={projects[0]} onSelectProject={openProject} />
              <ProjectSection onSelectProject={openProject} />
              <ApproachSection />
              <ContactSection />
            </main>
            <SiteFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
