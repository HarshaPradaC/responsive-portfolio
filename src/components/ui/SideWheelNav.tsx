/**
 * SideWheelNav — mobile cipher-wheel section navigator.
 *
 * Each wheel centre sits exactly at the bottom-left / bottom-right
 * corner of the hero (overflow-hidden clips the rest).
 * Only a quarter-circle arc is visible in each corner.
 *
 *  ┌────────────────────────────────────────┐
 *  │          hero content                  │
 *  │                                        │
 *  │◜         [ COVER  File 00  ● ]        ◝│  ← bottom corners
 *  └────────────────────────────────────────┘
 *
 * Maths:
 *  Left  wheel slot = 45°  (NE diagonal of left  wheel)
 *  Right wheel slot = 315° (NW diagonal of right wheel)
 *  Both slots always show the same active section because:
 *    right cssRot = rotation + 270° satisfies the synchrony condition.
 *  INIT = 45° → Hero (section 0) at both slots on load.
 */

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome, FiUser, FiCpu, FiBriefcase,
  FiFileText, FiAward, FiMail,
} from 'react-icons/fi';

// ─── config ───────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero',         label: 'COVER',    no: '00', Icon: FiHome      },
  { id: 'about',        label: 'PROFILE',  no: '01', Icon: FiUser      },
  { id: 'skills',       label: 'MANIFEST', no: '02', Icon: FiCpu       },
  { id: 'experience',   label: 'OPS LOG',  no: '03', Icon: FiBriefcase },
  { id: 'projects',     label: 'PATENTS',  no: '04', Icon: FiFileText  },
  { id: 'achievements', label: 'COMMENDS', no: '05', Icon: FiAward     },
  { id: 'contact',      label: 'CHANNEL',  no: '06', Icon: FiMail      },
];

const N      = SECTIONS.length;
const STEP   = 360 / N;              // ≈ 51.43°
const SIZE   = 240;                  // wheel diameter (px)
const HALF   = SIZE / 2;             // 120
const ICON_R = 85;                   // icon orbit radius
// slot diagonal: 45° for left wheel (NE), 315° for right wheel (NW)
const SIN45  = Math.SQRT2 / 2;
const COS45  = Math.SQRT2 / 2;
// element-local slot coords (static, used for guide line + dot)
const SL = { x: HALF + ICON_R * SIN45, y: HALF - ICON_R * COS45 }; // left  ≈ (180, 60)
const SR = { x: HALF - ICON_R * SIN45, y: HALF - ICON_R * COS45 }; // right ≈ ( 60, 60)

const INIT   = 45;                   // rotation where Hero is at both slots
const SNAP_T = 'transform 0.56s cubic-bezier(0.34,1.18,0.64,1)';

// ─── pre-computed tick marks ───────────────────────────────────────────────────
const TICKS = Array.from({ length: 48 }, (_, i) => {
  const a   = (i / 48) * 2 * Math.PI;
  const maj = i % 12 === 0;
  const r1  = HALF - 4;
  const r2  = maj ? HALF - 18 : HALF - 10;
  return {
    x1: HALF + r1 * Math.sin(a), y1: HALF - r1 * Math.cos(a),
    x2: HALF + r2 * Math.sin(a), y2: HALF - r2 * Math.cos(a),
    maj,
  };
});

// ─── helpers ──────────────────────────────────────────────────────────────────
function getIdx(rot: number): number {
  // section at left-wheel slot (45°)
  const raw = (45 - rot) / STEP;
  return Math.round(((raw % N) + N) % N) % N;
}

function snapTo(rot: number): { idx: number; snapped: number } {
  const idx    = getIdx(rot);
  const base   = 45 - idx * STEP;
  const turns  = Math.round((rot - base) / 360);
  return { idx, snapped: base + turns * 360 };
}

// ─── single wheel ─────────────────────────────────────────────────────────────
interface WheelProps {
  cssRot:    number;
  activeIdx: number;
  snapping:  boolean;
  slotCoord: { x: number; y: number };
  onStart:  (y: number) => void;
  onMove:   (y: number, sign: number) => void;
  onEnd:    () => void;
  sign:     number;
}

