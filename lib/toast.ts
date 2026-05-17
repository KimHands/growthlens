import { create } from "zustand";

type ToastStore = {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

export const useToast = create<ToastStore>((set, get) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return {
    message: null,
    show: (message) => {
      set({ message });
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => get().hide(), 2000);
    },
    hide: () => {
      set({ message: null });
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    },
  };
});

/** 공용 헬퍼: 미구현 버튼 onClick에 그대로 연결 */
export const notImplemented = () =>
  useToast.getState().show("현재 미구현 상태입니다.");
