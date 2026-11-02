import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

interface SeleneMotionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

type StageTab = 'earthrise' | 'reel' | 'trajectory';
type LayerName = 'sky' | 'earth' | 'moonscape' | 'frame' | 'astronaut' | 'ground';

const LAYER_ASSETS: Record<LayerName, { d: string; m: string }> = {
  sky: {
    d: '/assets/aistudio/sky_ce4acdcd.webp',
    m: '/assets/aistudio/sky_13e37e08.webp',
  },
  earth: {
    d: '/assets/aistudio/earth_9013015e.webp',
    m: '/assets/aistudio/earth_c5978740.webp',
  },
  moonscape: {
    d: '/assets/aistudio/moonscape_ff49af52.webp',
    m: '/assets/aistudio/moonscape_2c50adbd.webp',
  },
  frame: {
    d: '/assets/aistudio/frame_3aa184e7.webp',
    m: '/assets/aistudio/frame_86909287.webp',
  },
  astronaut: {
    d: '/assets/aistudio/astronaut_30fbddd3.webp',
    m: '/assets/aistudio/astronaut_d27e9524.webp',
  },
  ground: {
    d: '/assets/aistudio/ground_67d6ab7c.webp',
    m: '/assets/aistudio/ground_db935ed3.webp',
  },
};

const LOG_CARDS = [
  {
    tag: 'T−0',
    title: 'Launch',
    body: 'Nine minutes of thunder, then silence and the curve of the Earth.',
    image: '/assets/aistudio/m1-launch_f3d0250c.webp',
  },
  {
    tag: 'Day 3',
    title: 'Lunar orbit',
    body: 'The far side scrolls past the window. Your hand on the glass.',
    image: '/assets/aistudio/m2-orbit_334b2462.webp',
  },
  {
    tag: 'Day 4',
    title: 'Base Tranquillity',
    body: 'Pressurised domes, a hot meal, and a skylight pointed home.',
    image: '/assets/aistudio/m3-base_8ccfaa75.webp',
  },
  {
    tag: 'Day 5',
    title: 'First steps',
    body: 'Footprints that will outlast every building you have ever seen.',
    image: '/assets/aistudio/m4-walk_515206c3.webp',
  },
];

const EARTH = { cx: 230, cy: 320, r: 92 };
const MOON = { cx: 985, cy: 300, r: 46 };
const LEGS = [
  `M${EARTH.cx} ${EARTH.cy - 128} a128 128 0 1 1 -0.1 0 a128 128 0 0 1 106 57`,
  `M${EARTH.cx + 106} ${EARTH.cy - 71} C 520 40, 820 70, ${MOON.cx - 20} ${MOON.cy - 84}`,
  `M${MOON.cx - 20} ${MOON.cy - 84} a86 86 0 1 1 -0.1 0.2 a86 86 0 0 1 20 1`,
  `M${MOON.cx} ${MOON.cy - 86} Q ${MOON.cx + 40} ${MOON.cy - 70} ${MOON.cx + 30} ${MOON.cy - 36}`,
];

const TRAJECTORY_LEGS_META = [
  {
    day: 'Day 0',
    title: 'Parking orbit',
    body: 'Two laps of the Earth while the crew and craft are checked.',
  },
  {
    day: 'Day 0',
    title: 'Trans-lunar injection',
    body: 'A six-minute burn and you are on your way. No turning back for three days.',
  },
  {
    day: 'Day 3',
    title: 'Lunar orbit insertion',
    body: 'The engine fires behind the Moon, out of contact with Earth. Then: capture.',
  },
  {
    day: 'Day 4',
    title: 'Descent',
    body: 'Twelve minutes from orbit to the dust of Tranquillity.',
  },
];

