// Flat illustrations so the page has no external image dependencies.

const BLACK = "#16181b";
const STEEL = "#2c3035";

// K-shaped gaming table: black top, carbon edge, RGB strip, K-frame legs.
export function KDesk({ accent = "#e5484d" }) {
  const leg = (x, flip) => {
    const d = flip ? -1 : 1;
    return (
      <g stroke={BLACK} strokeWidth="7" strokeLinecap="round" fill="none">
        <line x1={x} y1="92" x2={x} y2="146" />
        <line x1={x} y1="118" x2={x + 18 * d} y2="94" />
        <line x1={x} y1="118" x2={x + 18 * d} y2="146" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="34" y="40" width="44" height="30" rx="3" fill={BLACK} />
      <rect x="84" y="34" width="72" height="38" rx="3" fill={BLACK} />
      <rect x="88" y="38" width="64" height="30" rx="2" fill={accent} opacity=".25" />
      <rect x="162" y="40" width="44" height="30" rx="3" fill={BLACK} />
      <rect x="116" y="72" width="8" height="8" fill={BLACK} />
      <rect x="22" y="80" width="196" height="12" rx="3" fill={STEEL} />
      <rect x="22" y="90" width="196" height="3" rx="1.5" fill={accent} />
      <rect x="96" y="76" width="48" height="4" rx="2" fill="#3a3f45" />
      {leg(42, false)}
      {leg(198, true)}
    </svg>
  );
}

// Black ergonomic chair: mesh back, headrest, lumbar, armrests, 5-star base.
export function ErgoChair({ accent = "#e5484d" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="100" y="6" width="40" height="14" rx="6" fill={BLACK} />
      <rect x="117" y="18" width="6" height="8" fill={STEEL} />
      <path d="M96 26 h48 q6 0 6 8 l-4 50 q-1 8 -8 8 h-36 q-7 0 -8 -8 l-4 -50 q0 -8 6 -8 z" fill={BLACK} />
      <path d="M102 32 h36 l-3 46 h-30 z" fill="#2a2e33" />
      <g stroke="#3b4047" strokeWidth="1">
        <line x1="108" y1="34" x2="108" y2="76" /><line x1="116" y1="34" x2="116" y2="76" />
        <line x1="124" y1="34" x2="124" y2="76" /><line x1="132" y1="34" x2="132" y2="76" />
      </g>
      <rect x="104" y="64" width="32" height="6" rx="3" fill={accent} opacity=".85" />
      <rect x="88" y="92" width="64" height="14" rx="7" fill={BLACK} />
      <path d="M86 70 v18 h10" stroke={STEEL} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M154 70 v18 h-10" stroke={STEEL} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="80" y="66" width="14" height="5" rx="2.5" fill={BLACK} />
      <rect x="146" y="66" width="14" height="5" rx="2.5" fill={BLACK} />
      <rect x="116" y="106" width="8" height="24" fill="#4a5058" />
      <g stroke={BLACK} strokeWidth="6" strokeLinecap="round">
        <line x1="120" y1="132" x2="82" y2="142" /><line x1="120" y1="132" x2="158" y2="142" />
        <line x1="120" y1="132" x2="100" y2="146" /><line x1="120" y1="132" x2="140" y2="146" />
      </g>
      <circle cx="80" cy="148" r="5" fill={STEEL} /><circle cx="160" cy="148" r="5" fill={STEEL} />
      <circle cx="98" cy="152" r="5" fill={STEEL} /><circle cx="142" cy="152" r="5" fill={STEEL} />
    </svg>
  );
}

// Executive office desk with drawer pedestal.
export function ExecDesk({ color = "#6b4f36" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="24" y="64" width="192" height="12" rx="3" fill={color} />
      <rect x="32" y="76" width="56" height="66" rx="3" fill={color} filter="brightness(0.85)" />
      <line x1="38" y1="98" x2="82" y2="98" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
      <line x1="38" y1="120" x2="82" y2="120" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
      <rect x="54" y="84" width="12" height="3" rx="1.5" fill="#d9c08e" />
      <rect x="54" y="106" width="12" height="3" rx="1.5" fill="#d9c08e" />
      <rect x="54" y="128" width="12" height="3" rx="1.5" fill="#d9c08e" />
      <rect x="200" y="76" width="8" height="66" fill={color} filter="brightness(0.85)" />
      <rect x="120" y="32" width="54" height="32" rx="3" fill={BLACK} />
      <rect x="143" y="62" width="8" height="3" fill={BLACK} />
    </svg>
  );
}

// Open-plan workstation cluster with privacy screens.
export function Workstation() {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="20" y="40" width="200" height="34" rx="4" fill="#c9ccd1" />
      <line x1="120" y1="40" x2="120" y2="74" stroke="#9ea3aa" strokeWidth="3" />
      <rect x="16" y="74" width="208" height="10" rx="3" fill="#f2f2f0" stroke="#d5d6d3" />
      <rect x="44" y="52" width="40" height="22" rx="2" fill={BLACK} />
      <rect x="156" y="52" width="40" height="22" rx="2" fill={BLACK} />
      <g fill={STEEL}>
        <rect x="26" y="84" width="6" height="56" /><rect x="117" y="84" width="6" height="56" />
        <rect x="208" y="84" width="6" height="56" />
      </g>
      <rect x="20" y="136" width="200" height="5" rx="2" fill={STEEL} />
    </svg>
  );
}

// Conference / meeting table with chairs.
export function Conference({ color = "#3a2e26" }) {
  const chair = (x) => (
    <g key={x}>
      <rect x={x} y="44" width="22" height="30" rx="6" fill={BLACK} />
      <rect x={x + 9} y="74" width="4" height="10" fill={STEEL} />
    </g>
  );
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      {[40, 80, 120, 160].map(chair)}
      <rect x="20" y="84" width="200" height="14" rx="7" fill={color} />
      <rect x="60" y="98" width="14" height="46" fill={STEEL} />
      <rect x="166" y="98" width="14" height="46" fill={STEEL} />
      <rect x="50" y="140" width="34" height="6" rx="3" fill={STEEL} />
      <rect x="156" y="140" width="34" height="6" rx="3" fill={STEEL} />
    </svg>
  );
}

// Filing / storage cabinet.
export function Storage() {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="80" y="20" width="80" height="128" rx="4" fill="#2a2e33" />
      {[24, 66, 108].map((y) => (
        <g key={y}>
          <rect x="86" y={y} width="68" height="36" rx="3" fill="#353a40" />
          <rect x="108" y={y + 15} width="24" height="5" rx="2.5" fill="#9ea3aa" />
        </g>
      ))}
      <rect x="84" y="148" width="8" height="6" fill={BLACK} />
      <rect x="148" y="148" width="8" height="6" fill={BLACK} />
    </svg>
  );
}
