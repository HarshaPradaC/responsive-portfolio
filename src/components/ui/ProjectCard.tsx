import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      className="corner-fold bg-bg-paper card-hover p-4 sm:p-5 group flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-dossier">
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase">
          Project
        </span>
        <span className="font-mono text-[8px] sm:text-[9px] text-text-muted">{project.hours}</span>
      </div>

      {/* Title */}
      <h3 className="font-mono text-sm sm:text-base text-accent-amber group-hover:text-glow transition-all mb-2">
        {project.title}
      </h3>

      {/* Description */}
      <div className="mb-3">
        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-text-muted uppercase block mb-1">Overview</span>
        <p className="text-[11px] sm:text-xs text-text-primary leading-relaxed font-serif">{project.abstract}</p>
      </div>

      {/* Bullets */}
      <ul className="space-y-1 mb-3">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-[10px] sm:text-[11px] text-text-muted">
            <span className="text-accent-green mt-0.5 font-mono text-[8px]">&#9656;</span>
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech stack — pushed to bottom */}
      <div className="mt-auto mb-3 pt-2 border-t border-border-dossier/40">
        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-text-muted uppercase block mb-1.5">Tech Stack</span>
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span key={tech}
              className="font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 border border-border-dossier
                text-text-muted group-hover:border-accent-amber/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Link */}
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs text-accent-amber
            hover:text-accent-green transition-colors tracking-[0.1em] uppercase">
          View Project &#8599;
        </a>
      )}
    </motion.div>
  );
}
