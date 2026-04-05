import { motion } from 'framer-motion';
import { StampBadge } from '../ui/StampBadge';
import { DecryptText } from '../ui/DecryptText';
import { profile, education } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

export function AboutSection() {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section ref={ref} id="about" className="bg-bg-secondary py-14 sm:py-16">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">File No. 01</span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">Personnel File</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <DecryptText text="Subject Profile" isVisible={isInView} as="h2"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em]" speed={30} />
          <StampBadge text="VERIFIED" color="amber" isVisible={isInView} delay={0.4} />
        </div>

        {/* Grid: about left, education right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main dossier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-2 bg-bg-paper card-hover corner-fold"
          >
            <div className="relative z-10 p-4 sm:p-6">
              {/* Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 pb-3 border-b border-border-dossier">
                {[
                  { label: 'Full Name', value: profile.name, hl: true },
                  { label: 'Designation', value: profile.title, hl: true },
                  { label: 'Email', value: profile.contact.email },
                  { label: 'Secure Line', value: profile.contact.phone },
                ].map((f) => (
                  <div key={f.label}>
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase block mb-0.5">{f.label}</span>
                    <span className={`font-mono text-[11px] sm:text-xs break-all ${f.hl ? 'text-accent-amber' : 'text-text-primary'}`}>{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase block mb-2">Assessment Summary</span>
              <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-serif mb-4">{profile.about}</p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border-dossier">
                {[
                  { label: 'Focus', value: 'AI & Full-Stack' },
                  { label: 'Status', value: 'B.Tech Year 2' },
                  { label: 'Institution', value: 'KCT, Coimbatore' },
                  { label: 'Classification', value: 'INNOVATOR' },
                ].map((item) => (
                  <div key={item.label} className="text-center py-2 border-r border-border-dossier/30 last:border-0">
                    <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-text-muted uppercase block">{item.label}</span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-accent-green text-glow-green font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase">Academic Credentials</span>
            {education.map((edu, i) => (
              <div key={i} className="bg-bg-paper card-hover p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-accent-green text-sm sm:text-base font-bold text-glow-green">{edu.score}</span>
                    <StampBadge text="OK" color="green" isVisible={isInView} delay={0.5 + i * 0.1}
                      className="!text-[7px] !px-1 !py-0 !rotate-0 !transform-none" />
                  </div>
                  <h4 className="font-mono text-[10px] sm:text-[11px] text-accent-amber leading-tight">{edu.institution}</h4>
                  <p className="text-[9px] sm:text-[10px] text-text-muted font-serif mt-0.5">{edu.degree}</p>
                </div>
                <p className="font-mono text-[8px] sm:text-[9px] text-text-muted mt-2 pt-2 border-t border-border-dossier">{edu.period}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
