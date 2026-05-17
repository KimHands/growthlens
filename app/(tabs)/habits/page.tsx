import MainHeader from "@/components/layout/MainHeader";
import BottomNav from "@/components/layout/BottomNav";
import HabitsList from "@/components/HabitsList";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HabitsPage() {
  const [{ goal }, habits] = await Promise.all([
    api.home(),
    api.habits.list(),
  ]);
  const progress = Math.min(100, (goal.streak / 14) * 100);

  return (
    <>
      <MainHeader />

      <main className="flex-1 px-[20px] pt-2 pb-6 flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[4px] pt-2">
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            오늘의 습관
          </h1>
          <p className="font-body-md text-body-md text-[#4B5563]">
            {goal.title} · 매일 {goal.target}{goal.unit}
          </p>
        </div>

        <section className="gradient-growth rounded-card p-[20px] flex flex-col gap-[20px] text-white shadow-[0_4px_14px_rgba(0,127,95,0.2)]">
          <div className="flex justify-between items-start">
            <span className="text-[40px] leading-none">🔥</span>
            <div className="text-right flex flex-col gap-[4px]">
              <span className="font-label-lg text-label-lg text-white/80">
                연속 달성
              </span>
              <span className="font-bold text-[40px] leading-[48px]">
                {goal.streak}일
              </span>
              <span className="font-body-md text-body-md text-white/90">
                이번 주도 꾸준해요!
              </span>
            </div>
          </div>
          <div className="w-full h-[6px] bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/90 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <HabitsList initial={habits} allowAdd allowDelete />
      </main>

      <BottomNav activeTab="habits" />
    </>
  );
}