function Wheel({
  cssRot, activeIdx, snapping, slotCoord,
  onStart, onMove, onEnd, sign,
}: WheelProps) {
  return (
    <div
      style={{ width: SIZE, height: SIZE, position: 'relative', flexShrink: 0 }}
      className="cursor-grab active:cursor-grabbing touch-none select-none"
      onTouchStart={e => { e.preventDefault(); onStart(e.touches[0].clientY); }}
      onTouchMove={e  => { e.preventDefault(); onMove(e.touches[0].clientY, sign); }}
      onTouchEnd={onEnd}
      onMouseDown={e  => onStart(e.clientY)}
      onMouseMove={e  => { if (e.buttons > 0) onMove(e.clientY, sign); }}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
    >
      {/* ── ambient corner glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${sign > 0 ? '100% 100%' : '0% 100%'}, rgba(212,168,67,0.08) 0%, transparent 65%)`,
        }}
      />

      {/* ── static SVG: rings, ticks, guide line, slot dot ── */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Outer ring */}
        <circle cx={HALF} cy={HALF} r={HALF - 4}
          fill="none" stroke="rgba(212,168,67,0.25)" strokeWidth="1.5" />

        {/* Tick marks */}
        {TICKS.map((t, i) => (
          <line key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={`rgba(212,168,67,${t.maj ? 0.65 : 0.18})`}
            strokeWidth={t.maj ? 2 : 0.8}
          />
        ))}

        {/* Inner dashed ring */}
        <circle cx={HALF} cy={HALF} r={HALF - 36}
          fill="none" stroke="rgba(212,168,67,0.1)" strokeWidth="1" strokeDasharray="4 6" />

        {/* Diagonal guide line: corner → slot */}
        <line
          x1={HALF} y1={HALF}
          x2={slotCoord.x} y2={slotCoord.y}
          stroke="rgba(212,168,67,0.35)" strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Slot dot (glowing amber circle) */}
        <circle
          cx={slotCoord.x} cy={slotCoord.y} r={5}
          fill="rgba(212,168,67,0.95)"
          style={{ filter: 'drop-shadow(0 0 6px rgba(212,168,67,0.9))' }}
        />

        {/* Solid centre disc — masks icon trails in the centre area */}
        <circle cx={HALF} cy={HALF} r={28}
          fill="rgba(10,10,15,0.98)" />
      </svg>

      {/* ── rotating layer ── */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(${cssRot}deg)`,
          transition: snapping ? SNAP_T : 'none',
        }}
      >
        {SECTIONS.map(({ id, no, Icon }, i) => {
          const rad    = (i * STEP) * (Math.PI / 180);
          const px     = HALF + ICON_R * Math.sin(rad);
          const py     = HALF - ICON_R * Math.cos(rad);
          const active = i === activeIdx;
          return (
            <div
              key={id}
              style={{
                position: 'absolute', left: px, top: py,
                transform: `translate(-50%,-50%) rotate(${-cssRot}deg)`,
                transition: snapping ? SNAP_T : 'none',
              }}
            >
              <div
                className={[
                  'w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[3px]',
                  'border transition-all duration-300',
                  active
                    ? 'border-accent-amber bg-accent-amber/18 scale-[1.22]'
                    : 'border-white/8 bg-bg-primary/55',
                ].join(' ')}
                style={active ? {
                  boxShadow: '0 0 22px rgba(212,168,67,0.9), inset 0 0 10px rgba(212,168,67,0.15)',
                } : undefined}
              >
                <Icon size={13} className={active ? 'text-accent-amber' : 'text-white/20'} />
                <span
                  className={active ? 'text-accent-amber' : 'text-white/18'}
                  style={{ fontFamily: 'monospace', fontSize: '5px', letterSpacing: '0.1em' }}
                >
                  {no}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── edge-fade mask: dims icons near the two straight quadrant edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          // fade toward the two straight edges of the visible quadrant
          background: [
            `linear-gradient(to ${sign > 0 ? 'right' : 'left'}, rgba(10,10,15,0.9) 0%, transparent 35%)`,
            `linear-gradient(to bottom, transparent 35%, rgba(10,10,15,0.9) 100%)`,
          ].join(', '),
        }}
      />
    </div>
  );
}

// ─── main component ────────────────────────────────────────────────────────────
export function SideWheelNav() {
  const [rotation,  setRotation]  = useState(INIT);
  const [activeIdx, setActiveIdx] = useState(0);
  const [snapping,  setSnapping]  = useState(false);
  const [lit,       setLit]       = useState(true);

  const rotRef   = useRef(INIT);
  const dragging = useRef(false);
  const lastY    = useRef(0);

  const onStart = useCallback((y: number) => {
    dragging.current = true;
    lastY.current    = y;
    setSnapping(false);
    setLit(false);
  }, []);

  const onMove = useCallback((y: number, sign: number) => {
    if (!dragging.current) return;
    const d = y - lastY.current;
    lastY.current = y;
    rotRef.current += d * sign;
    const next = rotRef.current;
    setRotation(next);
    setActiveIdx(getIdx(next));
  }, []);

  const onEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const { idx, snapped } = snapTo(rotRef.current);
    rotRef.current = snapped;
    setRotation(snapped);
    setActiveIdx(idx);
    setSnapping(true);
    setLit(true);
    setTimeout(() => setSnapping(false), 580);
    document.getElementById(SECTIONS[idx].id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const { Icon: ActiveIcon } = SECTIONS[activeIdx];

  return (
    <div className="absolute inset-0 sm:hidden overflow-hidden pointer-events-none z-10">

      {/* ════ LEFT WHEEL — centre at bottom-left corner ════ */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: 0, bottom: 0,
          transform: 'translate(-50%, 50%)',   // puts centre exactly at BL corner
          zIndex: 11,
        }}
      >
        <Wheel
          cssRot={rotation}
          activeIdx={activeIdx}
          snapping={snapping}
          slotCoord={SL}
          sign={1}
          onStart={onStart}
          onMove={onMove}
          onEnd={onEnd}
        />
      </div>

      {/* ════ RIGHT WHEEL — centre at bottom-right corner ════ */}
      <div
        className="absolute pointer-events-auto"
        style={{
          right: 0, bottom: 0,
          transform: 'translate(50%, 50%)',    // puts centre exactly at BR corner
          zIndex: 11,
        }}
      >
        <Wheel
          cssRot={rotation + 270}              // +270° synchronises both slots
          activeIdx={activeIdx}
          snapping={snapping}
          slotCoord={SR}
          sign={-1}
          onStart={onStart}
          onMove={onMove}
          onEnd={onEnd}
        />
      </div>

      {/* ════ CENTER-BOTTOM INDICATOR ════ */}
      {/* y-aligned with the slot height: HALF - ICON_R*cos45 ≈ 60px from bottom */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: Math.round(HALF - ICON_R * COS45),
          left:   '50%',
          transform: 'translate(-50%, 50%)',
          zIndex: 12,
        }}
      >
        <motion.div
          className="flex items-center gap-3 px-4 py-2 border border-accent-amber/40 bg-bg-primary/96"
          animate={lit
            ? { boxShadow: ['0 0 0px rgba(212,168,67,0)', '0 0 28px rgba(212,168,67,0.55)', '0 0 12px rgba(212,168,67,0.25)'] }
            : { boxShadow: '0 0 4px rgba(212,168,67,0.12)' }
          }
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div
            key={`icon-${activeIdx}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ActiveIcon size={15} className="text-accent-amber" />
          </motion.div>

          {/* Label + file no */}
          <div className="flex flex-col gap-[2px]">
            <motion.span
              key={`label-${activeIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="font-mono uppercase leading-none text-accent-amber"
              style={{ fontSize: '9px', letterSpacing: '0.28em' }}
            >
              {SECTIONS[activeIdx].label}
            </motion.span>
            <span
              className="font-mono text-text-muted uppercase leading-none"
              style={{ fontSize: '6.5px', letterSpacing: '0.18em' }}
            >
              File {SECTIONS[activeIdx].no}
            </span>
          </div>

          {/* Pulse dot */}
          <motion.div
            key={`dot-${activeIdx}-${lit}`}
            animate={lit ? { opacity: [1, 0.2, 1, 0.2, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 1.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
            className="w-1.5 h-1.5 rounded-full bg-accent-amber"
            style={{ boxShadow: '0 0 6px rgba(212,168,67,0.9)', flexShrink: 0 }}
          />
        </motion.div>

        <motion.p
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="font-mono text-text-muted uppercase text-center mt-1.5"
          style={{ fontSize: '6px', letterSpacing: '0.38em' }}
        >
          spin &#8635; release to enter
        </motion.p>
      </div>
    </div>
  );
}
