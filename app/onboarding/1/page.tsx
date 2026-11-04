"use client";

import { useRouter } from "next/navigation";
import OnboardingNav from "@/components/onboarding/OnboardingNav";

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 flex flex-col px-[20px] pt-4">
        {/* Preview Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-card custom-shadow p-6 w-full mb-10">
          <div className="flex items-center mb-4">
            <span
              className="material-symbols-outlined text-primary-container mr-2"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              edit_document
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface">
              오늘의 기록
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-label-lg text-label-lg text-on-surface-variant mb-1">
                공부 시간
              </label>
              <input
                className="w-full h-12 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 font-body-md text-body-md text-on-surface placeholder-[#4B5563] focus:outline-none focus:border-primary-container transition-all"
                placeholder="예: 2시간 30분"
                type="text"
                disabled
              />
            </div>
            <div>
              <label className="block font-label-lg text-label-lg text-on-surface-variant mb-1">
                주요 학습 내용
              </label>
              <input
                className="w-full h-12 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 font-body-md text-body-md text-on-surface placeholder-[#4B5563] focus:outline-none focus:border-primary-container transition-all"
                placeholder="오늘 배운 내용을 간단히 적어보세요"
                type="text"
                disabled
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white font-label-lg text-label-lg opacity-70 flex justify-center items-center"
            >
              기록 저장하기
            </button>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center w-full mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            매일의 작은 기록이
          </h1>
          <h2 className="font-headline-md text-headline-md text-primary-container mb-4">
            당신의 성장을 만들어요
          </h2>
          <p className="font-body-md text-body-md text-[#4B5563] max-w-[280px] mx-auto">
            위 입력란은 예시 화면이에요. 기록을 흐름과 변동으로 나눠서 보여 드려요.
          </p>
        </div>
      </main>

      <OnboardingNav
        step={1}
        totalSteps={4}
        onNext={() => router.push("/onboarding/2")}
      />
    </>
  );
}
