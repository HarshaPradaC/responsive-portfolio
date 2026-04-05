import { motion } from 'framer-motion';
import { useSectionInView } from '../../hooks/useSectionInView';
import { DecryptText } from '../ui/DecryptText';
import { StampBadge } from '../ui/StampBadge';
import { profile } from '../../data/resume';
import { lazy, Suspense } from 'react';

const CipherWheel = lazy(() => import('../three/CipherWheel').then(m => ({ default: m.CipherWheel })));

export function HeroSection() {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex items-center bg-bg-primary bg-blueprint scanlines overflow-hidden"
    >
      {/* Full-screen cipher wheel background */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Suspense fallback={null}>
          <CipherWheel />
        </Suspense>
      </div>

      {/* Decorative border lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[3%] right-[3%] h-px bg-accent-amber/8" />
        <div className="absolute bottom-[15%] left-[3%] right-[3%] h-px bg-accent-amber/8" />
        <div className="absolute left-[3%] top-[15%] bottom-[15%] w-px bg-accent-amber/8" />
        <div className="absolute right-[3%] top-[15%] bottom-[15%] w-px bg-accent-amber/8" />
        {/* Corner marks */}
        <div className="absolute top-[15%] left-[3%] w-4 h-4 border-t border-l border-accent-amber/20" />
        <div className="absolute top-[15%] right-[3%] w-4 h-4 border-t border-r border-accent-amber/20" />
        <div className="absolute bottom-[15%] left-[3%] w-4 h-4 border-b border-l border-accent-amber/20" />
        <div className="absolute bottom-[15%] right-[3%] w-4 h-4 border-b border-r border-accent-amber/20" />
      </div>

      {/* CLASSIFIED watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none z-0">
        <span className="font-typewriter text-[12rem] sm:text-[18rem] text-accent-red uppercase rotate-[-15deg] block whitespace-nowrap">
          CLASSIFIED
        </span>
      </div>

      <div className="relative z-10 section-container w-full">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-border-dossier"
        >
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">
              Dossier No. {profile.fileNumber}
            </span>
            <span className="w-2 h-2 bg-accent-green rounded-full pulse-dot" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-accent-green uppercase hidden sm:inline">
              SYSTEM ACTIVE
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">
            Clearance: {profile.clearanceLevel}
          </span>
        </motion.div>

        {/* Main content — centered */}
        <div className="flex flex-col items-center text-center py-4 sm:py-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-text-muted uppercase mb-3"
          >
            &#9670; Subject Identification &#9670;
          </motion.span>

          <DecryptText
            text={profile.name}
            isVisible={isInView}
            as="h1"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-accent-amber text-glow
              uppercase tracking-[0.06em] leading-[1.1] !font-mono font-bold"
            speed={25}
            delay={200}
          />

          <div className="mt-3 sm:mt-4 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-accent-amber to-transparent" />

          <DecryptText
            text={profile.title}
            isVisible={isInView}
            as="p"
            className="text-sm sm:text-lg md:text-xl text-text-primary mt-3 sm:mt-4 tracking-[0.12em]"
            speed={18}
            delay={600}
          />

          {/* Stamps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-4 sm:mt-6 flex items-center gap-3"
          >
            <StampBadge text="DECLASSIFIED" color="red" isVisible={isInView} delay={1.0} />
            <StampBadge text="PUBLIC ACCESS" color="amber" isVisible={isInView} delay={1.2} />
          </motion.div>

          {/* Links row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {[
              { label: 'GitHub', href: profile.social.github },
              { label: 'LinkedIn', href: profile.social.linkedin },
              { label: 'Email', href: `mailto:${profile.contact.email}` },
              { label: profile.contact.phone, href: `tel:${profile.contact.phone}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-mono text-[10px] sm:text-[11px] text-accent-amber hover:text-bg-primary
                  hover:bg-accent-amber transition-all duration-200 tracking-[0.08em] uppercase
                  border border-border-dossier hover:border-accent-amber px-3 sm:px-4 py-1.5 sm:py-2"
              >
                {link.label} &#8599;
              </a>
            ))}
          </motion.div>

          {/* Resume button */}
          <motion.a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="mt-4 sm:mt-6 inline-block font-mono text-xs sm:text-sm uppercase tracking-[0.2em]
              px-6 sm:px-8 py-2.5 sm:py-3 bg-accent-amber text-bg-primary font-semibold
              hover:bg-accent-green transition-all duration-300"
          >
            [ Download Full Dossier ]
          </motion.a>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.4 }}
          className="mt-auto pt-3 border-t border-border-dossier grid grid-cols-4 gap-2 sm:gap-4"
        >
          {[
            { label: 'Projects', value: '5+' },
            { label: 'IEEE Papers', value: '2' },
            { label: 'Hackathons', value: '5+' },
            { label: 'GPA', value: '9.32' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-2 sm:py-3 border-r border-border-dossier/30 last:border-0">
              <span className="block font-mono text-xl sm:text-2xl md:text-3xl text-accent-amber text-glow font-bold">
                {stat.value}
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <span className="font-mono text-[8px] sm:text-[9px] text-text-muted tracking-[0.2em] uppercase block text-center mb-1">
          Scroll
        </span>
        <div className="w-4 h-7 border border-accent-amber/40 rounded-full flex justify-center mx-auto">
          <div className="w-0.5 h-1.5 bg-accent-amber rounded-full mt-1" />
        </div>
      </motion.div>
    </section>
  );
}
