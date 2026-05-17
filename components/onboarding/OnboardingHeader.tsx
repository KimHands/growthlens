"use client";

import { useRouter } from "next/navigation";
import BrandMark from "@/components/layout/BrandMark";
import { markOnboarded } from "@/lib/onboarding";

type Props = {
  skipHref?: string;
};

export default function OnboardingHeader({ skipHref = "/" }: Props) {
  const router = useRouter();

  function onSkip() {
    markOnboarded();
    router.push(skipHref);
  }

  return (
    <header className="flex justify-between items-center h-header-height px-container-margin w-full bg-transparent flex-shrink-0">
      <BrandMark />
      <button
        onClick={onSkip}
        className="font-label-lg text-label-lg text-[#4B5563] hover:opacity-80 transition-opacity"
      >
        건너뛰기
      </button>
    </header>
  );
}
