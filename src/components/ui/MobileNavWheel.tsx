import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome, FiUser, FiCpu, FiBriefcase,
  FiFileText, FiAward, FiMail,
} from 'react-icons/fi';

// ─── section registry ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',         label: 'COVER',    no: '00', Icon: FiHome      },
  { id: 'about',        label: 'PROFILE',  no: '01', Icon: FiUser      },
  { id: 'skills',       label: 'MANIFEST', no: '02', Icon: FiCpu       },
  { id: 'experience',   label: 'OPS LOG',  no: '03', Icon: FiBriefcase },
  { id: 'projects',     label: 'PATENTS',  no: '04', Icon: FiFileText  },
  { id: 'achievements', label: 'COMMENDS', no: '05', Icon: FiAward     },
  { id: 'contact',      label: 'CHANNEL',  no: '06', Icon: FiMail      },
];

const N      = SECTIONS.length;   // 7
const STEP   = 360 / N;           // ≈ 51.43°
const SIZE   = 248;               // wheel diameter (px)
const HALF   = SIZE / 2;          // 124
const ICON_R = 84;                // icon orbit radius from center
const R_OUT  = HALF - 4;         // outer ring radius
const R_IN   = HALF - 26;        // inner dashed ring radius

// ─── arc path for the active-slot indicator at 12 o'clock ─────────────────────
const ARC_DEG = 24;
const arcAngle = ARC_DEG * (Math.PI / 180);
const arcX1 = HALF + R_OUT * Math.sin(-arcAngle);
const arcY1 = HALF - R_OUT * Math.cos(-arcAngle);
const arcX2 = HALF + R_OUT * Math.sin(arcAngle);
const arcY2 = HALF - R_OUT * Math.cos(arcAngle);
const ARC_PATH = `M ${arcX1} ${arcY1} A ${R_OUT} ${R_OUT} 0 0 1 ${arcX2} ${arcY2}`;

// ─── tick marks data (pre-computed) ───────────────────────────────────────────
const TICKS = Array.from({ length: 36 }, (_, i) => {
  const a     = (i / 36) * 2 * Math.PI;
  const major = i % 9 === 0;
  const r2    = major ? R_OUT - 12 : R_OUT - 7;
  return {
    x1: HALF + R_OUT * Math.sin(a), y1: HALF - R_OUT * Math.cos(a),
    x2: HALF + r2    * Math.sin(a), y2: HALF - r2    * Math.cos(a),
    major,
  };
});

// ─── helpers ──────────────────────────────────────────────────────────────────
function activeFromRot(rot: number): number {
  const n = ((rot % 360) + 360) % 360;
  return Math.round(n / STEP) % N;
}

function nearestSnap(rot: number): { idx: number; snapped: number } {
  const n   = ((rot % 360) + 360) % 360;
  const idx = Math.round(n / STEP) % N;
  const base = idx * STEP;
  const turns = Math.floor(rot / 360);
  const cands = [
    (turns - 1) * 360 + base,
    turns       * 360 + base,
    (turns + 1) * 360 + base,
  ];
  const snapped = cands.reduce((a, b) =>
    Math.abs(a - rot) < Math.abs(b - rot) ? a : b
  );
  return { idx, snapped };
}

