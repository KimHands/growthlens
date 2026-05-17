"use client";

import Link from "next/link";

export type TabKey = "home" | "habits" | "insights" | "profile";

type Item = {
  key: TabKey;
  href: string;
  icon: string;
  label: string;
};

const items: Item[] = [
  { key: "home", href: "/", icon: "home", label: "홈" },
  { key: "habits", href: "/habits", icon: "fact_check", label: "습관" },
  { key: "insights", href: "/insights", icon: "insights", label: "인사이트" },
  { key: "profile", href: "/profile", icon: "person", label: "프로필" },
];

type Props = {
  activeTab: TabKey;
};

export default function BottomNav({ activeTab }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[64px] bg-white border-t border-[#E5E7DA] flex justify-around items-center z-50"
    >
      {items.map((item) => {
        const active = item.key === activeTab;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={
              "flex flex-col items-center justify-center w-full h-full transition-colors " +
              (active
                ? "text-[#007F5F] font-semibold"
                : "text-[#6B7280] hover:text-[#1A2E0D]")
            }
          >
            <span
              className="material-symbols-outlined mb-1"
              style={{
                fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                fontSize: 24,
              }}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-label-sm">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