export const SeleneMotionPreviewModal: React.FC<SeleneMotionPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeStage, setActiveStage] = useState<StageTab>('earthrise');
  const [progress, setProgress] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Refs for Earthrise 6-layer stage
  const layerRefs = useRef<Partial<Record<LayerName, HTMLDivElement>>>({});
  const veilRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const elevRef = useRef<HTMLSpanElement>(null);

  // Refs for Trajectory SVG stage
  const legRefs = useRef<SVGPathElement[]>([]);
  const capsuleRef = useRef<SVGGElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const [activeLegIndex, setActiveLegIndex] = useState(0);

  // Auto-play loop
  useEffect(() => {
    if (!isOpen || !isAutoPlaying) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setProgress((prev) => {
        const next = prev + dt * 0.14;
        if (next >= 1) {
          setIsAutoPlaying(false);
          return 1;
        }
        return next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, isAutoPlaying]);

  // Apply SELENE exact math on progress change
  useEffect(() => {
    if (!isOpen) return;
    const p = progress;

    if (activeStage === 'earthrise') {
      const set = (name: LayerName, y: number, scale = 1, opacity = 1) => {
        const el = layerRefs.current[name];
        if (!el) return;
        el.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
      };

      const veil = 1 - range(p, 0, 0.18);
      const exit = range(p, 0.7, 1);
      const settle = easeOutCubic(range(p, 0, 0.5));

      if (veilRef.current) {
        veilRef.current.style.opacity = String(veil);
        veilRef.current.style.transform = `translate3d(0, ${-range(p, 0, 0.18) * 24}%, 0) scale(${
          1 + range(p, 0, 0.18) * 0.25
        })`;
      }

      set('sky', lerp(0, -6, p), lerp(1.14, 1, settle));
      const rise = easeOutCubic(range(p, 0.04, 0.5));
      set('earth', lerp(34, 0, rise) - exit * 12, lerp(0.92, 1, rise));
      set('moonscape', lerp(9, 0, settle) - exit * 26);
      const rim = easeOutCubic(range(p, 0.28, 0.58));
      set('frame', -exit * 44, lerp(1.6, 1, rim), rim);
      const up = easeOutCubic(range(p, 0.36, 0.62));
      set('astronaut', lerp(28, 0, up) - exit * 58, 1, clamp(up * 2));
      const ground = easeOutCubic(range(p, 0.34, 0.6));
      set('ground', lerp(36, 0, ground) - exit * 78);

      const tIn = easeOutCubic(range(p, 0.08, 0.24));
      const tOut = range(p, 0.42, 0.52);
      if (titleRef.current) {
        titleRef.current.style.opacity = String(tIn * (1 - tOut));
        titleRef.current.style.letterSpacing = `${lerp(0.6, 0.24, tIn)}em`;
        titleRef.current.style.transform = `translate3d(0, ${-p * 6}%, 0)`;
        titleRef.current.style.filter =
          tIn < 0.99 ? `blur(${(1 - tIn) * 10}px)` : '';
      }

      if (hudRef.current) {
        hudRef.current.style.opacity = String(
          range(p, 0.02, 0.1) * (1 - range(p, 0.62, 0.72))
        );
      }
      const secs = p * 5400;
      if (clockRef.current) {
        clockRef.current.textContent = `T+ ${String(
          Math.floor(secs / 3600)
        ).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(
          2,
          '0'
        )}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;
      }
      if (elevRef.current) {
        elevRef.current.textContent = `${(rise * 12.4).toFixed(1)}°`;
      }
    } else if (activeStage === 'trajectory') {
      const u = range(p, 0.06, 0.92) * LEGS.length;
      const s = clamp(Math.floor(u), 0, LEGS.length - 1);
      setActiveLegIndex(s);
      legRefs.current.forEach((path, i) => {
        if (!path) return;
        const k = easeOutCubic(clamp(u - i));
        path.style.strokeDashoffset = String(1 - k);
        if (i === s && capsuleRef.current) {
          const pt = path.getPointAtLength(path.getTotalLength() * k);
          capsuleRef.current.setAttribute(
            'transform',
            `translate(${pt.x} ${pt.y})`
          );
        }
      });
      const coast = easeOutCubic(clamp(u - 1));
      if (kmRef.current) {
        kmRef.current.textContent = Math.round(coast * 384400).toLocaleString(
          'en-US'
        );
      }
    }
  }, [isOpen, progress, activeStage]);

  if (!isOpen) return null;

  const handleWheelScrub = (e: React.WheelEvent) => {
    e.preventDefault();
    setIsAutoPlaying(false);
    setProgress((prev) => clamp(prev + e.deltaY * 0.0006, 0, 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xs p-4">
      <div className="bg-[#05070c] border border-slate-800 rounded-lg max-w-6xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6fb6ff]">
              SELENE Motion Engine Sandbox
            </span>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-md border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveStage('earthrise');
                  setProgress(0.28);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeStage === 'earthrise'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                01. 6-Plane Earthrise Parallax
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveStage('reel');
                  setProgress(0.35);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeStage === 'reel'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                02. Horizontal Focal Reel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveStage('trajectory');
                  setProgress(0.45);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeStage === 'trajectory'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                03. Scroll-Inked SVG Trajectory
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Stage Viewport (Wheel or Slider Driven) */}
        <div
          onWheel={handleWheelScrub}
          className="relative flex-1 min-h-[480px] sm:min-h-[540px] bg-[#05070c] overflow-hidden select-none"
        >
          {activeStage === 'earthrise' && (
            <div className="relative w-full h-[540px] overflow-hidden bg-[#05070c]">
              {(['sky', 'earth', 'moonscape'] as LayerName[]).map((name) => (
                <div
                  key={name}
                  ref={(el) => {
                    if (el) layerRefs.current[name] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <img
                    src={LAYER_ASSETS[name].d}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              ))}

              {/* Tracked Mid-Plane Hero Title */}
              <div
                ref={titleRef}
                className="pointer-events-none absolute inset-x-0 top-[28%] text-center"
                style={{ opacity: 0 }}
              >
                <h2
                  className="font-bold text-3xl sm:text-6xl text-white uppercase tracking-[0.24em]"
                  style={{
                    textShadow: '0 4px 40px rgba(0,0,0,0.65)',
                    marginRight: '-0.24em',
                  }}
                >
                  EARTHRISE
                </h2>
                <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-[#c9ccd3]/80 uppercase">
                  A concept for lunar expeditions
                </p>
              </div>

              {(['frame', 'astronaut', 'ground'] as LayerName[]).map((name) => (
                <div
                  key={name}
                  ref={(el) => {
                    if (el) layerRefs.current[name] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <img
                    src={LAYER_ASSETS[name].d}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {name === 'ground' && (
                    <div className="absolute inset-x-0 top-full h-[110%] bg-[#05070c]" />
                  )}
                </div>
              ))}

              {/* Cosmic Dust Veil */}
              <div
                ref={veilRef}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(60% 50% at 30% 40%, rgba(170,184,210,0.55), transparent 70%), radial-gradient(50% 60% at 75% 60%, rgba(120,140,180,0.5), transparent 70%), radial-gradient(80% 80% at 50% 50%, rgba(20,26,40,0.85), rgba(5,7,12,0.95))',
                }}
              >
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#c9ccd3]/80 uppercase">
                    A concept for lunar expeditions
                  </p>
                  <p className="mt-3 text-xs tracking-[0.45em] text-white/90 uppercase font-semibold">
                    Scroll or scrub below to clear the dust ↓
                  </p>
                </div>
              </div>

              {/* Telemetry HUD */}
              <div
                ref={hudRef}
                className="pointer-events-none absolute inset-5 font-mono text-[11px] tracking-[0.14em] text-[#c9ccd3]/80 uppercase"
              >
                <div className="absolute top-3 left-3 space-y-1">
                  <p ref={clockRef} className="text-white tabular-nums">
                    T+ 00:00:00
                  </p>
                  <p className="text-[#c9ccd3]/50">Mission clock</p>
                </div>
                <div className="absolute top-3 right-3 space-y-1 text-right">
                  <p>
                    Earth elev{' '}
                    <span ref={elevRef} className="text-[#6fb6ff] tabular-nums">
                      0.0°
                    </span>
                  </p>
                  <p className="text-[#c9ccd3]/50">Above horizon</p>
                </div>
                <div className="absolute bottom-3 left-3">
                  Mare Tranquillitatis · 0.67°N 23.47°E
                </div>
              </div>
            </div>
          )}

          {activeStage === 'reel' && (
            <div className="relative w-full h-[540px] flex flex-col md:flex-row items-center px-6 py-8 gap-8 bg-[#05070c]">
              <div className="md:w-1/3 shrink-0 space-y-3">
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#6fb6ff] uppercase">
                  Mission log · Focal-Line Reel
                </p>
                <h3 className="text-2xl font-bold text-white">
                  The first holiday that leaves the planet.
                </h3>
                <p className="text-xs text-[#c9ccd3]/70 leading-relaxed">
                  As you scroll, the reel slides horizontally while the frame nearest the optical focus line scales up to 100% and inner images counter-pan.
                </p>
              </div>

              <div className="flex-1 overflow-hidden">
                <div
                  className="flex gap-5 transition-transform duration-75"
                  style={{
                    transform: `translate3d(${-range(progress, 0.04, 0.96) * 520}px, 0, 0)`,
                  }}
                >
                  {LOG_CARDS.map((card, i) => {
                    const cardProgressCenter = i / (LOG_CARDS.length - 1);
                    const dist = Math.abs(progress - cardProgressCenter);
                    const dim = clamp(dist * 1.4);
                    return (
                      <div
                        key={card.title}
                        className="w-56 shrink-0 transition-opacity"
                        style={{
                          opacity: 1 - dim * 0.55,
                          transform: `scale(${1 - dim * 0.08})`,
                        }}
                      >
                        <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-slate-900 border border-white/10">
                          <img
                            src={card.image}
                            alt={card.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            style={{
                              transform: `translate3d(${(progress - cardProgressCenter) * -35}px, 0, 0) scale(1.15)`,
                            }}
                          />
                          <span className="absolute top-2.5 left-2.5 rounded bg-black/70 px-2 py-0.5 font-mono text-[10px] tracking-widest text-white uppercase">
                            {card.tag}
                          </span>
                        </div>
                        <div className="mt-3 flex gap-3">
                          <span className="font-mono text-xs text-[#6fb6ff]">
                            0{i + 1}
                          </span>
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-white">
                              {card.title}
                            </div>
                            <p className="text-[11px] text-[#c9ccd3]/65 mt-1 leading-relaxed">
                              {card.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeStage === 'trajectory' && (
            <div className="relative w-full h-[540px] flex flex-col justify-between px-8 py-6 bg-[#05070c]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#6fb6ff] uppercase">
                    Trajectory · Scroll-Inked SVG
                  </p>
                  <h3 className="text-xl font-bold text-white mt-1">
                    384,400 km, drawn as you scroll.
                  </h3>
                </div>
                <p className="font-mono text-xs tracking-wider text-[#c9ccd3]/70 uppercase">
                  Distance flown{' '}
                  <span ref={kmRef} className="text-white font-bold tabular-nums">
                    0
                  </span>{' '}
                  km
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-0">
                <svg
                  viewBox="0 0 1200 600"
                  className="w-full max-h-[340px]"
                  role="img"
                  aria-label="Earth to Moon trajectory"
                >
                  <defs>
                    <radialGradient id="preview-moon-shade" cx="35%" cy="35%" r="75%">
                      <stop offset="0" stopColor="#e4e6ea" />
                      <stop offset="0.7" stopColor="#8b909b" />
                      <stop offset="1" stopColor="#2a2e36" />
                    </radialGradient>
                    <radialGradient id="preview-earth-glow">
                      <stop offset="0.6" stopColor="#6fb6ff" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#6fb6ff" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle
                    cx={EARTH.cx}
                    cy={EARTH.cy}
                    r={EARTH.r * 1.18}
                    fill="url(#preview-earth-glow)"
                  />
                  <circle
                    cx={EARTH.cx}
                    cy={EARTH.cy}
                    r={EARTH.r}
                    fill="#1d4ed8"
                    stroke="#6fb6ff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={MOON.cx}
                    cy={MOON.cy}
                    r={MOON.r}
                    fill="url(#preview-moon-shade)"
                  />

                  {LEGS.map((d, i) => (
                    <path
                      key={`ghost-${i}`}
                      d={d}
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.1"
                      strokeWidth="1.5"
                      strokeDasharray="3 6"
                    />
                  ))}
                  {LEGS.map((d, i) => (
                    <path
                      key={`ink-${i}`}
                      ref={(el) => {
                        if (el) legRefs.current[i] = el;
                      }}
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke={i === 1 ? '#6fb6ff' : '#f2e6c9'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1 1"
                      strokeDashoffset="1"
                    />
                  ))}

                  <g
                    ref={capsuleRef}
                    transform={`translate(${EARTH.cx} ${EARTH.cy - 128})`}
                  >
                    <circle r="12" fill="#6fb6ff" opacity="0.3" />
                    <circle r="5" fill="#ffffff" />
                  </g>
                </svg>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-6">
                <div className="font-mono text-xs text-[#6fb6ff] uppercase">
                  {TRAJECTORY_LEGS_META[activeLegIndex].day} · Leg{' '}
                  {activeLegIndex + 1}/4
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white uppercase tracking-wider">
                    {TRAJECTORY_LEGS_META[activeLegIndex].title}
                  </div>
                  <p className="text-xs text-[#c9ccd3]/70 mt-0.5">
                    {TRAJECTORY_LEGS_META[activeLegIndex].body}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Scroll Progress Scrubber */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (progress >= 0.99) setProgress(0);
              setIsAutoPlaying((v) => !v);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Scroll</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Scroll Stage</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsAutoPlaying(false);
              setProgress(0);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset (p = 0.00)</span>
          </button>

          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
              pinProgress (p):
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.002}
              value={progress}
              onChange={(e) => {
                setIsAutoPlaying(false);
                setProgress(parseFloat(e.target.value));
              }}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-semibold text-white tabular-nums w-12 text-right">
              {progress.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
