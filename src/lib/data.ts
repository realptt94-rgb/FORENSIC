import { useEffect, useState } from "react";

/* ---------------- types ---------------- */

export type Risk = "Low" | "Medium" | "High" | "Critical";
export type CaseStatus = "Intake" | "Active" | "Waiting" | "Review" | "Closed";
export type Priority = "Normal" | "High" | "Critical";

export interface Client {
  id: number;
  name: string;
  organization: string;
  email: string;
  client_type: string;
  jurisdiction: string;
  created_at: string;
}

export interface Case {
  id: number;
  client_id: number | null;
  title: string;
  service: string;
  risk: Risk;
  status: CaseStatus;
  value: number;
  summary: string;
  created_at: string;
}

export interface Task {
  id: number;
  case_id: number | null;
  title: string;
  due_date: string | null;
  priority: Priority;
  done: boolean;
  created_at: string;
}

export interface Note {
  id: number;
  case_id: number | null;
  body: string;
  created_at: string;
}

export interface CrmState {
  clients: Client[];
  cases: Case[];
  tasks: Task[];
  notes: Note[];
}

/* ---------------- constants ---------------- */

export const SERVICES = [
  "Forensic Financial Intelligence",
  "M&A Red Flag Review",
  "Funds Tracing",
  "Digital Reputation Forensics",
  "Cross-Border Investigation",
];

export const CLIENT_TYPES = [
  "Law Firm",
  "Investor",
  "Family Office",
  "Business Buyer",
  "Executive",
  "Company",
  "Other",
];

export const RISKS: Risk[] = ["Low", "Medium", "High", "Critical"];
export const STATUSES: CaseStatus[] = ["Intake", "Active", "Waiting", "Review", "Closed"];
export const PRIORITIES: Priority[] = ["Normal", "High", "Critical"];

/* ---------------- seed ---------------- */

let SEQ = 1000;
const nid = () => ++SEQ;
const now = () => new Date().toISOString();
const day = (offset: number) =>
  new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);

