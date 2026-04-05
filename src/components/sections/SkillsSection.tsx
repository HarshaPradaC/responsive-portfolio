import { motion } from 'framer-motion';
import { DecryptText } from '../ui/DecryptText';
import { SkillTag } from '../ui/SkillTag';
import { skills } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

export function SkillsSection() {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section ref={ref} id="skills" className="bg-bg-primary py-14 sm:py-16 bg-blueprint">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">File No. 02</span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">Equipment Manifest</span>
        </div>
        <DecryptText text="Technical Capabilities" isVisible={isInView} as="h2"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em] mb-6 sm:mb-8" speed={30} />

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {skills.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.06, duration: 0.4 }}
              className="bg-bg-secondary card-hover p-3 sm:p-4 group"
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border-dossier">
                <span className="font-mono text-accent-amber text-sm sm:text-base group-hover:text-glow transition-all">
                  {category.icon}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-text-muted uppercase">
                  {category.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {category.items.map((skill, i) => (
                  <SkillTag key={skill} name={skill} index={i} />
                ))}
              </div>
              <div className="pt-2 border-t border-border-dossier/50">
                <span className="font-mono text-[7px] sm:text-[8px] text-text-muted tracking-[0.2em] uppercase">
                  {category.items.length} items registered
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-4 sm:mt-6 pt-3 border-t border-border-dossier flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-text-muted uppercase">
            Total: {skills.reduce((a, c) => a + c.items.length, 0)} capabilities / {skills.length} domains
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {['Python 3yr', 'SQL 3yr', 'JavaScript 2yr', 'C++ <1yr'].map((item) => (
              <span key={item} className="font-mono text-[8px] sm:text-[9px] text-accent-green tracking-[0.1em]">
                &#9679; {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
