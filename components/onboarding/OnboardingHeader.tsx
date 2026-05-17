"use client";

import BrandMark from "@/components/layout/BrandMark";
import { completeOnboarding } from "@/lib/onboarding";

type Props = {
  skipHref?: string;
};

export default function OnboardingHeader({ skipHref = "/" }: Props) {
  return (
    <header className="flex justify-between items-center h-header-height px-container-margin w-full bg-transparent flex-shrink-0">
      <BrandMark />
      <button
        onClick={() => completeOnboarding(skipHref)}
        className="font-label-lg text-label-lg text-[#4B5563] hover:opacity-80 transition-opacity"
      >
        건너뛰기
      </button>
    </header>
  );
}
