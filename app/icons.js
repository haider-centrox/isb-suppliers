const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

const paths = {
  chair: <><path d="M8 3h8v8H8z" /><path d="M6 13h12" /><path d="M12 13v5" /><path d="M8 21l4-3 4 3" /></>,
  it: <><rect x="3" y="4" width="13" height="10" rx="1.5" /><path d="M8 18h3M9.5 14v4" /><rect x="18" y="6" width="3" height="12" rx="1" /></>,
  tv: <><rect x="2.5" y="5" width="19" height="12" rx="1.5" /><path d="M8 20h8" /></>,
  appliance: <><rect x="5" y="2.5" width="14" height="19" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6h2" /></>,
  office: <><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  truck: <><path d="M2 6h12v10H2z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
  handshake: <><path d="M3 12l4-4 5 2 5-2 4 4" /><path d="M7 8v5l4 4 2-1 4-4V8" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" /></>,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
};

export default function Icon({ name, size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...s}>
      {paths[name]}
    </svg>
  );
}
