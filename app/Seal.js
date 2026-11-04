// Certificate-style rosette seal used on the registrations badges.
// Generic design (abbreviation + ring text), not an official emblem.

function rosette(cx, cy, rOuter, rInner, points) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    d += `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return d + "Z";
}

const EDGE = rosette(60, 60, 57, 52, 36);
const RING_R = 38;
const RING_LEN = 2 * Math.PI * RING_R;

export default function Seal({ abbr, ring, color, accent }) {
  const id = `seal-${abbr.replace(/\W/g, "")}`;
  const text = `${ring} ${ring} `.toUpperCase();
  return (
    <svg viewBox="0 0 120 120" className="seal" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <linearGradient id={`${id}-e`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <path id={`${id}-p`} d={`M60,${60 - RING_R} a${RING_R},${RING_R} 0 1,1 -0.01,0`} />
      </defs>
      <path d={EDGE} fill={`url(#${id}-e)`} />
      <circle cx="60" cy="60" r="49" fill="#fff" />
      <circle cx="60" cy="60" r="46.5" fill="none" stroke={color} strokeWidth="1.2" />
      <text fontSize="6.6" fontWeight="700" fill={color} fontFamily="Inter, sans-serif">
        <textPath href={`#${id}-p`} textLength={RING_LEN - 4} lengthAdjust="spacing">{text}</textPath>
      </text>
      <circle cx="60" cy="60" r="31" fill={`url(#${id}-g)`} />
      <circle cx="60" cy="60" r="28" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth=".8" />
      <text x="60" y="60" textAnchor="middle" fill="#fff" fontFamily="Fraunces, Georgia, serif"
        fontWeight="700" fontSize="14" letterSpacing=".5">{abbr}</text>
      <path d="M52.5 68 l5 4.2 l10 -9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
