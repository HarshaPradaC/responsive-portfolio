import { motion } from 'framer-motion';
import { StampBadge } from '../ui/StampBadge';
import { DecryptText } from '../ui/DecryptText';
import { profile, education } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

const META_ITEMS = [
  { label: 'Focus Area', value: 'AI & Full-Stack' },
  { label: 'Current Year', value: 'B.Tech — Year 3' },
  { label: 'Institution', value: 'KCT, Coimbatore' },
  { label: 'Classification', value: 'INNOVATOR' },
];

export function AboutSection() {
  const { ref, isInView } = useSectionInView(0.15);

  return (
    <section ref={ref} id="about" className="bg-bg-secondary py-20 sm:py-24 lg:py-28">
      <div className="section-container">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-3">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">
            File No. 01
          </span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">
            Operative File
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <DecryptText
            text="Operative Profile"
            isVisible={isInView}
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em]"
            speed={30}
          />
          <StampBadge text="VERIFIED" color="amber" isVisible={isInView} delay={0.4} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Left — Summary + meta */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            {/* Assessment summary */}
            <div className="bg-bg-paper corner-fold card-hover p-6 sm:p-8">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-4">
                &#9670; Assessment Summary
              </span>
              <p className="text-sm sm:text-base text-text-primary leading-[1.85] font-serif">
                {profile.about}
              </p>
            </div>

            {/* Meta strip */}
            <div className="bg-bg-paper card-hover p-5 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {META_ITEMS.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.25em] text-text-muted uppercase">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-accent-green text-glow-green font-semibold leading-tight">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase">
              &#9670; Academic Credentials
            </span>

            {education.map((edu, i) => (
              <div
                key={i}
                className="bg-bg-paper card-hover p-5 sm:p-6 flex flex-col justify-between gap-3 border-l-2 border-accent-amber/20 hover:border-accent-amber/60 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-accent-green text-base sm:text-lg font-bold text-glow-green leading-none">
                    {edu.score}
                  </span>
                  <StampBadge
                    text="OK"
                    color="green"
                    isVisible={isInView}
                    delay={0.5 + i * 0.12}
                    className="!text-[7px] !px-1.5 !py-0.5 !rotate-0 !transform-none shrink-0"
                  />
                </div>
                <div>
                  <h4 className="font-mono text-[11px] sm:text-xs text-accent-amber leading-snug mb-1">
                    {edu.institution}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-text-muted font-serif leading-snug">
                    {edu.degree}
                  </p>
                </div>
                <p className="font-mono text-[8px] sm:text-[9px] text-text-muted pt-3 border-t border-border-dossier">
                  {edu.period}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
