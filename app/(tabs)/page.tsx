import Link from "next/link";
import MainHeader from "@/components/layout/MainHeader";
import BottomNav from "@/components/layout/BottomNav";
import MiniTrendChart from "@/components/MiniTrendChart";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const snap = await api.home();
  const { goal, today_insight: today, trend_change_pct, series } = snap;
  const userName = "종건";

  return (
    <>
      <MainHeader />

      <main className="flex-1 px-[20px] pt-2 pb-6 flex flex-col gap-card-gap-v">
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface py-2">
          {userName}님 <span aria-hidden>👋</span>
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

        {/* Today's Habits Checklist (static for now) */}
        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              오늘의 습관
            </h3>
            <div className="bg-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold text-on-secondary-container">
              2/3 달성
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3 opacity-70">
              <span
                className="material-symbols-outlined text-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-body-lg text-body-lg text-outline line-through decoration-outline">
                {goal.title}
              </span>
            </li>
            <li className="flex items-center gap-3 opacity-70">
              <span
                className="material-symbols-outlined text-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-body-lg text-body-lg text-outline line-through decoration-outline">
                영단어 50개
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline-variant">
                radio_button_unchecked
              </span>
              <span className="font-body-lg text-body-lg text-on-surface">
                운동 30분
              </span>
            </li>
          </ul>
        </section>

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

      {/* FAB */}
      <button
        aria-label="기록 추가"
        className="fixed bottom-[88px] right-1/2 translate-x-[180px] w-14 h-14 gradient-growth rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_rgba(0,127,95,0.35)] hover:scale-105 transition-transform z-40"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
          add
        </span>
      </button>

      <BottomNav activeTab="home" />
    </>
  );
}