export function seedState(): CrmState {
  SEQ = 1000;
  const clients: Client[] = [
    { id: nid(), name: "Vanessa Krol", organization: "Hartwell & Sorensen LLP", email: "vkrol@hartwell-sorensen.com", client_type: "Law Firm", jurisdiction: "New York, USA", created_at: now() },
    { id: nid(), name: "Dmitri Ansel", organization: "Meridian Capital Partners", email: "d.ansel@meridiancap.co.uk", client_type: "Investor", jurisdiction: "London, UK", created_at: now() },
    { id: nid(), name: "Ingrid Halvorsen", organization: "Halvorsen Family Office", email: "ingrid@halvorsen-fo.no", client_type: "Family Office", jurisdiction: "Oslo, Norway", created_at: now() },
    { id: nid(), name: "Marcus Webb", organization: "Corvid Acquisition Corp", email: "mwebb@corvidacq.com", client_type: "Business Buyer", jurisdiction: "Delaware, USA", created_at: now() },
    { id: nid(), name: "Elena Petrova", organization: "Private", email: "e.petrova@privatemail.ch", client_type: "Executive", jurisdiction: "Zurich, Switzerland", created_at: now() },
    { id: nid(), name: "Nikos Stavros", organization: "Atlas Marine Holdings", email: "legal@atlasmarine.gr", client_type: "Company", jurisdiction: "Piraeus, Greece", created_at: now() },
  ];
  const [krol, ansel, halv, webb, petrova, atlas] = clients.map((c) => c.id);
  const cases: Case[] = [
    { id: nid(), client_id: webb, title: "Project Lantern — Pre-Acquisition Red Flag Review", service: "M&A Red Flag Review", risk: "High", status: "Active", value: 185000, summary: "Target industrial group, €140M ask. Receivables aging inconsistent with shipping documents; variance ≈ €2.4M under pressure-test.", created_at: now() },
    { id: nid(), client_id: ansel, title: "Kestrel Funds Tracing — Caribbean Route", service: "Funds Tracing", risk: "Critical", status: "Active", value: 240000, summary: "€11.6M diverted through three undisclosed BVI vehicles. Correspondent-bank data in hand; exhibit numbering from K-114.", created_at: now() },
    { id: nid(), client_id: petrova, title: "Petrova SERP Exposure Defense", service: "Digital Reputation Forensics", risk: "Medium", status: "Review", value: 96000, summary: "14 legacy URLs across two search engines. Six delistings approved; remainder in legal-review track.", created_at: now() },
    { id: nid(), client_id: atlas, title: "Atlas Marine — Related-Party Network Mapping", service: "Forensic Financial Intelligence", risk: "High", status: "Active", value: 150000, summary: "Procurement loop between Atlas and two subcontractors sharing a registered agent. Visualization draft with counsel.", created_at: now() },
    { id: nid(), client_id: krol, title: "Hartwell Litigation Support — Asset Concealment", service: "Cross-Border Investigation", risk: "High", status: "Waiting", value: 210000, summary: "Debtor-side concealment indicators across CY and CH registries. Awaiting MLAT-channel records before next filing.", created_at: now() },
    { id: nid(), client_id: halv, title: "Halvorsen Counterparty Integrity Review", service: "M&A Red Flag Review", risk: "Low", status: "Intake", value: 60000, summary: "Pre-commitment integrity screen on a Nordic logistics counterparty. Conflict check in progress.", created_at: now() },
    { id: nid(), client_id: ansel, title: "Ansel Personal Search Risk Audit", service: "Digital Reputation Forensics", risk: "Low", status: "Closed", value: 45000, summary: "Baseline SERP audit completed. Exposure score reduced 72 → 23 over the engagement window.", created_at: now() },
    { id: nid(), client_id: webb, title: "Corvid — Shell Vendor Anomaly Analysis", service: "Forensic Financial Intelligence", risk: "Medium", status: "Closed", value: 88000, summary: "Two shell vendors confirmed; recoveries referred to counsel. Matter archived.", created_at: now() },
  ];
  const [lantern, kestrel, petrovaCase, atlasCase, hartwell, halvCase, vireo] = cases.map(
    (c) => c.id,
  );
  const tasks: Task[] = [
    { id: nid(), case_id: kestrel, title: "Map intermediary entities — Cayman cluster", due_date: day(1), priority: "Critical", done: false, created_at: now() },
    { id: nid(), case_id: hartwell, title: "Serve subpoena responses to Hartwell counsel", due_date: day(-1), priority: "Critical", done: false, created_at: now() },
    { id: nid(), case_id: lantern, title: "Finalize evidence matrix for Project Lantern", due_date: day(2), priority: "High", done: false, created_at: now() },
    { id: nid(), case_id: halvCase, title: "Conflict check — Halvorsen counterparty", due_date: day(3), priority: "Normal", done: false, created_at: now() },
    { id: nid(), case_id: petrovaCase, title: "File delisting requests — remaining 8 URLs", due_date: day(5), priority: "High", done: false, created_at: now() },
    { id: nid(), case_id: hartwell, title: "Request bank records via MLAT channel", due_date: day(9), priority: "High", done: false, created_at: now() },
    { id: nid(), case_id: atlasCase, title: "Quarterly monitoring report — Atlas Marine", due_date: day(12), priority: "Normal", done: false, created_at: now() },
    { id: nid(), case_id: kestrel, title: "Invoice milestone 2 — Kestrel tracing", due_date: day(-3), priority: "Normal", done: false, created_at: now() },
    { id: nid(), case_id: vireo, title: "Archive Project Vireo workpapers", due_date: day(-6), priority: "Normal", done: true, created_at: now() },
    { id: nid(), case_id: lantern, title: "Kick-off call minutes circulated", due_date: day(-8), priority: "Normal", done: true, created_at: now() },
  ];
  const notes: Note[] = [
    { id: nid(), case_id: kestrel, body: "Three previously undisclosed BVI vehicles surface in correspondent-bank data. Chain-of-custody for statements verified; exhibit numbering begins at K-114.", created_at: now() },
    { id: nid(), case_id: lantern, body: "Target's Q3 receivables aging inconsistent with shipping documents — variance ≈ €2.4M. Escalated to pressure-test queue ahead of revised bid letter.", created_at: now() },
    { id: nid(), case_id: petrovaCase, body: "Delisting approved for 6 of 14 URLs. Remaining 8 escalated to legal-review track; image results down 41% week over week.", created_at: now() },
    { id: nid(), case_id: atlasCase, body: "Related-party loop confirmed between Atlas procurement and two subcontractors sharing a registered agent. Drafting network visualization for counsel.", created_at: now() },
    { id: nid(), case_id: null, body: "Analyst rotation complete — coverage maintained across EU and US-Central time slots. Registry sweep for KY / CAY / CH completed without new flags.", created_at: now() },
  ];
  return { clients, cases, tasks, notes };
}

