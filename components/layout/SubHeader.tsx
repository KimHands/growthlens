"use client";

import { useRouter } from "next/navigation";
import { notImplemented } from "@/lib/toast";

type Props = {
  title: string;
  backHref?: string;
  rightIcon?: string;
  rightAriaLabel?: string;
  onRightClick?: () => void;
};

export default function SubHeader({
  title,
  backHref,
  rightIcon,
  rightAriaLabel,
  onRightClick,
}: Props) {
  const router = useRouter();
  const goBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <header className="flex justify-between items-center h-[64px] px-[20px] w-full bg-surface-container-lowest sticky top-0 z-40 border-b border-[#E5E7DA]/40">
      <button
        aria-label="뒤로 가기"
        onClick={goBack}
        className="w-10 h-10 -ml-2 flex items-center justify-center text-[#1A2E0D] hover:opacity-70 transition-opacity"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="font-headline-md text-headline-md text-[#1A2E0D] font-bold text-center flex-1 truncate px-2">
        {title}
      </h1>
      {rightIcon ? (
        <button
          aria-label={rightAriaLabel ?? "액션"}
          onClick={onRightClick ?? notImplemented}
          className="w-10 h-10 -mr-2 flex items-center justify-center text-[#1A2E0D] hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">{rightIcon}</span>
        </button>
      ) : (
        <div className="w-10 h-10 -mr-2" aria-hidden />
      )}
    </header>
  );
}
