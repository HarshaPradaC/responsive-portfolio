import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { contactFormUrl } from '../../data/resume';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const form = e.currentTarget;
      await fetch(contactFormUrl, {
        method: 'POST',
        body: new FormData(form),
      });
      setStatus('sent');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClasses = `w-full bg-bg-primary border border-border-dossier
    font-mono text-sm text-accent-green px-4 py-3
    focus:border-accent-amber focus:outline-none
    placeholder:text-text-muted/40 transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="Name"
          placeholder="// AGENT NAME"
          required
          className={inputClasses}
        />
        <input
          type="email"
          name="Email Address"
          placeholder="// SECURE EMAIL"
          required
          className={inputClasses}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="tel"
          name="Mobile Number"
          placeholder="// FREQUENCY"
          className={inputClasses}
        />
        <input
          type="text"
          name="Email Subject"
          placeholder="// SUBJECT HEADER"
          className={inputClasses}
        />
      </div>
      <textarea
        name="Your Message"
        rows={6}
        placeholder="// ENCRYPTED MESSAGE BODY..."
        required
        className={`${inputClasses} resize-none`}
      />

      <div className="flex items-center justify-between">
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="font-mono text-sm uppercase tracking-[0.2em] px-8 py-3
            bg-accent-amber text-bg-primary font-semibold
            hover:bg-accent-amber/90 disabled:opacity-50
            transition-all duration-300 cursor-pointer"
        >
          {status === 'sending' ? '[ ENCRYPTING... ]' : '[ ENCRYPT & SEND ]'}
        </motion.button>

        {status === 'sent' && (
          <span className="font-mono text-xs text-accent-green text-glow-green">
            &#10003; MESSAGE TRANSMITTED SUCCESSFULLY
          </span>
        )}
        {status === 'error' && (
          <span className="font-mono text-xs text-accent-red">
            &#10007; TRANSMISSION FAILED — RETRY
          </span>
        )}
      </div>
    </form>
  );
}
