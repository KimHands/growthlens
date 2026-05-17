const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export type DailyRecord = {
  date: string;
  day: string;
  observed: number;
  trend: number;
  seasonal: number;
  residual: number;
};

export type RecordRow = {
  id: string;
  date: string;
  value: number;
  note: string | null;
};

export type Goal = {
  id: string;
  title: string;
  unit: string;
  target: number;
  started_at: string;
  streak: number;
};

export type Insight = {
  id: string;
  title: string;
  body: string;
  tag: "trend-up" | "trend-down" | "noise" | "milestone";
  emoji: string;
  created_at: string;
};

export type DecomposeResponse = {
  points: DailyRecord[];
  trend_change_pct: number;
  first_trend: number;
  last_trend: number;
  window_days: number;
};

export type InsightsResponse = {
  today: Insight;
  past: Insight[];
};

export type HomeSnapshot = {
  goal: Goal;
  today_insight: Insight;
  trend_change_pct: number;
  series: DailyRecord[];
};

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path} ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  home: () => get<HomeSnapshot>("/api/home"),
  decompose: () => get<DecomposeResponse>("/api/decompose"),
  insights: () => get<InsightsResponse>("/api/insights"),
  records: () => get<RecordRow[]>("/api/records"),
};
