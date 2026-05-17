import MainHeader from "@/components/layout/MainHeader";
import BottomNav from "@/components/layout/BottomNav";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

const habits = [
  { name: "영단어 50개", done: true },
  { name: "코딩 테스트 1문제", done: false },
  { name: "운동 30분", done: false },
];

export default async function HabitsPage() {
  const { goal } = await api.home();
  const doneCount = habits.filter((h) => h.done).length;
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

        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-[20px] flex flex-col gap-[16px]">
          <div className="flex justify-between items-center pb-[8px]">
            <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
              오늘 할 일
            </h2>
            <span className="bg-[#ECFCCB] text-primary-container font-label-sm text-label-sm font-semibold px-[10px] py-[4px] rounded-full">
              {doneCount}/{habits.length}
            </span>
          </div>

          <ul className="flex flex-col gap-[16px]">
            {habits.map((h) => (
              <li
                key={h.name}
                className={
                  "flex items-center gap-[12px] " + (h.done ? "opacity-70" : "")
                }
              >
                {h.done ? (
                  <span
                    className="material-symbols-outlined text-primary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-outline-variant">
                    radio_button_unchecked
                  </span>
                )}
                <span
                  className={
                    "font-body-lg text-body-lg " +
                    (h.done
                      ? "text-on-surface line-through"
                      : "text-on-surface")
                  }
                >
                  {h.name}
                </span>
              </li>
            ))}
          </ul>

          <button className="text-primary-container font-label-lg text-label-lg font-semibold text-left mt-[8px]">
            + 새 습관 추가
          </button>
        </section>
      </main>

      <BottomNav activeTab="habits" />
    </>
  );
}
