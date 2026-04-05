import { motion } from 'framer-motion';

interface SkillTagProps {
  name: string;
  index: number;
}

export function SkillTag({ name, index }: SkillTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      viewport={{ once: true }}
      className="inline-block font-mono text-xs uppercase tracking-[0.15em]
        px-3 py-1.5 border border-border-dossier text-accent-amber
        bg-bg-paper hover:bg-bg-paper-light hover:border-accent-amber
        transition-colors duration-300 cursor-default"
    >
      {name}
    </motion.span>
  );
}