// ─── component ────────────────────────────────────────────────────────────────
export function MobileNavWheel() {
  const [rotation,  setRotation]  = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [snapping,  setSnapping]  = useState(false);

  const wheelRef   = useRef<HTMLDivElement>(null);
  const rotRef     = useRef(0);      // always-current rotation (avoids stale closures)
  const dragging   = useRef(false);
  const lastAngle  = useRef(0);

  // angle of a pointer (clientX, clientY) relative to wheel center
  const getAngle = (cx: number, cy: number): number => {
    if (!wheelRef.current) return 0;
    const r = wheelRef.current.getBoundingClientRect();
    return Math.atan2(cy - (r.top + HALF), cx - (r.left + HALF)) * (180 / Math.PI);
  };

  // commit snap: animate to nearest section, then scroll
  const commitSnap = useCallback((currentRot: number) => {
    const { idx, snapped } = nearestSnap(currentRot);
    rotRef.current = snapped;
    setRotation(snapped);
    setActiveIdx(idx);
    setSnapping(true);
    setTimeout(() => setSnapping(false), 560);
    const el = document.getElementById(SECTIONS[idx].id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // ── touch events ──────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    dragging.current = true;
    setSnapping(false);
    lastAngle.current = getAngle(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const a = getAngle(e.touches[0].clientX, e.touches[0].clientY);
    let d = a - lastAngle.current;
    if (d >  180) d -= 360;
    if (d < -180) d += 360;
    lastAngle.current = a;
    rotRef.current += d;
    const next = rotRef.current;
    setRotation(next);
    setActiveIdx(activeFromRot(next));
  };

  const onTouchEnd = () => {
    dragging.current = false;
    commitSnap(rotRef.current);
  };

  // ── mouse events (for desktop preview / testing) ──────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    setSnapping(false);
    lastAngle.current = getAngle(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const a = getAngle(e.clientX, e.clientY);
    let d = a - lastAngle.current;
    if (d >  180) d -= 360;
    if (d < -180) d += 360;
    lastAngle.current = a;
    rotRef.current += d;
    const next = rotRef.current;
    setRotation(next);
    setActiveIdx(activeFromRot(next));
  };

  const onMouseUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    commitSnap(rotRef.current);
  };

  // ── spring transition string ───────────────────────────────────────────────
  const snapTransition = 'transform 0.56s cubic-bezier(0.34,1.18,0.64,1)';

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Title */}
      <span className="font-mono text-[7px] tracking-[0.45em] text-text-muted uppercase">
        &#9670; Navigate Dossier &#9670;
      </span>

      {/* Pointer */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-0 h-0
            border-l-[7px] border-l-transparent
            border-r-[7px] border-r-transparent
            border-t-[12px] border-t-accent-amber
            drop-shadow-[0_0_6px_rgba(212,168,67,0.9)]"
        />
      </div>

      {/* ── Wheel ── */}
      <div
        ref={wheelRef}
        style={{ width: SIZE, height: SIZE }}
        className="relative cursor-grab active:cursor-grabbing touch-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* ── static SVG layer (outer rings + ticks + slot arc + center) ── */}
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* outer ring */}
          <circle cx={HALF} cy={HALF} r={R_OUT}
            fill="none" stroke="rgba(212,168,67,0.2)" strokeWidth="1.5" />

          {/* 36 tick marks */}
          {TICKS.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={`rgba(212,168,67,${t.major ? 0.6 : 0.2})`}
              strokeWidth={t.major ? 1.8 : 0.8}
            />
          ))}

          {/* inner dashed ring */}
          <circle cx={HALF} cy={HALF} r={R_IN}
            fill="none" stroke="rgba(212,168,67,0.12)" strokeWidth="1"
            strokeDasharray="3 5" />

          {/* active-slot amber arc at 12 o'clock */}
          <path d={ARC_PATH} fill="none"
            stroke="rgba(212,168,67,0.85)" strokeWidth="3.5" strokeLinecap="round" />

          {/* glow dot at very top */}
          <circle cx={HALF} cy={4} r="3"
            fill="rgba(212,168,67,0.9)"
            style={{ filter: 'drop-shadow(0 0 4px rgba(212,168,67,0.9))' }} />

          {/* center backdrop */}
          <circle cx={HALF} cy={HALF} r={40}
            fill="rgba(10,10,15,0.97)" stroke="rgba(212,168,67,0.4)" strokeWidth="1.5" />
          {/* center inner ring */}
          <circle cx={HALF} cy={HALF} r={36}
            fill="none" stroke="rgba(212,168,67,0.12)" strokeWidth="1"
            strokeDasharray="2 4" />
        </svg>

        {/* ── rotating layer (section icons) ── */}
        <div
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: snapping ? snapTransition : 'none',
          }}
        >
          {SECTIONS.map(({ id, no, Icon }, i) => {
            const a   = (i / N) * 360;
            const rad = (a * Math.PI) / 180;
            const px  = HALF + ICON_R * Math.sin(rad);
            const py  = HALF - ICON_R * Math.cos(rad);
            const active = i === activeIdx;

            return (
              <div
                key={id}
                style={{
                  position: 'absolute',
                  left: px,
                  top:  py,
                  // counter-rotate so icons always face up
                  transform: `translate(-50%,-50%) rotate(${-rotation}deg)`,
                  transition: snapping ? snapTransition : 'none',
                }}
              >
                <div
                  className={[
                    'w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[3px]',
                    'border transition-all duration-300',
                    active
                      ? 'border-accent-amber bg-accent-amber/15 scale-[1.18]'
                      : 'border-white/10 bg-bg-primary/70 scale-100',
                  ].join(' ')}
                  style={active ? {
                    boxShadow: '0 0 18px rgba(212,168,67,0.7), inset 0 0 8px rgba(212,168,67,0.15)',
                  } : undefined}
                >
                  <Icon
                    size={14}
                    className={active ? 'text-accent-amber' : 'text-text-muted/40'}
                  />
                  <span
                    className={[
                      'font-mono leading-none tracking-wider',
                      active ? 'text-accent-amber' : 'text-text-muted/35',
                    ].join(' ')}
                    style={{ fontSize: '5.5px' }}
                  >
                    {no}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── static center display ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-[5px]">
            <motion.div
              key={`ci-${activeIdx}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.22 }}
            >
              {(() => { const { Icon } = SECTIONS[activeIdx]; return <Icon size={18} className="text-accent-amber" />; })()}
            </motion.div>
            <motion.span
              key={`cl-${activeIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-accent-amber uppercase text-center leading-none"
              style={{ fontSize: '6.5px', letterSpacing: '0.2em' }}
            >
              {SECTIONS[activeIdx].label}
            </motion.span>
          </div>
        </div>

        {/* center flash on section change */}
        <motion.div
          key={`flash-${activeIdx}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(212,168,67,0.18) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Footer hint */}
      <motion.span
        animate={{ opacity: [0.3, 0.75, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.8 }}
        className="font-mono text-[6.5px] tracking-[0.4em] text-text-muted uppercase"
      >
        spin &#8635; release to enter
      </motion.span>
    </div>
  );
}
