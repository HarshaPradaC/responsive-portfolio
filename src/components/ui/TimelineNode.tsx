import { motion } from 'framer-motion';
import { StampBadge } from './StampBadge';
import type { Experience } from '../../types';

interface TimelineNodeProps {
  experience: Experience;
  index: number;
}

export function TimelineNode({ experience, index }: TimelineNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-12 last:pb-0 border-l border-border-dossier"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3
        border-2 border-accent-amber bg-bg-primary rounded-full" />

      {/* Operation card */}
      <div className="bg-bg-paper border border-border-dossier p-5
        hover:border-accent-amber/50 transition-colors">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="font-mono text-base text-accent-amber text-glow">
              {experience.organization}
            </h3>
            <p className="font-mono text-xs text-text-muted mt-0.5">
              {experience.role} — {experience.location}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.15em] text-text-muted uppercase">
              {experience.period}
            </span>
            <StampBadge
              text={experience.status}
              color={experience.status === 'ACTIVE' ? 'green' : 'amber'}
              isVisible={true}
              delay={0}
            />
          </div>
        </div>

        <div className="w-full h-px bg-border-dossier mb-4" />

        {/* Operations */}
        {experience.operations.map((op) => (
          <div key={op.codename} className="mb-4 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
                Operation:
              </span>
              <span className="font-mono text-sm text-accent-amber">
                {op.codename}
              </span>
            </div>
            <p className="text-sm text-text-primary font-serif mb-2 italic">
              {op.description}
            </p>
            <ul className="space-y-1.5">
              {op.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                  <span className="text-accent-amber mt-0.5 font-mono">&#9656;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
