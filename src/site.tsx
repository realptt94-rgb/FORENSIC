import { useEffect, useState, type FormEvent } from "react";
import {
  CountUp,
  Marquee,
  Reveal,
  Scramble,
  useReducedMotion,
  useToast,
} from "./lib/fx";
import {
  IconArrow,
  IconFlag,
  IconLock,
  IconPulse,
  IconSeal,
  IconSerp,
  IconTrace,
  IconUpRight,
} from "./lib/icons";

/* ================================================================
   TOPBAR
================================================================ */

const NAV = [
  ["#services", "Services"],
  ["#outcomes", "Outcomes"],
  ["#process", "Process"],
  ["#technology", "Technology"],
  ["#corporate", "Corporate"],
  ["#contact", "Contact"],
] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border border-signal/60 bg-deep font-display text-[13px] font-bold tracking-widest text-signal transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(53,242,162,0.25)]">
        HTS
      </span>
      <span className="leading-tight">
        <strong className="block font-display text-[13px] font-bold tracking-[0.08em] text-ink">
          FORENSIC INTELLIGENCE
        </strong>
        {!compact && (
          <small className="mt-0.5 block font-mono text-[9.5px] tracking-[0.14em] text-dim">
            SECUTOR PRO LLC · DELAWARE, USA
          </small>
        )}
      </span>
    </a>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-abyss/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%-40px))] items-center gap-7">
        <Brand />
        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="navlink text-[13px] font-medium">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 lg:ml-7">
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-fog xl:flex">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
            SYSTEMS NOMINAL
          </span>
          <a href="#/crm" className="btn btn-line btn-sm">
            <IconLock className="h-3.5 w-3.5" />
            CLIENT CRM
          </a>
        </div>
      </div>
      <div className="border-t border-line/50 lg:hidden">
        <div className="mx-auto flex w-[min(1180px,calc(100%-26px))] gap-5 overflow-x-auto py-2.5 [scrollbar-width:none]">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap font-mono text-[11px] tracking-[0.12em] text-fog"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ================================================================
   HERO + LIVE CONSOLE
================================================================ */

const FEED_LINES = [
  "tracing HTS-DEL-3240873 … entity graph resolved",
  "funds-flow: 14 nodes mapped · 3 flags raised",
  "SERP exposure 72 → 23 · delta −48 pts",
  "related-party loop detected · BVI cluster",
  "evidence matrix v0.9 · chain-of-custody verified",
  "jurisdiction sweep: KY / CAY / CH complete",
  "variance €2.4M escalated to pressure-test queue",
  "delisting batch 2/3 approved · 6 of 14 URLs",
];

function lineTone(line: string) {
  return /flag|loop|variance/i.test(line) ? "text-amber" : "text-signal/80";
}

function TerminalFeed() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<string[]>(() => FEED_LINES.slice(0, 4));
  useEffect(() => {
    if (reduced) return;
    let i = 4;
    const id = window.setInterval(() => {
      setLines((prev) => [...prev.slice(-3), FEED_LINES[i % FEED_LINES.length]]);
      i += 1;
    }, 2100);
    return () => window.clearInterval(id);
  }, [reduced]);
  return (
    <div className="flex h-[132px] flex-col justify-end gap-1 overflow-hidden font-mono text-[11px] leading-relaxed">
      {lines.map((l, idx) => (
        <p key={`${l}-${idx}`} className={`truncate ${lineTone(l)}`}>
          <span className="mr-2 text-dim">▸</span>
          {l}
        </p>
      ))}
      <p className="text-signal">
        <span className="mr-2 text-dim">▸</span>
        <span className="cursor-blink">█</span>
      </p>
    </div>
  );
}

function HoloCore() {
  return (
    <svg
      viewBox="0 0 120 190"
      className="floaty h-[172px] w-auto"
      style={{ filter: "drop-shadow(0 0 14px rgba(53,242,162,0.5))" }}
      aria-hidden="true"
    >
      <circle cx="60" cy="36" r="27" fill="rgba(53,242,162,0.06)" stroke="#35f2a2" strokeWidth="2" />
      <path
        d="M12 182c0-42 21-66 48-66s48 24 48 66"
        fill="rgba(53,242,162,0.05)"
        stroke="#35f2a2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M60 70v10" stroke="#35f2a2" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <circle cx="60" cy="36" r="10" fill="none" stroke="#35f2a2" strokeWidth="1" opacity=".45" />
    </svg>
  );
}

