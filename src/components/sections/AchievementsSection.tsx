import { motion } from 'framer-motion';
import { DecryptText } from '../ui/DecryptText';
import { StampBadge } from '../ui/StampBadge';
import { achievements } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

export function AchievementsSection() {
  const { ref, isInView } = useSectionInView(0.1);
  const hackathons = achievements.filter((a) => a.type === 'hackathon');
  const publications = achievements.filter((a) => a.type === 'publication');
  const certifications = achievements.filter((a) => a.type === 'certification');

  return (
    <section ref={ref} id="achievements" className="bg-bg-secondary py-14 sm:py-16">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">File No. 05</span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">Commendations</span>
        </div>
        <DecryptText text="Commendations & Intel" isVisible={isInView} as="h2"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em] mb-6 sm:mb-8" speed={30} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Hackathons */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-3 pb-2 border-b border-border-dossier">
              &#9670; Competition Results
            </span>
            <div className="space-y-2">
              {hackathons.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="bg-bg-paper card-hover p-3 flex items-start justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-mono text-[10px] sm:text-xs text-accent-amber leading-tight">{item.title}</h4>
                    <p className="text-[9px] sm:text-[10px] text-text-muted font-serif mt-0.5">{item.detail}</p>
                    <span className="font-mono text-[7px] sm:text-[8px] text-text-muted">{item.date}</span>
                  </div>
                  <span className="font-mono text-[7px] sm:text-[8px] text-accent-green border border-accent-green/40 px-1.5 py-0.5 shrink-0">
                    {item.badge}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Publications + Volunteering */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-3 pb-2 border-b border-border-dossier">
              &#9670; Published Intel
            </span>
            <div className="space-y-2 mb-4">
              {publications.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                  className="bg-bg-paper card-hover p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <StampBadge text="IEEE" color="green" isVisible={isInView} delay={0.4 + i * 0.1}
                      className="!text-[6px] sm:!text-[7px] !px-1.5 !py-0 !rotate-0 !transform-none" />
                    <span className="font-mono text-[7px] sm:text-[8px] text-accent-green">PUBLISHED</span>
                  </div>
                  <h4 className="font-mono text-[9px] sm:text-[11px] text-accent-amber leading-tight mt-1">{item.title}</h4>
                  <p className="text-[8px] sm:text-[10px] text-text-muted font-serif mt-0.5">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* Volunteering */}
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-2 pb-2 border-b border-border-dossier">
              &#9670; Field Support
            </span>
            {[
              { role: 'Tech Mentor', event: 'Nilgiris Hackathon', date: 'Feb 2026' },
              { role: 'Volunteer', event: 'IEEE Student Branch', date: 'Feb 2024+' },
              { role: 'Support', event: 'Campus Placement Drive', date: 'Ongoing' },
            ].map((vol, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
                className="flex items-center justify-between py-1.5 border-b border-border-dossier/30 last:border-0"
              >
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-text-primary">{vol.role}</span>
                  <span className="font-mono text-[9px] sm:text-[10px] text-text-muted"> — {vol.event}</span>
                </div>
                <span className="font-mono text-[7px] sm:text-[8px] text-text-muted">{vol.date}</span>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="lg:col-span-3">
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-3 pb-2 border-b border-border-dossier">
              &#9670; Clearance Certs
            </span>
            <div className="space-y-2">
              {certifications.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                  className="bg-bg-paper card-hover p-2.5 text-center"
                >
                  <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] text-accent-green uppercase block">CERTIFIED &#10003;</span>
                  <h4 className="font-mono text-[9px] sm:text-[10px] text-accent-amber mt-0.5 leading-tight">{item.title}</h4>
                  <p className="text-[8px] sm:text-[9px] text-text-muted mt-0.5">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
