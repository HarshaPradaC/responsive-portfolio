import { motion } from 'framer-motion';
import { useSectionInView } from '../../hooks/useSectionInView';
import { DecryptText } from '../ui/DecryptText';

interface SectionWrapperProps {
  id: string;
  fileNo: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionWrapper({
  id,
  fileNo,
  label,
  title,
  children,
  className = '',
  dark = false,
}: SectionWrapperProps) {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-16 px-6 sm:px-10 lg:px-16
        ${dark ? 'bg-bg-secondary' : 'bg-bg-primary'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
              File No. {fileNo}
            </span>
            <div className="flex-1 h-px bg-border-dossier" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase">
              {label}
            </span>
          </div>
          <DecryptText
            text={title}
            isVisible={isInView}
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl text-accent-amber text-glow
              uppercase tracking-[0.1em]"
            speed={30}
          />
        </div>
        {children}
      </motion.div>
    </section>
  );
}
