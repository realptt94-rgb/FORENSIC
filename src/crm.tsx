import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useToast } from "./lib/fx";
import {
  CLIENT_TYPES,
  DEMO_EMAIL,
  DEMO_PASS,
  PRIORITIES,
  RISKS,
  SERVICES,
  STATUSES,
  clearSession,
  dueInfo,
  fmtDate,
  fmtUsd,
  getSession,
  setSession,
  tryLogin,
  useCrm,
  type Case,
  type Priority,
  type Risk,
  type Session,
  type Task,
} from "./lib/data";
import { IconCheck, IconLock, IconOut, IconPlus, IconPulse, IconX } from "./lib/icons";

type View = "dashboard" | "clients" | "cases" | "tasks" | "notes";
type ModalKind = null | "client" | "case" | "task" | "note";

/* ---------------- badges ---------------- */

const RISK_STYLE: Record<Risk, string> = {
  Low: "border-line bg-raise text-fog",
  Medium: "border-amber/30 bg-amber/10 text-amber",
  High: "border-amber/55 bg-amber/15 text-amber",
  Critical: "border-alert/45 bg-alert/10 text-[#ff8b94]",
};

const STATUS_STYLE: Record<string, string> = {
  Intake: "border-line bg-raise text-fog",
  Active: "border-signal/40 bg-signal/10 text-signal",
  Waiting: "border-amber/35 bg-amber/10 text-amber",
  Review: "border-teal bg-teal/10 text-[#7fd7b4]",
  Closed: "border-line bg-transparent text-dim",
};

const PRIORITY_STYLE: Record<Priority, string> = {
  Normal: "text-dim",
  High: "text-amber",
  Critical: "text-[#ff8b94]",
};

