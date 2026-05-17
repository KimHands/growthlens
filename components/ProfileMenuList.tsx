"use client";

import { useState } from "react";
import { notImplemented } from "@/lib/toast";
import SplashOverlay from "./SplashOverlay";

type Item = {
  key: string;
  icon: string;
  label: string;
};

const items: Item[] = [
  { key: "notifications", icon: "notifications", label: "알림 설정" },
  { key: "theme", icon: "palette", label: "테마" },
  { key: "help", icon: "help", label: "도움말" },
  { key: "logout", icon: "logout", label: "로그아웃" },
];

const HELP_TRIGGER = 5;
const THEME_TRIGGER = 3;

export default function ProfileMenuList() {
  const [helpCount, setHelpCount] = useState(0);
  const [themeCount, setThemeCount] = useState(0);
  const [showSplash, setShowSplash] = useState(false);

  function reveal() {
    setShowSplash(true);
    setHelpCount(0);
    setThemeCount(0);
  }

  function onClick(key: string) {
    if (key === "help") {
      const next = helpCount + 1;
      if (next >= HELP_TRIGGER) return reveal();
      setHelpCount(next);
    } else if (key === "theme") {
      const next = themeCount + 1;
      if (next >= THEME_TRIGGER) return reveal();
      setThemeCount(next);
    }
    notImplemented();
  }

  return (
    <>
      <section className="flex flex-col">
        {items.map((it) => (
          <button
            key={it.key}
            type="button"
            onClick={() => onClick(it.key)}
            className="flex items-center justify-between py-4 border-b border-outline-variant text-left hover:bg-surface-variant/30 transition-colors px-2 -mx-2 rounded-lg w-full"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">
                {it.icon}
              </span>
              <span className="font-body-lg text-body-lg text-on-surface">
                {it.label}
              </span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              chevron_right
            </span>
          </button>
        ))}
      </section>

      {showSplash && <SplashOverlay onClose={() => setShowSplash(false)} />}
    </>
  );
}