function Hero() {
  const toast = useToast();
  return (
    <section id="home" className="pb-16 pt-14 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
              Forensic Intelligence · M&amp;A · Reputation
            </p>
          </Reveal>
          <h1 className="mt-6 font-display text-[clamp(44px,6.4vw,84px)] font-bold leading-[0.98] tracking-[-0.045em] text-ink">
            <Scramble text="Follow the Money." duration={900} />
            <br />
            <span className="text-signal">
              <Scramble text="Control the Narrative." delay={420} duration={1000} />
            </span>
          </h1>
          <Reveal delay={120}>
            <p className="mt-7 max-w-[620px] text-[17.5px] leading-relaxed text-fog">
              Forensic Financial Intelligence and Digital Reputation Defense for law
              firms, investors, executives and high-risk clients — delivered as
              decision-ready evidence, not decks of suspicion.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <a href="#contact" className="btn btn-primary">
                Request Confidential Review
                <IconArrow className="h-4 w-4" />
              </a>
              <a href="#outcomes" className="btn btn-ghost">
                View Case Studies
              </a>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-12 grid max-w-[560px] grid-cols-3 gap-6">
              {[
                ["48h", "Red Flag Review turnaround"],
                ["Cross-Border", "Financial intelligence"],
                ["Evidence-Driven", "Traceable findings"],
              ].map(([v, l]) => (
                <div key={v} className="border-t border-edge/70 pt-4">
                  <b className="block font-display text-[19px] font-bold text-ink">{v}</b>
                  <span className="mt-1 block font-mono text-[10px] tracking-[0.12em] text-dim">
                    {l.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* live console */}
        <Reveal delay={180}>
          <aside className="relative overflow-hidden rounded-xl border border-signal/20 bg-gradient-to-b from-[#0f271e] to-[#06130e] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <i className="absolute left-2.5 top-2.5 z-10 h-4 w-4 border-l border-t border-signal/60" />
            <i className="absolute right-2.5 top-2.5 z-10 h-4 w-4 border-r border-t border-signal/60" />
            <i className="absolute bottom-2.5 left-2.5 z-10 h-4 w-4 border-b border-l border-signal/60" />
            <i className="absolute bottom-2.5 right-2.5 z-10 h-4 w-4 border-b border-r border-signal/60" />

            <div className="flex items-center justify-between border-b border-line/70 px-5 py-3.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-fog">
                AI HOLOGRAM BRIEFING
              </span>
              <span className="rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-amber">
                COMING SOON
              </span>
            </div>

            <div className="relative grid h-[280px] place-items-center overflow-hidden">
              <span className="holo-ring absolute h-[264px] w-[264px] rounded-full border border-signal/25" />
              <span
                className="holo-ring absolute h-[196px] w-[196px] rounded-full border border-signal/30"
                style={{ animationDelay: "0.8s" }}
              />
              <span
                className="holo-ring absolute h-[132px] w-[132px] rounded-full border border-signal/35"
                style={{ animationDelay: "1.6s" }}
              />
              <span className="scanline absolute left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent" />
              <HoloCore />
            </div>

            <div className="border-t border-line/70 bg-black/35 px-5 py-4">
              <TerminalFeed />
            </div>

            <div className="border-t border-line/70 px-5 py-4">
              <p className="text-[12.5px] leading-relaxed text-fog">
                Your future AI briefing assistant will explain methodology, findings and
                case strategy in real time — grounded in the same evidence graph our
                analysts use.
              </p>
              <button
                type="button"
                onClick={() =>
                  toast("Launch notification module will be connected in Phase 2.")
                }
                className="btn btn-line btn-sm mt-3.5 w-full"
              >
                <IconPulse className="h-3.5 w-3.5" />
                Notify me at launch
              </button>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   EVIDENCE TICKER
================================================================ */

const TICKER = [
  "FUNDS TRACE · CAYMAN → DELAWARE",
  "14 ENTITIES MAPPED · 3 FLAGS",
  "RELATED-PARTY LOOP DETECTED",
  "SERP EXPOSURE 72 → 23",
  "MLAT CHANNEL OPENED",
  "€2.4M VARIANCE ESCALATED",
  "DELISTING 6/14 APPROVED",
  "EXHIBIT K-114 LOGGED",
  "COUNTERPARTY INTEGRITY: PASS",
  "PRESSURE-TEST QUEUE: 3 MATTERS",
];

function EvidenceTicker() {
  return (
    <div className="border-y border-line/70 bg-deep/70">
      <Marquee duration={46} className="py-3.5">
        {TICKER.map((t) => (
          <span key={t} className="flex items-center">
            <span className="font-mono text-[11px] tracking-[0.18em] text-fog">{t}</span>
            <span className="mx-7 inline-block h-1.5 w-1.5 rotate-45 bg-signal/50" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ================================================================
   SERVICES
================================================================ */

function FundsFlowMini() {
  return (
    <svg viewBox="0 0 340 120" className="h-[110px] w-full" aria-hidden="true">
      <line x1="52" y1="60" x2="150" y2="28" className="flow-line" stroke="rgba(53,242,162,0.5)" strokeWidth="1.4" />
      <line x1="52" y1="60" x2="150" y2="60" className="flow-line" stroke="rgba(53,242,162,0.5)" strokeWidth="1.4" />
      <line x1="52" y1="60" x2="150" y2="92" className="flow-line" stroke="rgba(53,242,162,0.5)" strokeWidth="1.4" />
      <line x1="150" y1="28" x2="268" y2="44" className="flow-line" stroke="rgba(53,242,162,0.35)" strokeWidth="1.2" />
      <line x1="150" y1="92" x2="268" y2="84" className="flow-hot" stroke="rgba(255,92,105,0.65)" strokeWidth="1.4" />
      {[
        [52, 60, "SRC"],
        [150, 28, "CAY"],
        [150, 60, "DEL"],
        [150, 92, "BVI"],
        [268, 44, "CHE"],
        [268, 84, "??? "],
      ].map(([x, y, l]) => (
        <g key={String(l)}>
          <circle cx={Number(x)} cy={Number(y)} r="13" fill="#0a1b15" stroke={l === "??? " ? "rgba(255,92,105,0.7)" : "rgba(53,242,162,0.55)"} strokeWidth="1.3" />
          <circle cx={Number(x)} cy={Number(y)} r="3" fill={l === "??? " ? "#ff5c69" : "#35f2a2"} />
          <text x={Number(x)} y={Number(y) + 27} textAnchor="middle" fontSize="8.5" fontFamily="IBM Plex Mono, monospace" fill="#677e73" letterSpacing="1.5">
            {String(l).trim()}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SerpMini() {
  const rows: [string, number, string][] = [
    ["GOOGLE", 92, "−62%"],
    ["BING", 64, "−38%"],
    ["IMAGES", 47, "−41%"],
  ];
  return (
    <div className="space-y-3.5">
      {rows.map(([label, w, delta], i) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-16 font-mono text-[10px] tracking-[0.14em] text-dim">{label}</span>
          <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-raise">
            <div
              className="bar-grow h-full rounded-full bg-gradient-to-r from-moss to-signal"
              style={{ width: `${w}%`, ["--bar-delay" as string]: `${i * 140}ms` }}
            />
          </div>
          <span className="font-mono text-[11px] font-medium text-signal">{delta}</span>
        </div>
      ))}
    </div>
  );
}

const SERVICE_A = [
  "Funds-flow tracing & transaction mapping",
  "M&A red-flag & pre-acquisition reviews",
  "Fraud indicators & anomaly analysis",
  "Related-party & corporate network mapping",
  "Cross-border entity intelligence",
];

const SERVICE_B = [
  "SERP exposure audits & search-risk mapping",
  "Delisting & lawful removal workflows",
  "Image and URL monitoring",
  "Defensive SEO / GEO strategy",
  "Executive & corporate reputation protection",
];

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((li) => (
        <li key={li} className="flex items-start gap-3 text-[14px] leading-relaxed text-fog">
          <svg viewBox="0 0 12 12" className="mt-[7px] h-2 w-2 shrink-0 text-signal" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m2.5 2 5 4-5 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {li}
        </li>
      ))}
    </ul>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <Reveal>
          <div className="mb-12 max-w-[760px]">
            <p className="eyebrow">
              <span className="mr-3 text-dim">[ 01 ]</span>Two flagship capabilities
            </p>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.02] tracking-[-0.03em]">
              Financial forensics, plus digital reputation defense.
            </h2>
            <p className="mt-4 max-w-[600px] text-[15.5px] text-fog">
              One platform. Two disciplines. One objective: identify exposure before it
              becomes damage — and document it so it holds.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.07fr_0.93fr]">
          <Reveal delay={80}>
            <article className="group relative h-full overflow-hidden rounded-xl border border-line bg-gradient-to-b from-panel to-deep p-8 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:p-10">
              <span className="absolute right-6 top-4 font-display text-[64px] font-bold leading-none text-raise select-none">
                01
              </span>
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-signal/25 bg-signal/8 text-signal">
                <IconTrace className="h-6 w-6" />
              </span>
              <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-signal">
                LE COMPTABLE™ · FUNDS &amp; FRAUD
              </p>
              <h3 className="mt-2.5 font-display text-[27px] font-bold tracking-[-0.02em]">
                Forensic Financial Intelligence
              </h3>
              <p className="mt-1 text-[14px] font-semibold text-signal">
                Trace. Verify. Expose.
              </p>
              <div className="my-7">
                <ServiceList items={SERVICE_A} />
              </div>
              <div className="rounded-lg border border-line/80 bg-black/25 p-4">
                <FundsFlowMini />
              </div>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-signal"
              >
                Request a forensic review
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <IconArrow className="h-4 w-4" />
                </span>
              </a>
            </article>
          </Reveal>

          <Reveal delay={180}>
            <article className="group relative h-full overflow-hidden rounded-xl border border-line bg-gradient-to-b from-panel to-deep p-8 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:p-10">
              <span className="absolute right-6 top-4 font-display text-[64px] font-bold leading-none text-raise select-none">
                02
              </span>
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-signal/25 bg-signal/8 text-signal">
                <IconSerp className="h-6 w-6" />
              </span>
              <p className="mt-6 font-mono text-[10px] tracking-[0.22em] text-signal">
                DIGITAL REPUTATION FORENSICS
              </p>
              <h3 className="mt-2.5 font-display text-[27px] font-bold tracking-[-0.02em]">
                Search Risk &amp; Reputation Defense
              </h3>
              <p className="mt-1 text-[14px] font-semibold text-signal">
                Map. Remove. Defend.
              </p>
              <div className="my-7">
                <ServiceList items={SERVICE_B} />
              </div>
              <div className="rounded-lg border border-line/80 bg-black/25 p-4 pt-5">
                <SerpMini />
              </div>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-signal"
              >
                Request a reputation review
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  <IconArrow className="h-4 w-4" />
                </span>
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   OUTCOMES
================================================================ */

function Outcomes() {
  return (
    <section
      id="outcomes"
      className="scroll-mt-24 border-y border-line/70 bg-deep/60 py-20 lg:py-24"
    >
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <Reveal>
          <p className="eyebrow">
            <span className="mr-3 text-dim">[ 02 ]</span>Selected outcomes
          </p>
          <h2 className="mt-4 max-w-[640px] font-display text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.04] tracking-[-0.03em]">
            Decision-grade intelligence, measured.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-12">
          <Reveal delay={0} className="md:col-span-3">
            <div className="border-l-2 border-signal/70 pl-5">
              <strong className="font-display text-[42px] font-bold leading-none text-signal">
                <CountUp to={48} suffix="h" />
              </strong>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">
                Rapid Red Flag Review
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-dim">
                From engagement to decision-ready findings.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90} className="md:col-span-4">
            <div className="border-l-2 border-amber/70 pl-5">
              <strong className="font-display text-[42px] font-bold leading-none text-ink">
                €<CountUp to={22} />M <span className="text-dim">→</span>{" "}
                <span className="text-amber">€<CountUp to={1} /></span>
              </strong>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">
                Transaction repriced after forensic pressure analysis*
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-dim">
                Buyer walked the ask down to a nominal figure once findings landed.
              </p>
            </div>
          </Reveal>
          <Reveal delay={180} className="md:col-span-3">
            <div className="border-l-2 border-signal/70 pl-5">
              <strong className="font-display text-[42px] font-bold leading-none text-ink">
                <CountUp to={8} /> yrs <span className="text-dim">→</span>{" "}
                <span className="text-signal">
                  <CountUp to={3} /> mo
                </span>
              </strong>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">
                Measurable search-removal progress*
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-dim">
                A legacy exposure that had resisted eight years of informal requests.
              </p>
            </div>
          </Reveal>
          <Reveal delay={270} className="md:col-span-2">
            <div className="border-l-2 border-teal pl-5">
              <strong className="font-display text-[42px] font-bold leading-none text-signal">
                <CountUp to={17} />
              </strong>
              <p className="mt-3 text-[13.5px] font-semibold text-ink">
                Jurisdictions in one engagement graph
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-dim">
                Financial, corporate and reputation intelligence, cross-border.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-12 max-w-[720px] text-[11px] leading-relaxed text-dim">
            *Case outcomes are fact-specific and do not guarantee future results.
            Supporting documentation is available subject to confidentiality constraints
            and client privilege.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   PROCESS — sticky two-column
================================================================ */

const STEPS = [
  {
    n: "01",
    t: "Detect",
    d: "Anomalies, exposures and high-risk signals identified across financial records, registries, filings and the open web.",
  },
  {
    n: "02",
    t: "Map",
    d: "Entities, transactions, counterparties and digital footprints reconstructed into a single evidence graph.",
  },
  {
    n: "03",
    t: "Pressure-Test",
    d: "Assumptions challenged. Verified facts separated from indicators before anything reaches the report.",
  },
  {
    n: "04",
    t: "Deliver",
    d: "A decision-ready evidence matrix, risk map and recommended next actions — built for counsel and capital.",
  },
];

function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">
              <span className="mr-3 text-dim">[ 03 ]</span>How engagements run
            </p>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.02] tracking-[-0.03em]">
              Detect. Map.
              <br />
              Pressure-test. <span className="text-signal">Deliver.</span>
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-fog">
              Every matter moves through the same four gates. Nothing ships until it has
              survived the third one — that discipline is why our findings survive
              cross-examination, boardrooms and regulators.
            </p>
            <p className="mt-7 inline-flex items-center gap-2.5 rounded-md border border-line bg-panel px-3.5 py-2 font-mono text-[10px] tracking-[0.18em] text-fog">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
              METHODOLOGY v3.2 · TYPICAL ENGAGEMENT 2–6 WEEKS
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <span className="absolute bottom-6 left-[7px] top-6 hidden w-px bg-gradient-to-b from-signal/50 via-edge to-transparent sm:block" />
          <div className="space-y-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="group relative rounded-lg border border-line bg-panel/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/40 hover:bg-panel sm:ml-9">
                  <span className="absolute -left-9 top-7 hidden h-[15px] w-[15px] rounded-full border-2 border-signal bg-abyss transition-colors duration-300 group-hover:bg-signal sm:block" />
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] tracking-[0.2em] text-signal">
                      {s.n}
                    </span>
                    <h4 className="font-display text-[24px] font-bold tracking-[-0.02em]">
                      {s.t}
                    </h4>
                  </div>
                  <p className="mt-2.5 pl-0 text-[13.5px] leading-relaxed text-fog sm:pl-9">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TECHNOLOGY CONSOLE
================================================================ */

function FundsFlowNetwork() {
  const nodes: [number, number, string, boolean][] = [
    [280, 160, "TARGET", false],
    [104, 66, "CAY-014", false],
    [452, 58, "BVI-77", true],
    [84, 248, "DEL-324", false],
    [468, 246, "CHE-19", false],
    [280, 34, "UK-208", false],
  ];
  const edges: [number, number, boolean][] = [
    [0, 1, false],
    [0, 3, false],
    [0, 4, false],
    [0, 5, false],
    [1, 2, true],
  ];
  return (
    <svg viewBox="0 0 560 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {edges.map(([a, b, hot], i) => {
        const [x1, y1] = [nodes[a][0], nodes[a][1]];
        const [x2, y2] = [nodes[b][0], nodes[b][1]];
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className={hot ? "flow-hot" : "flow-line"}
            stroke={hot ? "rgba(255,92,105,0.7)" : "rgba(53,242,162,0.4)"}
            strokeWidth={hot ? 1.8 : 1.3}
          />
        );
      })}
      {nodes.map(([x, y, label, hot]) => (
        <g key={label}>
          {label === "TARGET" && (
            <circle cx={x} cy={y} r="34" fill="none" stroke="rgba(53,242,162,0.25)" strokeWidth="1" className="dot-live" />
          )}
          <circle
            cx={x}
            cy={y}
            r={label === "TARGET" ? 26 : 18}
            fill="#0a1b15"
            stroke={hot ? "rgba(255,92,105,0.75)" : "rgba(53,242,162,0.55)"}
            strokeWidth="1.4"
          />
          <circle cx={x} cy={y} r={label === "TARGET" ? 5 : 3.5} fill={hot ? "#ff5c69" : "#35f2a2"} />
          <text
            x={x}
            y={y + (label === "TARGET" ? 46 : 34)}
            textAnchor="middle"
            fontSize="10"
            fontFamily="IBM Plex Mono, monospace"
            fill={hot ? "#ff8b94" : "#9cb2a8"}
            letterSpacing="1.8"
          >
            {label}
          </text>
        </g>
      ))}
      <text x="368" y="92" fontSize="9" fontFamily="IBM Plex Mono, monospace" fill="#ff8b94" letterSpacing="1.4" transform="rotate(8 368 92)">
        FLAGGED ROUTE
      </text>
    </svg>
  );
}

function RiskMatrix() {
  const cells = [22, 34, 61, 27, 54, 92, 18, 45, 76];
  return (
    <div className="grid h-full grid-cols-3 gap-1.5">
      {cells.map((v) => (
        <span
          key={v}
          className={`grid place-items-center rounded-md font-mono text-[13px] font-medium transition-transform duration-200 hover:scale-[1.06] ${
            v >= 85
              ? "hot-pulse border border-alert/40 bg-alert/15 text-[#ff8b94]"
              : v >= 50
                ? "border border-amber/25 bg-amber/10 text-amber"
                : "border border-line bg-raise text-fog"
          }`}
        >
          {v}
        </span>
      ))}
    </div>
  );
}

function SerpScore() {
  const bars = [92, 74, 61, 38];
  return (
    <div className="flex h-full flex-col">
      <p className="font-display text-[44px] font-bold leading-none text-[#ff8b94]">
        <CountUp to={72} />
        <span className="text-[15px] font-medium text-dim">/100</span>
      </p>
      <p className="mt-1 font-mono text-[9.5px] tracking-[0.16em] text-dim">
        COMPOSITE EXPOSURE · PRE-ENGAGEMENT
      </p>
      <div className="mt-5 space-y-2.5">
        {bars.map((w, i) => (
          <div key={w} className="h-[6px] overflow-hidden rounded-full bg-raise">
            <div
              className="bar-grow h-full rounded-full bg-gradient-to-r from-alert to-amber"
              style={{ width: `${w}%`, ["--bar-delay" as string]: `${i * 120}ms` }}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] tracking-[0.14em] text-dim">
        SERP PAGES 1–4 · 3 ENGINES
      </p>
    </div>
  );
}

function TechConsole() {
  return (
    <section id="technology" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <Reveal>
          <div className="mb-10 max-w-[720px]">
            <p className="eyebrow">
              <span className="mr-3 text-dim">[ 04 ]</span>Proprietary intelligence workflow
            </p>
            <h2 className="mt-4 font-display text-[clamp(30px,3.8vw,48px)] font-bold leading-[1.03] tracking-[-0.03em]">
              Technology built around the investigation.
            </h2>
            <p className="mt-4 text-[15px] text-fog">
              We expose the result, not the recipe — detection logic remains confidential.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-xl border border-line shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between border-b border-line bg-panel px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-alert/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.22em] text-fog">
                HTS CONSOLE · LIVE RENDER
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-signal">
                <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
                FEED OK
              </span>
            </div>

            <div className="grid gap-px bg-line/70 lg:grid-cols-3">
              <div className="bg-deep p-6 lg:col-span-2 lg:row-span-2">
                <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-fog">
                  FUNDS-FLOW NETWORK
                </p>
                <div className="h-[300px] lg:h-[380px]">
                  <FundsFlowNetwork />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[9.5px] tracking-[0.14em] text-dim">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" /> VERIFIED NODE
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-alert" /> FLAGGED ROUTE
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-px w-5 bg-signal/50" /> TRACED EDGE
                  </span>
                </div>
              </div>

              <div className="bg-deep p-6">
                <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-fog">
                  TRANSACTION RISK MATRIX
                </p>
                <RiskMatrix />
                <p className="mt-4 font-mono text-[9px] tracking-[0.14em] text-dim">
                  CELL 92 · AUTO-ESCALATED TO ANALYST
                </p>
              </div>

              <div className="bg-deep p-6">
                <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-fog">
                  SERP EXPOSURE
                </p>
                <SerpScore />
              </div>

              <div className="bg-deep px-6 py-5 lg:col-span-3">
                <div className="flex flex-wrap items-center">
                  <p className="mr-8 font-mono text-[10px] tracking-[0.2em] text-fog">
                    INTELLIGENCE DASHBOARD
                  </p>
                  {(
                    [
                      [12, "OPEN REVIEWS"],
                      [27, "ACTIVE ALERTS"],
                      [17, "JURISDICTIONS"],
                      [248, "DATA SOURCES"],
                    ] as [number, string][]
                  ).map(([v, l], i) => (
                    <span
                      key={l}
                      className={`flex items-baseline gap-2.5 px-6 py-2 first:ml-auto ${
                        i > 0 ? "border-l border-line" : ""
                      }`}
                    >
                      <strong className="font-display text-[22px] font-bold text-signal">
                        <CountUp to={v} duration={1200} />
                      </strong>
                      <span className="font-mono text-[9.5px] tracking-[0.16em] text-dim">
                        {l}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   CORPORATE
================================================================ */

const CORP_FACTS: [string, string][] = [
  ["Jurisdiction", "Delaware, United States"],
  ["Established", "March 2024"],
  ["Delaware File No.", "3240873"],
  ["Registered Office", "16192 Coastal Highway, Lewes, DE 19958, USA"],
  ["Corporate Status", "Delaware franchise tax obligations current as of May 26, 2026"],
];

function Corporate() {
  return (
    <section
      id="corporate"
      className="scroll-mt-24 border-y border-line/70 bg-deep/50 py-20 lg:py-28"
    >
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="mr-3 text-dim">[ 05 ]</span>U.S. corporate presence
            </p>
            <h2 className="mt-4 font-display text-[clamp(34px,4.2vw,54px)] font-bold leading-none tracking-[-0.03em]">
              SECUTOR PRO LLC
            </h2>
            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-fog">
              The U.S. entity supporting forensic intelligence, investigation,
              cybersecurity and digital reputation assignments — a deliberate,
              verifiable footprint for engagements that may end up in court.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <dl className="mt-9">
              {CORP_FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="group grid grid-cols-1 gap-1 border-b border-line/70 py-4 transition-colors sm:grid-cols-[190px_1fr] sm:gap-4"
                >
                  <dt className="font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
                    {k}
                  </dt>
                  <dd className="m-0 text-[13.5px] text-fog transition-colors group-hover:text-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative overflow-hidden rounded-xl border border-signal/20 bg-gradient-to-b from-panel to-deep p-8">
            <span className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-signal/5 blur-2xl" />
            <div className="flex items-center justify-between">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-signal/25 bg-signal/8 text-signal">
                <IconSeal className="h-6 w-6" />
              </span>
              <span className="flex items-center gap-2.5 rounded-full border border-line bg-deep px-3 py-1.5 text-signal">
                <IconFlag className="h-4 w-6" />
                <span className="font-mono text-[9.5px] tracking-[0.18em] text-fog">
                  DELAWARE · USA
                </span>
              </span>
            </div>
            <h3 className="mt-6 font-display text-[26px] font-bold leading-tight tracking-[-0.02em]">
              U.S. Forensic Intelligence Platform
            </h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-fog">
              Built for law firms, investors, business buyers, executives and
              organizations facing complex financial or reputational exposure.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Financial Forensics", "Investigation", "Cybersecurity", "Digital Reputation"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-signal/20 bg-signal/5 px-3 py-1.5 text-[11px] font-medium text-fog transition-colors hover:border-signal/50 hover:text-ink"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
            <p className="mt-7 flex items-center gap-2.5 border-t border-line/70 pt-5 font-mono text-[9.5px] tracking-[0.16em] text-signal/90">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
              ENTITY STATUS: ACTIVE — GOOD STANDING
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   AUDIENCE WIRE
================================================================ */

const AUDIENCE = [
  "LAW FIRMS",
  "INVESTORS",
  "FAMILY OFFICES",
  "BUSINESS BUYERS",
  "EXECUTIVES",
  "REPUTATION COUNSEL",
  "SELLERS & TARGETS",
];

function AudienceWire() {
  return (
    <div className="border-b border-line/70 py-7">
      <Marquee duration={32} reverse>
        {AUDIENCE.map((a) => (
          <span key={a} className="flex items-center">
            <span className="cursor-default px-8 font-display text-[26px] font-bold tracking-[-0.02em] text-dim transition-colors duration-300 hover:text-signal">
              {a}
            </span>
            <svg viewBox="0 0 10 10" className="h-2 w-2 text-edge" fill="currentColor" aria-hidden="true">
              <rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" />
            </svg>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ================================================================
   CONTACT
================================================================ */

function Contact() {
  const toast = useToast();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSent(true);
    toast("Demo form only — secure backend will be connected in Phase 2.", "warn");
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="mr-3 text-dim">[ 06 ]</span>Confidential inquiry
            </p>
            <h2 className="mt-4 font-display text-[clamp(32px,4vw,50px)] font-bold leading-[1.03] tracking-[-0.03em]">
              Tell us what you are facing.
            </h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-fog">
              Initial requests are reviewed discreetly by a senior analyst. Do not include
              highly sensitive credentials or banking information in the first message.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 space-y-5">
              {(
                [
                  ["< 24 H", "Initial response window"],
                  ["WORLDWIDE", "Engagement coverage"],
                  ["PRIVILEGE-AWARE", "Intake handling"],
                ] as [string, string][]
              ).map(([v, l]) => (
                <div key={l} className="border-l-2 border-signal/40 pl-4">
                  <b className="block font-mono text-[13px] tracking-[0.12em] text-signal">
                    {v}
                  </b>
                  <span className="text-[12px] text-dim">{l}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 border-l-2 border-signal bg-signal/5 p-4 text-[12.5px] leading-relaxed text-fog">
              Client CRM is included in this MVP. Secure document vault, MFA and an
              external client portal are planned for the hardened production deployment.
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-line bg-panel/90 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.4)] lg:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-[20px] font-bold tracking-[-0.01em]">
                Secure intake
              </h3>
              <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] text-dim">
                <IconLock className="h-3.5 w-3.5 text-signal" /> TLS IN PRODUCTION
              </span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input required type="text" placeholder="Full name" className="field" />
              <input required type="email" placeholder="Email" className="field" />
            </div>
            <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
              <input type="text" placeholder="Organization" className="field" />
              <select className="field" defaultValue="">
                <option value="" disabled>
                  Service interest
                </option>
                <option>Forensic Financial Intelligence</option>
                <option>M&A Red Flag Review</option>
                <option>Digital Reputation Forensics</option>
                <option>Cross-Border Investigation</option>
              </select>
            </div>
            <textarea
              required
              rows={6}
              placeholder="Briefly describe the matter — parties, jurisdictions, what is at stake."
              className="field mt-3.5 resize-y"
            />
            <button type="submit" className="btn btn-primary mt-5 w-full">
              Submit Confidentially
              <IconUpRight className="h-4 w-4" />
            </button>
            <p
              className={`mt-4 text-center font-mono text-[10.5px] tracking-[0.14em] transition-opacity duration-500 ${
                sent ? "text-signal opacity-100" : "opacity-0"
              }`}
              role="status"
            >
              INTAKE LOGGED — DEMO ONLY, NO DATA TRANSMITTED
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
================================================================ */

function Footer() {
  return (
    <footer className="border-t border-line/80 bg-[#040a07] pb-8 pt-12">
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-[420px]">
            <Brand compact />
            <p className="mt-4 text-[12.5px] leading-relaxed text-dim">
              Operated in the United States by SECUTOR PRO LLC · Delaware. Forensic
              intelligence for matters where the numbers and the narrative must both hold.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="mb-3.5 font-mono text-[10px] tracking-[0.2em] text-dim">
                NAVIGATE
              </p>
              <div className="flex flex-col gap-2.5">
                {[
                  ["#services", "Services"],
                  ["#outcomes", "Case Studies"],
                  ["#technology", "Technology"],
                  ["#contact", "Contact"],
                ].map(([h, l]) => (
                  <a key={h} href={h} className="navlink w-fit text-[12.5px] text-fog">
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3.5 font-mono text-[10px] tracking-[0.2em] text-dim">FIRM</p>
              <div className="flex flex-col gap-2.5">
                <a href="#corporate" className="navlink w-fit text-[12.5px] text-fog">
                  Corporate
                </a>
                <a href="#/crm" className="navlink w-fit text-[12.5px] text-fog">
                  Client CRM
                </a>
                <a href="#home" className="navlink w-fit text-[12.5px] text-fog">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-line/60 pt-6">
          <p className="text-[10.5px] leading-relaxed text-dim">
            HTS Forensic Intelligence provides investigative, forensic intelligence and
            due-diligence services. Services do not constitute a statutory financial
            audit, CPA attestation, legal opinion, tax advice or investment advice.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.14em] text-dim">
              © 2026 SECUTOR PRO LLC · HTS FORENSIC INTELLIGENCE
            </p>
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-dim">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
              LEWES, DELAWARE · FILE NO. 3240873
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   SITE
================================================================ */

export default function Site() {
  return (
    <div className="relative">
      <TopBar />
      <main>
        <Hero />
        <EvidenceTicker />
        <Services />
        <Outcomes />
        <Process />
        <TechConsole />
        <Corporate />
        <AudienceWire />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