/* ---------------- persistence ---------------- */

const KEY = "hts.crm.v1";

function loadState(): CrmState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CrmState;
      if (
        Array.isArray(parsed.clients) &&
        Array.isArray(parsed.cases) &&
        Array.isArray(parsed.tasks) &&
        Array.isArray(parsed.notes)
      ) {
        return parsed;
      }
    }
  } catch {
    /* fall through to seed */
  }
  return seedState();
}

export function useCrm() {
  const [state, setState] = useState<CrmState>(loadState);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const nextId = (arr: { id: number }[]) =>
    arr.reduce((m, x) => Math.max(m, x.id), 1000) + 1;

  const addClient = (c: Omit<Client, "id" | "created_at">) =>
    setState((s) => ({
      ...s,
      clients: [{ ...c, id: nextId(s.clients), created_at: now() }, ...s.clients],
    }));

  const addCase = (c: Omit<Case, "id" | "created_at">) =>
    setState((s) => ({
      ...s,
      cases: [{ ...c, id: nextId(s.cases), created_at: now() }, ...s.cases],
    }));

  const addTask = (t: Omit<Task, "id" | "created_at" | "done">) =>
    setState((s) => ({
      ...s,
      tasks: [{ ...t, done: false, id: nextId(s.tasks), created_at: now() }, ...s.tasks],
    }));

  const addNote = (n: Omit<Note, "id" | "created_at">) =>
    setState((s) => ({
      ...s,
      notes: [{ ...n, id: nextId(s.notes), created_at: now() }, ...s.notes],
    }));

  const toggleTask = (id: number) =>
    setState((s) => ({
      ...s,
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }));

  return { state, addClient, addCase, addTask, addNote, toggleTask };
}

/* ---------------- auth (demo) ---------------- */

const SKEY = "hts.session.v1";
export const DEMO_EMAIL = "admin@secutorpro.local";
export const DEMO_PASS = "secutor-demo";

export interface Session {
  email: string;
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SKEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(s));
  } catch {
    /* noop */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SKEY);
  } catch {
    /* noop */
  }
}

export function tryLogin(email: string, password: string): boolean {
  return email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASS;
}

/* ---------------- formatting ---------------- */

export const fmtUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function dueInfo(
  iso: string | null,
): { label: string; tone: "ok" | "warn" | "bad" | "dim" } {
  if (!iso) return { label: "No due date", tone: "dim" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + "T00:00:00");
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return { label: `Overdue ${-diff}d`, tone: "bad" };
  if (diff === 0) return { label: "Due today", tone: "warn" };
  if (diff === 1) return { label: "Due tomorrow", tone: "warn" };
  return {
    label: `Due ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
    tone: "ok",
  };
}
