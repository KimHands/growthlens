import Link from "next/link";
import MainHeader from "@/components/layout/MainHeader";
import BottomNav from "@/components/layout/BottomNav";
import MiniTrendChart from "@/components/MiniTrendChart";
import HabitsList from "@/components/HabitsList";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [snap, habits] = await Promise.all([api.home(), api.habits.list()]);
  const { goal, today_insight: today, trend_change_pct, series } = snap;

  return (
    <>
      <MainHeader />

      <main className="flex-1 px-[20px] pt-2 pb-6 flex flex-col gap-card-gap-v">
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface py-2">
          오늘도 반가워요 <span aria-hidden>👋</span>
        </h1>

        {/* Hero Insight Card */}
        <Link
          href={`/insights/${today.id}`}
          className="gradient-growth rounded-card p-5 text-white shadow-[0_4px_14px_rgba(0,127,95,0.2)] flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-[32px] leading-none">{today.emoji}</span>
            <div className="bg-white/20 px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold backdrop-blur-sm border border-white/10">
              {trend_change_pct >= 0 ? "+" : ""}
              {trend_change_pct}%
            </div>
          </div>
          <h2 className="font-headline-lg text-headline-lg mb-2 leading-tight">
            {today.title}
          </h2>
          <p className="font-body-md text-body-md text-white/90 mb-4">
            {today.body}
          </p>
          <span className="inline-flex items-center font-label-lg text-label-lg font-semibold">
            자세히 보기
            <span className="material-symbols-outlined ml-1 text-[18px]">
              arrow_forward
            </span>
          </span>
        </Link>

        {/* Streak Card */}
        <section className="gradient-growth rounded-card p-5 text-white flex items-center justify-between shadow-[0_4px_14px_rgba(0,127,95,0.2)]">
          <div className="flex items-center gap-4">
            <span className="text-[40px] leading-none">🔥</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-white/80 mb-0.5">
                연속 달성
              </span>
              <span className="text-[40px] font-bold leading-none">
                {goal.streak}일
              </span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-white/90 text-right">
            이번 주도<br />꾸준해요!
          </p>
        </section>

        {/* Today's Habits Checklist (dynamic) */}
        <HabitsList initial={habits} />

        {/* Mini Trend Chart */}
        <Link
          href="/analysis"
          className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5 flex flex-col gap-3 hover:bg-surface-variant/20 transition-colors"
        >
          <h3 className="font-label-lg text-label-lg text-outline">
            {goal.title} · 지난 {series.length}일
          </h3>
          <MiniTrendChart data={series} />
        </Link>
      </main>

      <BottomNav activeTab="home" />
    </>
  );
}
