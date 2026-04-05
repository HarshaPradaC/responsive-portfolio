import { motion } from 'framer-motion';
import { DecryptText } from '../ui/DecryptText';
import { StampBadge } from '../ui/StampBadge';
import { experience } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

export function ExperienceSection() {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section ref={ref} id="experience" className="bg-bg-secondary py-14 sm:py-16">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">File No. 03</span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">Operations Log</span>
        </div>
        <DecryptText text="Field Operations" isVisible={isInView} as="h2"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em] mb-6 sm:mb-8" speed={30} />

        {/* Full-width experience cards */}
        <div className="space-y-3 sm:space-y-4">
          {experience.map((exp, expIndex) => (
            <motion.div
              key={exp.organization}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: expIndex * 0.12, duration: 0.5 }}
              className="bg-bg-paper card-hover !border-border-dossier"
            >
              {/* Header bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-border-dossier bg-bg-paper-light">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <h3 className="font-mono text-sm sm:text-base md:text-lg text-accent-amber text-glow font-semibold">
                    {exp.organization}
                  </h3>
                  <span className="font-mono text-[9px] sm:text-[10px] text-text-muted">{exp.location}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.1em] text-text-muted uppercase">{exp.period}</span>
                  <StampBadge text={exp.status} color={exp.status === 'ACTIVE' ? 'green' : 'amber'} isVisible={isInView}
                    delay={0.3 + expIndex * 0.1} className="!text-[7px] sm:!text-[8px] !px-2 !py-0.5 !rotate-0 !transform-none" />
                </div>
              </div>

              {/* Role */}
              <div className="px-4 sm:px-5 py-2 border-b border-border-dossier/50">
                <span className="font-mono text-[11px] sm:text-xs text-text-primary">{exp.role}</span>
              </div>

              {/* Operations */}
              <div className={`grid ${exp.operations.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {exp.operations.map((op, opIdx) => (
                  <div key={op.codename}
                    className={`p-4 sm:p-5 ${opIdx > 0 ? 'border-t md:border-t-0 md:border-l border-border-dossier' : ''}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase px-2 py-0.5 border border-border-dossier">
                        OP: {op.codename}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-accent-amber font-serif italic mb-2">{op.description}</p>
                    <ul className="space-y-1.5">
                      {op.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-text-muted">
                          <span className="text-accent-green mt-0.5 font-mono text-[9px]">&#9656;</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
