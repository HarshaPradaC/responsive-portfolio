import { motion } from 'framer-motion';
import { DecryptText } from '../ui/DecryptText';
import { ProjectCard } from '../ui/ProjectCard';
import { projects } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

export function ProjectsSection() {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section ref={ref} id="projects" className="bg-bg-primary py-14 sm:py-16 bg-blueprint">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">File No. 04</span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">Project Registry</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 sm:mb-8">
          <DecryptText text="Projects & Builds" isVisible={isInView} as="h2"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em]" speed={30} />
          <span className="font-mono text-[8px] sm:text-[9px] text-text-muted tracking-[0.2em] uppercase">
            {projects.length} Projects
          </span>
        </div>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Row 2: 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {projects.slice(3).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 3} />
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-4 sm:mt-6 pt-3 border-t border-border-dossier flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <span className="font-mono text-[8px] sm:text-[9px] text-text-muted tracking-[0.2em] uppercase">
            Total dev hours: ~124+
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] text-accent-green tracking-[0.2em] uppercase">
            Status: All Active
          </span>
        </motion.div>
      </div>
    </section>
  );
}
