"use client";

import { notImplemented } from "@/lib/toast";

export default function FabAddButton() {
  return (
    <button
      aria-label="기록 추가"
      onClick={notImplemented}
      className="fixed bottom-[88px] right-1/2 translate-x-[180px] w-14 h-14 gradient-growth rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_rgba(0,127,95,0.35)] hover:scale-105 transition-transform z-40"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
        add
      </span>
    </button>
  );
}
