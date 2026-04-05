import { useDecryptAnimation } from '../../hooks/useDecryptAnimation';

interface DecryptTextProps {
  text: string;
  isVisible: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  speed?: number;
  delay?: number;
}

export function DecryptText({
  text,
  isVisible,
  as = 'span',
  className = '',
  speed,
  delay,
}: DecryptTextProps) {
  const { displayed } = useDecryptAnimation(text, isVisible, { speed, delay });
  const content = isVisible ? displayed : text;

  const baseClass = `font-mono ${className}`;

  switch (as) {
    case 'h1': return <h1 className={baseClass}>{content}</h1>;
    case 'h2': return <h2 className={baseClass}>{content}</h2>;
    case 'h3': return <h3 className={baseClass}>{content}</h3>;
    case 'p': return <p className={baseClass}>{content}</p>;
    case 'div': return <div className={baseClass}>{content}</div>;
    default: return <span className={baseClass}>{content}</span>;
  }
}
