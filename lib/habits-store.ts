import { create } from "zustand";
import type { Habit } from "@/lib/api";

type DemoHabitsStore = {
  habits: Habit[] | null;
  setHabits: (habits: Habit[]) => void;
};

/** 공유 데이터를 바꾸지 않도록 습관 변경은 이 브라우저의 메모리에만 둔다. */
export const useDemoHabits = create<DemoHabitsStore>((set) => ({
  habits: null,
  setHabits: (habits) => set({ habits }),
}));
