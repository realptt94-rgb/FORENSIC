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
  "Intelligence financière forensique",
  "Examen des signaux en fusions-acquisitions",
  "Traçage de fonds",
  "Forensique de la réputation numérique",
  "Enquête transfrontalière",
];

export const CLIENT_TYPES = [
  "Cabinet d'avocats",
  "Investisseur",
  "Family office",
  "Acheteur d'entreprise",
  "Dirigeant",
  "Société",
  "Autre",
];

export const RISKS: Risk[] = ["Low", "Medium", "High", "Critical"];
export const STATUSES: CaseStatus[] = ["Intake", "Active", "Waiting", "Review", "Closed"];
export const PRIORITIES: Priority[] = ["Normal", "High", "Critical"];

/* Traductions pour l'affichage */
export const RISK_LABEL: Record<Risk, string> = {
  Low: "Faible",
  Medium: "Moyen",
  High: "Élevé",
  Critical: "Critique",
};

export const STATUS_LABEL: Record<CaseStatus, string> = {
  Intake: "Accueil",
  Active: "Actif",
  Waiting: "En attente",
  Review: "En revue",
  Closed: "Clôturé",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  Normal: "Normal",
  High: "Élevée",
  Critical: "Critique",
};

/* ---------------- seed ---------------- */

let SEQ = 1000;
const nid = () => ++SEQ;
const now = () => new Date().toISOString();
const day = (offset: number) =>
  new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10);

