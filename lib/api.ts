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
  residual_std: number;
  seasonal_amplitude: number;
  weekday_vs_weekend: number;
  trend_slope_per_day: number;
  trend_acceleration: number;
  trend_variance_ratio: number;
  residual_max_abs: number;
  days_to_target: number | null;
  target_eta_low: number | null;
  target_eta_high: number | null;
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

export type Habit = {
  id: string;
  name: string;
  done_today: boolean;
  done_this_week: number;
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
  habits: {
    list: () => get<Habit[]>("/api/habits"),
  },
};
