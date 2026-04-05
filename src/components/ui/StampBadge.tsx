import { motion } from 'framer-motion';

interface StampBadgeProps {
  text: string;
  color?: 'red' | 'amber' | 'green';
  isVisible: boolean;
  className?: string;
  delay?: number;
}

const colorMap = {
  red: 'border-accent-red text-accent-red',
  amber: 'border-accent-amber text-accent-amber',
  green: 'border-accent-green text-accent-green',
};

export function StampBadge({
  text,
  color = 'red',
  isVisible,
  className = '',
  delay = 0.5,
}: StampBadgeProps) {
  return (
    <motion.span
      initial={{ scale: 3, rotate: -15, opacity: 0 }}
      animate={isVisible ? { scale: 1, rotate: -12, opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      className={`inline-block font-typewriter text-xs sm:text-sm uppercase tracking-[0.2em]
        border-2 px-3 py-1 ${colorMap[color]} ${className}`}
    >
      {text}
    </motion.span>
  );
}
