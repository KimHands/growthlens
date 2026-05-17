"use client";

import BrandMark from "./BrandMark";
import { notImplemented } from "@/lib/toast";

export default function MainHeader() {
  return (
    <header className="bg-surface-container-lowest flex justify-between items-center h-header-height px-container-margin w-full sticky top-0 z-40">
      <BrandMark />

      <div className="flex items-center gap-stack-md text-on-surface">
        <button
          aria-label="알림"
          onClick={notImplemented}
          className="p-2 rounded-full hover:bg-surface-variant transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 24, fontVariationSettings: "'FILL' 0" }}
          >
            notifications
          </span>
        </button>
        <button
          aria-label="설정"
          onClick={notImplemented}
          className="p-2 rounded-full hover:bg-surface-variant transition-colors"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 24, fontVariationSettings: "'FILL' 0" }}
          >
            settings
          </span>
        </button>
      </div>
    </header>
  );
}
