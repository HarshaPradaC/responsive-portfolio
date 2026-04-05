export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-dossier">
      <div className="section-container py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent-amber rounded-full" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
              End of Dossier — File {'{'}HPC-2025-042{'}'}
            </span>
          </div>
          <span className="font-mono text-[10px] text-text-muted">
            &copy; {new Date().getFullYear()} Harsha Prada Chandrakumar — All Intel Reserved
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[10px] text-accent-amber hover:text-accent-green
              transition-colors cursor-pointer bg-transparent border border-border-dossier
              hover:border-accent-amber px-3 py-1.5 tracking-[0.15em] uppercase"
          >
            &#8593; Return to Cover
          </button>
        </div>
      </div>
    </footer>
  );
}
