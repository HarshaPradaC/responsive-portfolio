import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '../../data/resume';

export function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navigation.map((n) => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 150) {
          setActiveSection(navigation[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-bg-primary/95 backdrop-blur-sm border-b border-border-dossier' : 'bg-transparent'}`}
    >
      <div className="section-container py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono text-sm tracking-[0.2em] text-accent-amber text-glow
            uppercase cursor-pointer bg-transparent border-none"
        >
          HPC <span className="text-text-muted">// DOSSIER</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-mono text-[11px] tracking-[0.15em] uppercase px-3 py-2
                transition-all duration-300 cursor-pointer bg-transparent border-none
                ${activeSection === item.id
                  ? 'text-accent-amber text-glow'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              <span className="text-text-muted/50 mr-1">{item.fileNo}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden font-mono text-accent-amber text-lg cursor-pointer
            bg-transparent border-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? '[X]' : '[=]'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-secondary border-b border-border-dossier overflow-hidden"
          >
            <div className="section-container py-4 space-y-2">
              <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase mb-3">
                // DOSSIER INDEX
              </div>
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left font-mono text-sm px-3 py-2
                    cursor-pointer bg-transparent border-none transition-colors
                    ${activeSection === item.id
                      ? 'text-accent-amber text-glow'
                      : 'text-text-muted hover:text-text-primary'
                    }`}
                >
                  <span className="text-text-muted/50 mr-2">[{item.fileNo}]</span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
