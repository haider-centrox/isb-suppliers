// Simple flat illustrations so the page has no external image dependencies.

export function Sofa({ color = "#c8a46e" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="30" y="50" width="180" height="60" rx="18" fill={color} />
      <rect x="18" y="80" width="40" height="50" rx="14" fill={color} filter="brightness(0.9)" />
      <rect x="182" y="80" width="40" height="50" rx="14" fill={color} filter="brightness(0.9)" />
      <rect x="50" y="96" width="140" height="34" rx="10" fill={color} filter="brightness(1.08)" />
      <line x1="120" y1="98" x2="120" y2="128" stroke="rgba(0,0,0,.12)" strokeWidth="2" />
      <rect x="40" y="130" width="8" height="16" rx="2" fill="#5b4632" />
      <rect x="192" y="130" width="8" height="16" rx="2" fill="#5b4632" />
    </svg>
  );
}

export function Armchair({ color = "#7d8f7a" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="75" y="30" width="90" height="80" rx="22" fill={color} />
      <rect x="58" y="78" width="30" height="52" rx="12" fill={color} filter="brightness(0.88)" />
      <rect x="152" y="78" width="30" height="52" rx="12" fill={color} filter="brightness(0.88)" />
      <rect x="84" y="96" width="72" height="34" rx="10" fill={color} filter="brightness(1.1)" />
      <line x1="76" y1="130" x2="68" y2="150" stroke="#5b4632" strokeWidth="5" strokeLinecap="round" />
      <line x1="164" y1="130" x2="172" y2="150" stroke="#5b4632" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Bed({ color = "#d9c3a5" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="28" y="40" width="34" height="100" rx="6" fill="#8a6a4a" />
      <rect x="56" y="84" width="160" height="40" rx="8" fill="#efe6d8" />
      <rect x="56" y="74" width="40" height="20" rx="8" fill="#ffffff" />
      <rect x="96" y="80" width="120" height="44" rx="8" fill={color} />
      <rect x="56" y="124" width="166" height="10" rx="3" fill="#8a6a4a" />
      <rect x="210" y="124" width="10" height="20" rx="2" fill="#8a6a4a" />
      <rect x="40" y="134" width="10" height="10" rx="2" fill="#8a6a4a" />
    </svg>
  );
}

export function Dining({ color = "#a87b51" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="40" y="70" width="160" height="12" rx="4" fill={color} />
      <rect x="58" y="82" width="8" height="58" rx="2" fill={color} filter="brightness(0.85)" />
      <rect x="174" y="82" width="8" height="58" rx="2" fill={color} filter="brightness(0.85)" />
      <path d="M100 66 q20 -28 40 0" fill="#7d8f7a" />
      <rect x="116" y="38" width="8" height="18" rx="3" fill="#7d8f7a" />
      <rect x="14" y="40" width="8" height="100" rx="2" fill="#5b4632" />
      <rect x="14" y="94" width="34" height="8" rx="2" fill="#5b4632" />
      <rect x="40" y="100" width="6" height="40" rx="2" fill="#5b4632" />
      <rect x="218" y="40" width="8" height="100" rx="2" fill="#5b4632" />
      <rect x="192" y="94" width="34" height="8" rx="2" fill="#5b4632" />
      <rect x="194" y="100" width="6" height="40" rx="2" fill="#5b4632" />
    </svg>
  );
}

export function Desk({ color = "#c8a46e" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <rect x="30" y="76" width="180" height="10" rx="3" fill={color} />
      <rect x="40" y="86" width="6" height="58" fill="#3b3a36" />
      <rect x="194" y="86" width="6" height="58" fill="#3b3a36" />
      <rect x="140" y="86" width="54" height="34" rx="3" fill={color} filter="brightness(0.88)" />
      <circle cx="167" cy="103" r="2.5" fill="#3b3a36" />
      <rect x="70" y="34" width="62" height="40" rx="4" fill="#1f2a24" />
      <rect x="97" y="72" width="8" height="5" fill="#1f2a24" />
      <path d="M170 74 l-10 -30 l20 -6" stroke="#3b3a36" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M172 38 l14 -4 l2 12 z" fill="#e7b85a" />
    </svg>
  );
}

export function Lamp({ color = "#e7b85a" }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <path d="M90 30 h60 l14 46 h-88 z" fill={color} />
      <rect x="117" y="76" width="6" height="56" fill="#5b4632" />
      <ellipse cx="120" cy="138" rx="30" ry="7" fill="#5b4632" />
      <ellipse cx="120" cy="84" rx="50" ry="10" fill={color} opacity=".18" />
    </svg>
  );
}
