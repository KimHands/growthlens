"use client";

import { useState } from "react";
import type { Habit } from "@/lib/api";
import { useDemoHabits } from "@/lib/habits-store";

type Props = {
  initial: Habit[];
  /** "+ 새 습관 추가" 입력란 표시 여부 */
  allowAdd?: boolean;
  /** 삭제 버튼 표시 여부 */
  allowDelete?: boolean;
};

export default function HabitsList({
  initial,
  allowAdd = false,
  allowDelete = false,
}: Props) {
  const stored = useDemoHabits((state) => state.habits);
  const setHabits = useDemoHabits((state) => state.setHabits);
  const habits = stored ?? initial;
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const doneCount = habits.filter((h) => h.done_today).length;

  function onToggle(h: Habit) {
    setHabits(
      habits.map((x) =>
        x.id === h.id ? { ...x, done_today: !x.done_today } : x,
      ),
    );
  }

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const name = draft.trim();
    if (!name) return;
    const created: Habit = {
      id: `demo-${Date.now()}`,
      name,
      done_today: false,
      done_this_week: 0,
    };
    setHabits([...habits, created]);
    setDraft("");
    setAdding(false);
  }

  function onDelete(id: string) {
    setHabits(habits.filter((x) => x.id !== id));
  }

  return (
    <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-[20px] flex flex-col gap-[16px]">
      <div className="flex justify-between items-center pb-[8px]">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          오늘의 습관
        </h3>
        <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold px-[10px] py-[4px] rounded-full">
          {doneCount}/{habits.length} 달성
        </span>
      </div>

      <ul className="flex flex-col gap-[12px]">
        {habits.map((h) => (
          <li
            key={h.id}
            className={
              "flex items-center gap-[12px] py-1 -mx-2 px-2 rounded-lg hover:bg-surface-variant/30 transition-colors " +
              (h.done_today ? "opacity-70" : "")
            }
          >
            <button
              type="button"
              onClick={() => onToggle(h)}
              aria-pressed={h.done_today}
              aria-label={`${h.name} ${h.done_today ? "완료 취소" : "완료 표시"}`}
              className="shrink-0"
            >
              {h.done_today ? (
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
            </button>
            <button
              type="button"
              onClick={() => onToggle(h)}
              className={
                "flex-1 text-left font-body-lg text-body-lg " +
                (h.done_today
                  ? "text-on-surface line-through decoration-outline"
                  : "text-on-surface")
              }
            >
              {h.name}
            </button>
            {allowDelete && (
              <button
                type="button"
                onClick={() => onDelete(h.id)}
                aria-label="삭제"
                className="shrink-0 text-outline hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </li>
        ))}
        {habits.length === 0 && (
          <li className="text-on-surface-variant font-body-md text-body-md py-2">
            아직 등록된 습관이 없어요.
          </li>
        )}
      </ul>

      {allowAdd &&
        (adding ? (
          <form onSubmit={onAdd} className="flex items-center gap-2 mt-[4px]">
            <input
              type="text"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="예: 코딩 테스트 1문제"
              maxLength={40}
              className="flex-1 h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md focus:outline-none focus:border-primary-container"
            />
            <button
              type="submit"
              className="h-10 px-3 rounded-lg bg-primary-container text-white font-label-lg text-label-lg font-semibold"
            >
              추가
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft("");
                setAdding(false);
              }}
              className="h-10 px-2 rounded-lg text-outline font-label-lg text-label-lg"
            >
              취소
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="text-primary-container font-label-lg text-label-lg font-semibold text-left mt-[4px]"
          >
            + 새 습관 추가
          </button>
        ))}

      <p className="font-label-sm text-label-sm text-on-surface-variant">
        데모라서 변경 내용은 새로고침 전까지 이 브라우저에만 남아요.
      </p>
    </section>
  );
}