export function seedState(): CrmState {
  SEQ = 1000;
  const clients: Client[] = [
    { id: nid(), name: "Vanessa Krol", organization: "Hartwell & Sorensen LLP", email: "vkrol@hartwell-sorensen.com", client_type: "Cabinet d'avocats", jurisdiction: "New York, États-Unis", created_at: now() },
    { id: nid(), name: "Dmitri Ansel", organization: "Meridian Capital Partners", email: "d.ansel@meridiancap.co.uk", client_type: "Investisseur", jurisdiction: "Londres, Royaume-Uni", created_at: now() },
    { id: nid(), name: "Ingrid Halvorsen", organization: "Halvorsen Family Office", email: "ingrid@halvorsen-fo.no", client_type: "Family office", jurisdiction: "Oslo, Norvège", created_at: now() },
    { id: nid(), name: "Marcus Webb", organization: "Corvid Acquisition Corp", email: "mwebb@corvidacq.com", client_type: "Acheteur d'entreprise", jurisdiction: "Delaware, États-Unis", created_at: now() },
    { id: nid(), name: "Elena Petrova", organization: "Particulier", email: "e.petrova@privatemail.ch", client_type: "Dirigeant", jurisdiction: "Zurich, Suisse", created_at: now() },
    { id: nid(), name: "Nikos Stavros", organization: "Atlas Marine Holdings", email: "legal@atlasmarine.gr", client_type: "Société", jurisdiction: "Le Pirée, Grèce", created_at: now() },
  ];
  const [krol, ansel, halv, webb, petrova, atlas] = clients.map((c) => c.id);
  const cases: Case[] = [
    { id: nid(), client_id: webb, title: "Projet Lantern — Examen des signaux pré-acquisition", service: "Examen des signaux en fusions-acquisitions", risk: "High", status: "Active", value: 185000, summary: "Groupe industriel cible, demande à 140 M€. Vieillissement des créances incohérent avec les documents d'expédition ; écart ≈ 2,4 M€ sous stress-test.", created_at: now() },
    { id: nid(), client_id: ansel, title: "Traçage de fonds Kestrel — Route Caraïbes", service: "Traçage de fonds", risk: "Critical", status: "Active", value: 240000, summary: "11,6 M€ détournés via trois véhicules BVI non déclarés. Données de banques correspondantes en main ; numérotation des pièces à partir de K-114.", created_at: now() },
    { id: nid(), client_id: petrova, title: "Défense de l'exposition SERP Petrova", service: "Forensique de la réputation numérique", risk: "Medium", status: "Review", value: 96000, summary: "14 URLs anciennes sur deux moteurs de recherche. Six déréférencements approuvés ; le reste en file de revue juridique.", created_at: now() },
    { id: nid(), client_id: atlas, title: "Atlas Marine — Cartographie du réseau de parties liées", service: "Intelligence financière forensique", risk: "High", status: "Active", value: 150000, summary: "Boucle d'approvisionnement entre Atlas et deux sous-traitants partageant un agent enregistré. Visualisation en cours avec le conseil.", created_at: now() },
    { id: nid(), client_id: krol, title: "Support litige Hartwell — Dissimulation d'actifs", service: "Enquête transfrontalière", risk: "High", status: "Waiting", value: 210000, summary: "Indicateurs de dissimulation côté débiteur dans les registres de Chypre et de Suisse. En attente des documents via canal MLAT avant le prochain dépôt.", created_at: now() },
    { id: nid(), client_id: halv, title: "Examen d'intégrité de contrepartie Halvorsen", service: "Examen des signaux en fusions-acquisitions", risk: "Low", status: "Intake", value: 60000, summary: "Contrôle d'intégrité pré-engagement sur une contrepartie logistique nordique. Vérification de conflit en cours.", created_at: now() },
    { id: nid(), client_id: ansel, title: "Audit de risque de recherche personnel Ansel", service: "Forensique de la réputation numérique", risk: "Low", status: "Closed", value: 45000, summary: "Audit SERP de référence terminé. Score d'exposition réduit de 72 à 23 sur la durée de la mission.", created_at: now() },
    { id: nid(), client_id: webb, title: "Corvid — Analyse d'anomalies de fournisseurs fictifs", service: "Intelligence financière forensique", risk: "Medium", status: "Closed", value: 88000, summary: "Deux fournisseurs fictifs confirmés ; recouvrements transmis au conseil. Dossier archivé.", created_at: now() },
  ];
  const [lantern, kestrel, petrovaCase, atlasCase, hartwell, halvCase, vireo] = cases.map(
    (c) => c.id,
  );
  const tasks: Task[] = [
    { id: nid(), case_id: kestrel, title: "Cartographier les entités intermédiaires — cluster Cayman", due_date: day(1), priority: "Critical", done: false, created_at: now() },
    { id: nid(), case_id: hartwell, title: "Transmettre les réponses aux assignations au conseil Hartwell", due_date: day(-1), priority: "Critical", done: false, created_at: now() },
    { id: nid(), case_id: lantern, title: "Finaliser la matrice de preuves pour le Projet Lantern", due_date: day(2), priority: "High", done: false, created_at: now() },
    { id: nid(), case_id: halvCase, title: "Vérification de conflit — contrepartie Halvorsen", due_date: day(3), priority: "Normal", done: false, created_at: now() },
    { id: nid(), case_id: petrovaCase, title: "Déposer les demandes de déréférencement — 8 URLs restantes", due_date: day(5), priority: "High", done: false, created_at: now() },
    { id: nid(), case_id: hartwell, title: "Demander les relevés bancaires via canal MLAT", due_date: day(9), priority: "High", done: false, created_at: now() },
    { id: nid(), case_id: atlasCase, title: "Rapport de suivi trimestriel — Atlas Marine", due_date: day(12), priority: "Normal", done: false, created_at: now() },
    { id: nid(), case_id: kestrel, title: "Facturer l'étape 2 — Traçage Kestrel", due_date: day(-3), priority: "Normal", done: false, created_at: now() },
    { id: nid(), case_id: vireo, title: "Archiver les dossiers de travail du Projet Vireo", due_date: day(-6), priority: "Normal", done: true, created_at: now() },
    { id: nid(), case_id: lantern, title: "Diffuser le compte-rendu de l'appel de lancement", due_date: day(-8), priority: "Normal", done: true, created_at: now() },
  ];
  const notes: Note[] = [
    { id: nid(), case_id: kestrel, body: "Trois véhicules BVI précédemment non déclarés apparaissent dans les données de banques correspondantes. Chaîne de custody des relevés vérifiée ; numérotation des pièces à partir de K-114.", created_at: now() },
    { id: nid(), case_id: lantern, body: "Vieillissement des créances T3 de la cible incohérent avec les documents d'expédition — écart ≈ 2,4 M€. Escaladé en file de stress-test avant la lettre d'offre révisée.", created_at: now() },
    { id: nid(), case_id: petrovaCase, body: "Déréférencement approuvé pour 6 URLs sur 14. Les 8 restantes escaladées en file de revue juridique ; résultats d'images en baisse de 41 % semaine après semaine.", created_at: now() },
    { id: nid(), case_id: atlasCase, body: "Boucle de parties liées confirmée entre l'approvisionnement d'Atlas et deux sous-traitants partageant un agent enregistré. Visualisation du réseau en cours pour le conseil.", created_at: now() },
    { id: nid(), case_id: null, body: "Rotation des analystes terminée — couverture maintenue sur les fuseaux horaires UE et US-Central. Balayage des registres KY / CAY / CH terminé sans nouveaux signaux.", created_at: now() },
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
  if (!iso) return { label: "Pas d'échéance", tone: "dim" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso + "T00:00:00");
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff < 0) return { label: `En retard de ${-diff} j`, tone: "bad" };
  if (diff === 0) return { label: "Échéance aujourd'hui", tone: "warn" };
  if (diff === 1) return { label: "Échéance demain", tone: "warn" };
  return {
    label: `Échéance le ${d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`,
    tone: "ok",
  };
}
