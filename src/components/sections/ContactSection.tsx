import { motion } from 'framer-motion';
import { DecryptText } from '../ui/DecryptText';
import { ContactForm } from '../ui/ContactForm';
import { profile } from '../../data/resume';
import { useSectionInView } from '../../hooks/useSectionInView';

export function ContactSection() {
  const { ref, isInView } = useSectionInView(0.1);

  return (
    <section ref={ref} id="contact" className="bg-bg-primary py-14 sm:py-16 bg-blueprint">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">File No. 06</span>
          <div className="flex-1 h-px bg-border-dossier" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-text-muted uppercase">Secure Channel</span>
        </div>
        <DecryptText text="Establish Communication" isVisible={isInView} as="h2"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent-amber text-glow uppercase tracking-[0.1em] mb-6 sm:mb-8" speed={30} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-3"
          >
            {/* Frequencies */}
            <div className="bg-bg-secondary card-hover p-4 sm:p-5">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-3 pb-2 border-b border-border-dossier">
                &#9670; Frequencies
              </span>
              <div className="space-y-3">
                <div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-text-muted uppercase block mb-0.5">Email</span>
                  <a href={`mailto:${profile.contact.email}`}
                    className="font-mono text-xs sm:text-sm text-accent-amber hover:text-accent-green transition-colors break-all">
                    {profile.contact.email}
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-text-muted uppercase block mb-0.5">Secure Line</span>
                  <span className="font-mono text-xs sm:text-sm text-accent-amber">{profile.contact.phone}</span>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="bg-bg-secondary card-hover p-4 sm:p-5">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-3 pb-2 border-b border-border-dossier">
                &#9670; Channels
              </span>
              <div className="space-y-2">
                {[
                  { label: 'GitHub', href: profile.social.github, desc: 'Source repos' },
                  { label: 'LinkedIn', href: profile.social.linkedin, desc: 'Network' },
                ].map((ch) => (
                  <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 border border-border-dossier
                      hover:border-accent-amber hover:bg-bg-paper transition-all group block">
                    <div>
                      <span className="font-mono text-[11px] sm:text-xs text-accent-amber group-hover:text-glow">{ch.label}</span>
                      <span className="block font-mono text-[8px] sm:text-[9px] text-text-muted">{ch.desc}</span>
                    </div>
                    <span className="font-mono text-accent-amber text-xs group-hover:translate-x-1 transition-transform">&#8599;</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-bg-secondary card-hover p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-green rounded-full pulse-dot" />
                <span className="font-mono text-[9px] sm:text-[10px] text-accent-green tracking-[0.12em] uppercase">
                  Channel Open — Accepting
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="lg:col-span-2 bg-bg-secondary card-hover p-4 sm:p-6"
          >
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-text-muted uppercase block mb-4 sm:mb-6 pb-2 border-b border-border-dossier">
              &#9670; Compose Encrypted Message
            </span>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
