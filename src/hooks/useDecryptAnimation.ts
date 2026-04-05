import { useState, useEffect, useCallback } from 'react';

const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?><{}[]=/\\|~^';

export function useDecryptAnimation(
  text: string,
  isVisible: boolean,
  options?: { speed?: number; delay?: number }
) {
  const speed = options?.speed ?? 40;
  const delay = options?.delay ?? 200;
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  const randomChar = useCallback(() => {
    return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let frame: number;
    let currentIndex = 0;
    let scrambleCount = 0;
    const maxScrambles = 3;

    const timeout = setTimeout(() => {
      const animate = () => {
        if (currentIndex >= text.length) {
          setDisplayed(text);
          setIsDone(true);
          return;
        }

        scrambleCount++;
        const resolved = text.slice(0, currentIndex);
        const scrambled = text
          .slice(currentIndex)
          .split('')
          .map((ch) => (ch === ' ' ? ' ' : randomChar()))
          .join('');

        setDisplayed(resolved + scrambled);

        if (scrambleCount >= maxScrambles) {
          currentIndex++;
          scrambleCount = 0;
        }

        frame = window.setTimeout(animate, speed);
      };

      animate();
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(frame);
    };
  }, [text, isVisible, speed, delay, randomChar]);

  return { displayed, isDone };
}
