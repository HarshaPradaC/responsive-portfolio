import { motion } from 'framer-motion';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useSectionInView } from '../../hooks/useSectionInView';
import { DecryptText } from '../ui/DecryptText';
import { StampBadge } from '../ui/StampBadge';
import { SideWheelNav } from '../ui/SideWheelNav';
import { profile } from '../../data/resume';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';

const CipherWheel = lazy(() => import('../three/CipherWheel').then(m => ({ default: m.CipherWheel })));

const ROLE_CYCLE_INTERVAL = 2600;
const CHAR_SPEED = 60;
const DELETE_SPEED = 35;

function useTypingCycle(roles: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'hold' | 'deleting'>('typing');

  useEffect(() => {
    const target = roles[roleIndex];

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), CHAR_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('hold'), ROLE_CYCLE_INTERVAL);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'hold') {
      setPhase('deleting');
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        setRoleIndex(i => (i + 1) % roles.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, roleIndex, roles]);

  return displayed;
}

const socialLinks = [
  {
    key: 'github',
    icon: FaGithub,
    href: profile.social.github,
    label: 'GitHub',
    title: 'GitHub Profile',
  },
  {
    key: 'linkedin',
    icon: FaLinkedin,
    href: profile.social.linkedin,
    label: 'LinkedIn',
    title: 'LinkedIn Profile',
  },
  {
    key: 'leetcode',
    icon: SiLeetcode,
    href: profile.social.leetcode,
    label: 'LeetCode',
    title: 'LeetCode Profile',
  },
  {
    key: 'codechef',
    icon: SiCodechef,
    href: profile.social.codechef,
    label: 'CodeChef',
    title: 'CodeChef Profile',
  },
  {
    key: 'email',
    icon: FaEnvelope,
    href: `mailto:${profile.contact.email}`,
    label: 'Email',
    title: profile.contact.email,
  },
  {
    key: 'phone',
    icon: FaPhone,
    href: `tel:${profile.contact.phone}`,
    label: 'Phone',
    title: profile.contact.phone,
  },
];

export function HeroSection() {
  const { ref, isInView } = useSectionInView(0.1);
  const typedRole = useTypingCycle(profile.roles);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center bg-bg-primary bg-blueprint scanlines overflow-hidden"
    >
      {/* Full-screen cipher wheel background */}
      <div className="absolute inset-0 z-0 opacity-15 hidden lg:block">
        <Suspense fallback={null}>
          <CipherWheel />
        </Suspense>
      </div>

      {/* Decorative border lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[12%] left-[3%] right-[3%] h-px bg-accent-amber/8" />
        <div className="absolute bottom-[12%] left-[3%] right-[3%] h-px bg-accent-amber/8" />
        <div className="absolute left-[3%] top-[12%] bottom-[12%] w-px bg-accent-amber/8" />
        <div className="absolute right-[3%] top-[12%] bottom-[12%] w-px bg-accent-amber/8" />
        <div className="absolute top-[12%] left-[3%] w-4 h-4 border-t border-l border-accent-amber/20" />
        <div className="absolute top-[12%] right-[3%] w-4 h-4 border-t border-r border-accent-amber/20" />
        <div className="absolute bottom-[12%] left-[3%] w-4 h-4 border-b border-l border-accent-amber/20" />
        <div className="absolute bottom-[12%] right-[3%] w-4 h-4 border-b border-r border-accent-amber/20" />
      </div>

      {/* CLASSIFIED watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none z-0">
        <span className="font-typewriter text-[8rem] sm:text-[14rem] text-accent-red uppercase rotate-[-15deg] block whitespace-nowrap">
          CLASSIFIED
        </span>
      </div>

      <div className="relative z-10 section-container w-full py-8 sm:py-12">
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
        <div className="flex flex-col items-center text-center py-4 sm:py-6">
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

          {/* Dynamic role cycling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-3 sm:mt-4 h-7 sm:h-8 flex items-center justify-center"
          >
            <span className="font-mono text-sm sm:text-lg md:text-xl text-text-primary tracking-[0.12em] min-w-[1ch]">
              {typedRole}
              <span className="inline-block w-[2px] h-[1em] bg-accent-amber ml-0.5 align-middle animate-pulse" />
            </span>
          </motion.div>

          {/* Stamps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-4 sm:mt-5 flex items-center gap-3"
          >
            <StampBadge text="DECLASSIFIED" color="red" isVisible={isInView} delay={1.0} />
            <StampBadge text="PUBLIC ACCESS" color="amber" isVisible={isInView} delay={1.2} />
          </motion.div>

          {/* Social icon links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {socialLinks.map(({ key, icon: Icon, href, label, title }) => (
              <a
                key={key}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                title={title}
                className="group relative flex flex-col items-center gap-1"
              >
                <span
                  className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11
                    border border-border-dossier text-accent-amber
                    group-hover:bg-accent-amber group-hover:text-bg-primary group-hover:border-accent-amber
                    group-hover:shadow-[0_0_12px_rgba(212,168,67,0.4)]
                    transition-all duration-200"
                >
                  <Icon size={18} />
                </span>
                <span className="font-mono text-[8px] tracking-[0.15em] text-text-muted uppercase
                  group-hover:text-accent-amber transition-colors duration-200">
                  {label}
                </span>
              </a>
            ))}
          </motion.div>

          {/* Resume button — desktop only */}
          <motion.a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="mt-6 sm:mt-7 inline-block font-mono text-xs sm:text-sm uppercase tracking-[0.2em]
              px-6 sm:px-8 py-2.5 sm:py-3 bg-accent-amber text-bg-primary font-semibold
              hover:bg-accent-green transition-all duration-300"
          >
            [ Download Full Dossier ]
          </motion.a>

        </div>
      </div>

      {/* Side cipher-wheel navigator — mobile only, absolutely positioned in hero */}
      <SideWheelNav />

      {/* Desktop-only scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[8px] text-text-muted tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-4 h-7 border border-accent-amber/40 rounded-full flex justify-center">
          <div className="w-0.5 h-1.5 bg-accent-amber rounded-full mt-1" />
        </div>
      </motion.div>
    </section>
  );
}
