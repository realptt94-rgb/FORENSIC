interface IconProps {
  className?: string;
}

const base = "inline-block shrink-0";

export function IconLock({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={`${base} ${className}`} aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <path d="M12 14.5v2" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrow({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`${base} ${className}`} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`${base} ${className}`} aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function IconX({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`${base} ${className}`} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${base} ${className}`} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconOut({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={`${base} ${className}`} aria-hidden="true">
      <path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7" strokeLinecap="round" />
      <path d="M16 8.5 19.5 12 16 15.5M9.5 12h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Funds-flow / tracing sigil — one source splitting into three trails. */
export function IconTrace({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="4.6" cy="12" r="2.1" />
      <circle cx="19.4" cy="4.8" r="1.9" />
      <circle cx="19.4" cy="12" r="1.9" />
      <circle cx="19.4" cy="19.2" r="1.9" />
      <path d="M6.7 12h10.8M6.5 10.9l11-5.2M6.5 13.1l11 5.2" strokeLinecap="round" />
    </svg>
  );
}

/** Search-risk sigil — magnifier over ranked result bars. */
export function IconSerp({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.6" />
      <path d="M15.6 15.6 21 21" strokeLinecap="round" />
      <path d="M7.4 8.6h6.2M7.4 11.6h4.1" strokeLinecap="round" />
    </svg>
  );
}

/** Delaware entity seal — ringed star. */
export function IconSeal({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" />
      <circle cx="12" cy="12" r="7" strokeDasharray="2.5 2.5" />
      <path d="m12 7.6 1.35 2.75 3 .45-2.2 2.15.55 3.05L12 14.55l-2.7 1.45.55-3.05-2.2-2.15 3-.45L12 7.6Z" strokeLinejoin="round" />
    </svg>
  );
}

/** Simplified U.S. flag plate. */
export function IconFlag({ className = "h-5 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 20" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect x="1" y="1" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 6.3h26M1 10h26M1 13.7h26" stroke="currentColor" strokeWidth="1.1" opacity=".7" />
      <rect x="1" y="1" width="11" height="9" fill="currentColor" opacity=".3" />
      <circle cx="4" cy="3.4" r=".7" fill="currentColor" />
      <circle cx="7" cy="3.4" r=".7" fill="currentColor" />
      <circle cx="10" cy="3.4" r=".7" fill="currentColor" />
      <circle cx="5.5" cy="5.8" r=".7" fill="currentColor" />
      <circle cx="8.5" cy="5.8" r=".7" fill="currentColor" />
    </svg>
  );
}

/** Activity pulse. */
export function IconPulse({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={`${base} ${className}`} aria-hidden="true">
      <path d="M3 12h4l2.5-6 4 12L16 12h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