function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] ${RISK_STYLE[risk]}`}
    >
      {risk.toUpperCase()}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] ${STATUS_STYLE[status] ?? STATUS_STYLE.Intake}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

function DueChip({ iso }: { iso: string | null }) {
  const d = dueInfo(iso);
  const tone = {
    ok: "border-signal/30 bg-signal/8 text-signal",
    warn: "border-amber/40 bg-amber/10 text-amber",
    bad: "border-alert/45 bg-alert/10 text-[#ff8b94]",
    dim: "border-line bg-raise text-dim",
  }[d.tone];
  return (
    <span
      className={`inline-block whitespace-nowrap rounded border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] ${tone}`}
    >
      {d.label.toUpperCase()}
    </span>
  );
}

/* ---------------- shared bits ---------------- */

function Panel({
  title,
  meta,
  action,
  children,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-panel/85 shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-3 border-b border-line/70 px-5 py-4">
        <div>
          <h3 className="font-display text-[17px] font-bold tracking-[-0.01em]">{title}</h3>
          {meta && (
            <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.16em] text-dim">{meta}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto p-4">
      <div className="fade-in absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="modal-in relative w-full max-w-[520px] rounded-xl border border-edge bg-deep p-6 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-[20px] font-bold tracking-[-0.01em]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md border border-line text-fog transition-colors hover:border-alert/50 hover:text-alert"
            aria-label="Close dialog"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------------- login ---------------- */

function CrmLogin({ onSuccess }: { onSuccess: (s: Session) => void }) {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryLogin(email, password)) {
      const s = { email: email.trim().toLowerCase() };
      setSession(s);
      toast("Authenticated — secure session established.");
      onSuccess(s);
    } else {
      setError("Invalid credentials. Use the demo access line below.");
      setShakeKey((k) => k + 1);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-5 py-14">
      <div
        key={shakeKey}
        className={`relative w-full max-w-[440px] rounded-xl border border-signal/20 bg-gradient-to-b from-panel to-deep p-8 shadow-[0_36px_110px_rgba(0,0,0,0.55)] ${shakeKey ? "shake" : ""}`}
      >
        <i className="absolute left-2.5 top-2.5 h-4 w-4 border-l border-t border-signal/60" />
        <i className="absolute right-2.5 top-2.5 h-4 w-4 border-r border-t border-signal/60" />
        <i className="absolute bottom-2.5 left-2.5 h-4 w-4 border-b border-l border-signal/60" />
        <i className="absolute bottom-2.5 right-2.5 h-4 w-4 border-b border-r border-signal/60" />

        <a href="#/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-signal/60 bg-deep font-display text-[13px] font-bold tracking-widest text-signal">
            HTS
          </span>
          <span className="leading-tight">
            <strong className="block font-display text-[13px] font-bold tracking-[0.08em]">
              FORENSIC INTELLIGENCE
            </strong>
            <small className="mt-0.5 block font-mono text-[9.5px] tracking-[0.14em] text-dim">
              SECUTOR PRO LLC · CLIENT CRM
            </small>
          </span>
        </a>

        <p className="eyebrow mt-7 flex items-center gap-2.5">
          <IconLock className="h-3.5 w-3.5" /> Secure operations
        </p>
        <h1 className="mt-3 font-display text-[30px] font-bold leading-tight tracking-[-0.02em]">
          Client Intelligence CRM
        </h1>
        <p className="mt-2.5 text-[13px] leading-relaxed text-fog">
          Internal case, client, task and intelligence management. Local MVP — production
          deployment requires TLS, MFA and hardened hosting.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            autoComplete="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
          />
          <button type="submit" className="btn btn-primary w-full">
            Sign in
            <IconLock className="h-3.5 w-3.5" />
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 border-l-2 border-alert bg-alert/8 px-3 py-2 text-[12px] text-[#ff8b94]">
            {error}
          </p>
        )}

        <div className="mt-5 rounded-lg border border-dashed border-edge bg-black/25 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-fog">
              <span className="mb-1 block text-[9px] tracking-[0.2em] text-dim">
                DEMO ACCESS
              </span>
              {DEMO_EMAIL}
              <br />
              {DEMO_PASS}
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail(DEMO_EMAIL);
                setPassword(DEMO_PASS);
                setError("");
              }}
              className="btn btn-line btn-sm"
            >
              Autofill
            </button>
          </div>
        </div>

        <a
          href="#/"
          className="mt-5 inline-flex items-center gap-2 text-[12.5px] font-semibold text-signal transition-colors hover:text-ink"
        >
          ← Back to public website
        </a>
      </div>
    </div>
  );
}

/* ---------------- dashboard ---------------- */

function Dashboard({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state, toggleTask } = store;
  const openCases = state.cases.filter((c) => c.status !== "Closed");
  const highRisk = openCases.filter((c) => c.risk === "High" || c.risk === "Critical");
  const openTasks = state.tasks.filter((t) => !t.done);

  const priority = [...highRisk].sort((a, b) => {
    const w = (r: Risk) => (r === "Critical" ? 1 : 0);
    return w(b.risk) - w(a.risk) || b.value - a.value;
  });

  const next = [...openTasks]
    .sort((a, b) => (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999"))
    .slice(0, 7);

  const clientName = (id: number | null) =>
    state.clients.find((c) => c.id === id)?.name ?? "—";
  const caseTitle = (id: number | null) =>
    state.cases.find((c) => c.id === id)?.title ?? "General";

  const kpis: [string, number, string, string][] = [
    ["ACTIVE CLIENTS", state.clients.length, "Registry synced", "border-l-signal"],
    ["OPEN CASES", openCases.length, "Live portfolio", "border-l-teal"],
    ["HIGH-RISK MATTERS", highRisk.length, "Needs attention", "border-l-alert"],
    ["OPEN TASKS", openTasks.length, "In queue", "border-l-amber"],
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(([label, n, cap, accent]) => (
          <article
            key={label}
            className={`rounded-lg border border-line border-l-2 bg-panel p-5 transition-transform duration-200 hover:-translate-y-0.5 ${accent}`}
          >
            <span className="font-mono text-[9.5px] tracking-[0.2em] text-dim">{label}</span>
            <strong className="mt-2.5 block font-display text-[36px] font-bold leading-none">
              {n}
            </strong>
            <span className="mt-2.5 block font-mono text-[9.5px] tracking-[0.12em] text-fog">
              {cap.toUpperCase()}
            </span>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Priority Cases" meta="LIVE PORTFOLIO · HIGH & CRITICAL">
          {priority.length === 0 ? (
            <p className="flex items-center gap-3 py-6 text-[13px] text-dim">
              <IconPulse className="h-4 w-4 text-signal" />
              No high-risk open matters — portfolio calm.
            </p>
          ) : (
            <ul className="divide-y divide-line/60">
              {priority.map((c) => (
                <li
                  key={c.id}
                  className="group flex items-center gap-4 py-3.5 transition-colors first:pt-0 last:pb-0 hover:bg-raise/40"
                >
                  <RiskBadge risk={c.risk} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold text-ink">{c.title}</p>
                    <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.1em] text-dim">
                      {clientName(c.client_id).toUpperCase()} · {c.service.toUpperCase()}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-[12.5px] font-medium text-signal">
                      {fmtUsd(c.value)}
                    </p>
                    <div className="mt-1">
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Next Actions" meta="OPERATIONAL QUEUE · BY DUE DATE">
          {next.length === 0 ? (
            <p className="flex items-center gap-3 py-6 text-[13px] text-dim">
              <IconCheck className="h-4 w-4 text-signal" />
              Queue clear — every task resolved.
            </p>
          ) : (
            <ul className="divide-y divide-line/60">
              {next.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3.5 py-3 transition-colors first:pt-0 last:pb-0 hover:bg-raise/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(t.id)}
                    aria-label={`Mark "${t.title}" done`}
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-edge text-transparent transition-all hover:border-signal hover:text-signal active:scale-90"
                  >
                    <IconCheck className="h-3 w-3" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-ink">{t.title}</p>
                    <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.08em] text-dim">
                      {caseTitle(t.case_id).toUpperCase()} ·{" "}
                      <span className={PRIORITY_STYLE[t.priority]}>
                        {t.priority.toUpperCase()}
                      </span>
                    </p>
                  </div>
                  <DueChip iso={t.due_date} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <p className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-line/70 bg-deep/70 px-5 py-3.5 font-mono text-[9.5px] tracking-[0.16em] text-dim">
        <span className="flex items-center gap-2 text-signal">
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-signal" />
          REGISTRY INTEGRITY: OK
        </span>
        <span>LAST SYNC: JUST NOW</span>
        <span>
          {state.clients.length + state.cases.length + state.tasks.length + state.notes.length}{" "}
          RECORDS INDEXED
        </span>
      </p>
    </div>
  );
}

/* ---------------- tables ---------------- */

function ClientsView({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state } = store;
  return (
    <Panel
      title="Client Registry"
      meta="LAW FIRMS · INVESTORS · EXECUTIVES · COMPANIES"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-line">
              {["CLIENT", "ORGANIZATION", "EMAIL", "TYPE", "JURISDICTION"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 font-mono text-[9.5px] font-medium tracking-[0.18em] text-dim"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.clients.map((c) => (
              <tr
                key={c.id}
                className="border-b border-line/60 transition-colors last:border-0 hover:bg-raise/50"
              >
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 font-mono text-[9.5px] tracking-[0.08em] text-dim">
                    SINCE {fmtDate(c.created_at).toUpperCase()}
                  </p>
                </td>
                <td className="px-4 py-3.5 text-fog">{c.organization || "—"}</td>
                <td className="px-4 py-3.5 font-mono text-[11.5px] text-fog">{c.email || "—"}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-block rounded border border-line bg-raise px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-fog">
                    {c.client_type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-fog">{c.jurisdiction || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-[9.5px] tracking-[0.16em] text-dim">
        {state.clients.length} RECORDS · ORDERED BY INTAKE
      </p>
    </Panel>
  );
}

function CasesView({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state } = store;
  const clientName = (id: number | null) =>
    state.clients.find((c) => c.id === id)?.name ?? "—";
  return (
    <Panel title="Case Portfolio" meta="FORENSIC & REPUTATION MATTERS">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-line">
              {["CASE", "CLIENT", "SERVICE", "RISK", "STATUS", "VALUE"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 font-mono text-[9.5px] font-medium tracking-[0.18em] text-dim"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.cases.map((c) => (
              <tr
                key={c.id}
                className="border-b border-line/60 transition-colors last:border-0 hover:bg-raise/50"
              >
                <td className="max-w-[260px] px-4 py-3.5">
                  <p
                    className={`truncate font-semibold ${c.status === "Closed" ? "text-dim line-through decoration-line" : "text-ink"}`}
                  >
                    {c.title}
                  </p>
                  {c.summary && (
                    <p className="mt-0.5 truncate text-[11px] text-dim">{c.summary}</p>
                  )}
                </td>
                <td className="px-4 py-3.5 text-fog">{clientName(c.client_id)}</td>
                <td className="px-4 py-3.5 text-[12px] text-fog">{c.service}</td>
                <td className="px-4 py-3.5">
                  <RiskBadge risk={c.risk} />
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3.5 text-right font-mono text-[12px] text-signal">
                  {fmtUsd(c.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-[9.5px] tracking-[0.16em] text-dim">
        {state.cases.length} MATTERS ·{" "}
        {fmtUsd(state.cases.reduce((s, c) => s + c.value, 0))} AGGREGATE VALUE
      </p>
    </Panel>
  );
}

function TasksView({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state, toggleTask } = store;
  const caseTitle = (id: number | null) =>
    state.cases.find((c) => c.id === id)?.title ?? "General";
  const sorted = [...state.tasks].sort((a, b) =>
    Number(a.done) - Number(b.done) ||
    (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999"),
  );
  return (
    <Panel
      title="Operational Tasks"
      meta={`${state.tasks.filter((t) => !t.done).length} OPEN · ${state.tasks.filter((t) => t.done).length} CLEARED`}
    >
      <ul className="divide-y divide-line/60">
        {sorted.map((t) => (
          <li
            key={t.id}
            className={`group flex items-center gap-4 py-3.5 transition-all first:pt-0 last:pb-0 hover:bg-raise/40 ${t.done ? "opacity-55" : ""}`}
          >
            <button
              type="button"
              onClick={() => toggleTask(t.id)}
              aria-label={`Toggle "${t.title}"`}
              aria-pressed={t.done}
              className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border transition-all active:scale-90 ${
                t.done
                  ? "border-signal bg-signal text-abyss"
                  : "border-edge text-transparent hover:border-signal hover:text-signal"
              }`}
            >
              <IconCheck className="h-3 w-3" />
            </button>
            <div className="min-w-0 flex-1">
              <p
                className={`text-[13.5px] font-medium ${t.done ? "text-dim line-through" : "text-ink"}`}
              >
                {t.title}
              </p>
              <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.08em] text-dim">
                {caseTitle(t.case_id).toUpperCase()}
              </p>
            </div>
            <span
              className={`hidden font-mono text-[10px] tracking-[0.14em] sm:block ${PRIORITY_STYLE[t.priority]}`}
            >
              {t.priority.toUpperCase()}
            </span>
            <DueChip iso={t.due_date} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function NotesView({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state } = store;
  const caseTitle = (id: number | null) =>
    state.cases.find((c) => c.id === id)?.title ?? null;
  return (
    <Panel title="Intelligence Notes" meta="ANALYST OBSERVATIONS · CHAIN-OF-CUSTODY AWARE">
      <div className="space-y-4">
        {state.notes.map((n, i) => (
          <article
            key={n.id}
            className="rounded-lg border border-line/80 border-l-2 border-l-signal/60 bg-deep/80 p-5 transition-colors hover:border-signal/40"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="font-mono text-[10px] tracking-[0.16em] text-signal">
                #N-{String(state.notes.length - i).padStart(3, "0")}
              </span>
              <span className="font-mono text-[10px] tracking-[0.12em] text-fog">
                {(caseTitle(n.case_id) ?? "GENERAL NOTE").toUpperCase()}
              </span>
              <span className="ml-auto font-mono text-[9.5px] tracking-[0.1em] text-dim">
                {fmtDate(n.created_at).toUpperCase()}
              </span>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-fog">{n.body}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

/* ---------------- forms ---------------- */

function ClientForm({
  store,
  onDone,
}: {
  store: ReturnType<typeof useCrm>;
  onDone: () => void;
}) {
  const toast = useToast();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    store.addClient({
      name: String(fd.get("name") || "").trim(),
      organization: String(fd.get("organization") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      client_type: String(fd.get("client_type") || "Other"),
      jurisdiction: String(fd.get("jurisdiction") || "").trim(),
    });
    toast("Client registered to the registry.");
    onDone();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="name" required placeholder="Contact name" className="field" />
      <input name="organization" placeholder="Organization" className="field" />
      <input name="email" type="email" placeholder="Email" className="field" />
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="client_type" className="field" defaultValue="Law Firm">
          {CLIENT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <input name="jurisdiction" placeholder="Jurisdiction" className="field" />
      </div>
      <button type="submit" className="btn btn-primary mt-2 w-full">
        Create Client
      </button>
    </form>
  );
}

function CaseForm({
  store,
  onDone,
}: {
  store: ReturnType<typeof useCrm>;
  onDone: () => void;
}) {
  const toast = useToast();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    store.addCase({
      client_id: Number(fd.get("client_id")) || null,
      title: String(fd.get("title") || "").trim(),
      service: String(fd.get("service") || SERVICES[0]),
      risk: String(fd.get("risk") || "Medium") as Risk,
      status: String(fd.get("status") || "Intake") as Case["status"],
      value: Number(fd.get("value")) || 0,
      summary: String(fd.get("summary") || "").trim(),
    });
    toast("Case opened — matter added to portfolio.");
    onDone();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="title" required placeholder="Matter / case title" className="field" />
      <select name="client_id" required defaultValue="" className="field">
        <option value="" disabled>
          Select client
        </option>
        {store.state.clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} — {c.organization || c.client_type}
          </option>
        ))}
      </select>
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="service" className="field" defaultValue={SERVICES[0]}>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select name="risk" className="field" defaultValue="Medium">
          {RISKS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="status" className="field" defaultValue="Intake">
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input
          name="value"
          type="number"
          min={0}
          step={100}
          placeholder="Matter value / fee (USD)"
          className="field"
        />
      </div>
      <textarea
        name="summary"
        rows={4}
        placeholder="Executive summary"
        className="field resize-y"
      />
      <button type="submit" className="btn btn-primary mt-2 w-full">
        Open Case
      </button>
    </form>
  );
}

function TaskForm({
  store,
  onDone,
}: {
  store: ReturnType<typeof useCrm>;
  onDone: () => void;
}) {
  const toast = useToast();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    store.addTask({
      case_id: Number(fd.get("case_id")) || null,
      title: String(fd.get("title") || "").trim(),
      due_date: String(fd.get("due_date") || "") || null,
      priority: String(fd.get("priority") || "Normal") as Priority,
    });
    toast("Task queued in operational list.");
    onDone();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="title" required placeholder="Task" className="field" />
      <div className="grid gap-3 sm:grid-cols-2">
        <select name="case_id" defaultValue="" className="field">
          <option value="">No case</option>
          {store.state.cases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <input name="due_date" type="date" className="field" />
      </div>
      <select name="priority" className="field" defaultValue="Normal">
        {PRIORITIES.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary mt-2 w-full">
        Add Task
      </button>
    </form>
  );
}

function NoteForm({
  store,
  onDone,
}: {
  store: ReturnType<typeof useCrm>;
  onDone: () => void;
}) {
  const toast = useToast();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    store.addNote({
      case_id: Number(fd.get("case_id")) || null,
      body: String(fd.get("body") || "").trim(),
    });
    toast("Intelligence note saved.");
    onDone();
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      <select name="case_id" defaultValue="" className="field">
        <option value="">General note</option>
        {store.state.cases.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>
      <textarea
        name="body"
        rows={7}
        required
        placeholder="Observation, evidence reference, analyst note…"
        className="field resize-y"
      />
      <button type="submit" className="btn btn-primary mt-2 w-full">
        Save Note
      </button>
    </form>
  );
}

/* ---------------- shell ---------------- */

const VIEW_META: Record<View, { title: string; label: string }> = {
  dashboard: { title: "Command Center", label: "Command Center" },
  clients: { title: "Clients", label: "Clients" },
  cases: { title: "Cases", label: "Cases" },
  tasks: { title: "Tasks", label: "Tasks" },
  notes: { title: "Intelligence Notes", label: "Intelligence Notes" },
};

export default function Crm() {
  const toast = useToast();
  const store = useCrm();
  const [session, setSess] = useState<Session | null>(() => getSession());
  const [view, setView] = useState<View>("dashboard");
  const [modal, setModal] = useState<ModalKind>(null);

  if (!session) {
    return <CrmLogin onSuccess={setSess} />;
  }

  const logout = () => {
    clearSession();
    setSess(null);
    toast("Session terminated — signed out.");
  };

  const navItems: { id: View; count?: number }[] = [
    { id: "dashboard" },
    { id: "clients", count: store.state.clients.length },
    { id: "cases", count: store.state.cases.length },
    { id: "tasks", count: store.state.tasks.filter((t) => !t.done).length },
    { id: "notes", count: store.state.notes.length },
  ];

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[250px] shrink-0 flex-col border-r border-line/70 bg-deep/85 md:flex">
        <a href="#/" className="group flex items-center gap-3 border-b border-line/70 px-5 py-5">
          <span className="grid h-10 w-10 place-items-center rounded-[9px] border border-signal/60 bg-deep font-display text-[12px] font-bold tracking-widest text-signal">
            HTS
          </span>
          <span className="leading-tight">
            <strong className="block font-display text-[12px] font-bold tracking-[0.08em]">
              FORENSIC
            </strong>
            <small className="block font-mono text-[9px] tracking-[0.16em] text-dim">
              CLIENT CRM
            </small>
          </span>
        </a>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setView(n.id)}
              className={`flex w-full items-center justify-between rounded-md px-3.5 py-2.5 text-left text-[13px] font-semibold transition-all ${
                view === n.id
                  ? "border-l-2 border-signal bg-signal/10 text-signal"
                  : "border-l-2 border-transparent text-fog hover:bg-raise/60 hover:text-ink"
              }`}
            >
              {VIEW_META[n.id].label}
              {typeof n.count === "number" && (
                <span className="font-mono text-[10px] tracking-wider text-dim">{n.count}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-line/70 p-4">
          <div className="flex items-center gap-2.5 rounded-md border border-line bg-panel px-3 py-2.5">
            <span className="dot-live h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            <span className="truncate font-mono text-[10.5px] text-fog">{session.email}</span>
          </div>
          <button
            type="button"
            onClick={logout}
            className="btn btn-ghost btn-sm mt-3 w-full"
          >
            <IconOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* main */}
      <div className="min-w-0 flex-1">
        {/* mobile bar */}
        <div className="sticky top-0 z-40 border-b border-line/70 bg-abyss/92 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="#/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-signal/60 font-display text-[10px] font-bold tracking-widest text-signal">
                HTS
              </span>
              <strong className="font-display text-[12px] font-bold tracking-[0.08em]">
                CLIENT CRM
              </strong>
            </a>
            <button
              type="button"
              onClick={logout}
              className="grid h-9 w-9 place-items-center rounded-md border border-line text-fog"
              aria-label="Sign out"
            >
              <IconOut className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex gap-1.5 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
            {navItems.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setView(n.id)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.08em] transition-colors ${
                  view === n.id
                    ? "border-signal/50 bg-signal/10 text-signal"
                    : "border-line text-fog"
                }`}
              >
                {VIEW_META[n.id].label.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line/70 px-6 py-6 lg:px-8">
          <div>
            <p className="eyebrow">Secutor Pro LLC · Delaware</p>
            <h2 className="mt-1.5 font-display text-[26px] font-bold tracking-[-0.02em]">
              {VIEW_META[view].title}
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setModal("client")}
              className="btn btn-ghost btn-sm"
            >
              <IconPlus className="h-3.5 w-3.5" />
              Client
            </button>
            <button
              type="button"
              onClick={() => setModal("case")}
              className="btn btn-primary btn-sm"
            >
              <IconPlus className="h-3.5 w-3.5" />
              New Case
            </button>
          </div>
        </header>

        <main className="px-6 py-7 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            {view === "dashboard" && <Dashboard store={store} />}
            {view === "clients" && <ClientsView store={store} />}
            {view === "cases" && <CasesView store={store} />}
            {view === "tasks" && (
              <Panel
                title="Operational Tasks"
                meta="TOGGLE TO CLEAR · SORTED BY DUE DATE"
                action={
                  <button
                    type="button"
                    onClick={() => setModal("task")}
                    className="btn btn-line btn-sm"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                    Task
                  </button>
                }
              >
                <TasksList store={store} />
              </Panel>
            )}
            {view === "notes" && (
              <Panel
                title="Intelligence Notes"
                meta="ANALYST OBSERVATIONS · CHAIN-OF-CUSTODY AWARE"
                action={
                  <button
                    type="button"
                    onClick={() => setModal("note")}
                    className="btn btn-line btn-sm"
                  >
                    <IconPlus className="h-3.5 w-3.5" />
                    Note
                  </button>
                }
              >
                <NotesList store={store} />
              </Panel>
            )}
          </div>
        </main>
      </div>

      {/* modals */}
      {modal === "client" && (
        <Modal title="New Client" onClose={() => setModal(null)}>
          <ClientForm store={store} onDone={() => setModal(null)} />
        </Modal>
      )}
      {modal === "case" && (
        <Modal title="New Case" onClose={() => setModal(null)}>
          <CaseForm store={store} onDone={() => setModal(null)} />
        </Modal>
      )}
      {modal === "task" && (
        <Modal title="New Task" onClose={() => setModal(null)}>
          <TaskForm store={store} onDone={() => setModal(null)} />
        </Modal>
      )}
      {modal === "note" && (
        <Modal title="Intelligence Note" onClose={() => setModal(null)}>
          <NoteForm store={store} onDone={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}

/* unwrapped list bodies (panels provided by the shell for tasks/notes) */

function TasksList({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state, toggleTask } = store;
  const caseTitle = (id: number | null) =>
    state.cases.find((c) => c.id === id)?.title ?? "General";
  const sorted = [...state.tasks].sort(
    (a, b) =>
      Number(a.done) - Number(b.done) ||
      (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999"),
  );
  return (
    <ul className="divide-y divide-line/60">
      {sorted.map((t) => (
        <li
          key={t.id}
          className={`flex items-center gap-4 py-3.5 transition-all first:pt-0 last:pb-0 hover:bg-raise/40 ${t.done ? "opacity-55" : ""}`}
        >
          <button
            type="button"
            onClick={() => toggleTask(t.id)}
            aria-label={`Toggle "${t.title}"`}
            aria-pressed={t.done}
            className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border transition-all active:scale-90 ${
              t.done
                ? "border-signal bg-signal text-abyss"
                : "border-edge text-transparent hover:border-signal hover:text-signal"
            }`}
          >
            <IconCheck className="h-3 w-3" />
          </button>
          <div className="min-w-0 flex-1">
            <p
              className={`text-[13.5px] font-medium ${t.done ? "text-dim line-through" : "text-ink"}`}
            >
              {t.title}
            </p>
            <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.08em] text-dim">
              {caseTitle(t.case_id).toUpperCase()}
            </p>
          </div>
          <span
            className={`hidden font-mono text-[10px] tracking-[0.14em] sm:block ${PRIORITY_STYLE[t.priority]}`}
          >
            {t.priority.toUpperCase()}
          </span>
          <DueChip iso={t.due_date} />
        </li>
      ))}
    </ul>
  );
}

function NotesList({ store }: { store: ReturnType<typeof useCrm> }) {
  const { state } = store;
  const caseTitle = (id: number | null) =>
    state.cases.find((c) => c.id === id)?.title ?? null;
  return (
    <div className="space-y-4">
      {state.notes.map((n, i) => (
        <article
          key={n.id}
          className="rounded-lg border border-line/80 border-l-2 border-l-signal/60 bg-deep/80 p-5 transition-colors hover:border-signal/40"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="font-mono text-[10px] tracking-[0.16em] text-signal">
              #N-{String(state.notes.length - i).padStart(3, "0")}
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-fog">
              {(caseTitle(n.case_id) ?? "GENERAL NOTE").toUpperCase()}
            </span>
            <span className="ml-auto font-mono text-[9.5px] tracking-[0.1em] text-dim">
              {fmtDate(n.created_at).toUpperCase()}
            </span>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-fog">{n.body}</p>
        </article>
      ))}
    </div>
  );
}

/* keep TasksView/NotesView exported for potential reuse */
export { TasksView, NotesView, ClientsView, CasesView, Dashboard };
export type { Task };
