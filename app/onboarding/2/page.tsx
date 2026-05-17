"use client";

import { useRouter } from "next/navigation";
import OnboardingNav from "@/components/onboarding/OnboardingNav";

export default function OnboardingStep2() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 flex flex-col px-[20px] pt-8">
        {/* Preview Card */}
        <div className="w-full flex justify-center mb-10">
          <div className="w-full max-w-[320px] bg-surface-container-lowest border border-outline-variant rounded-card custom-shadow p-6 flex flex-col items-center">
            <div className="w-full gradient-bg rounded-lg p-5 flex items-center justify-between text-on-primary">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <span className="font-headline-md text-headline-md text-on-primary">
                  실제 성장 중
                </span>
              </div>
            </div>
            <div className="mt-6 w-full flex flex-col gap-4">
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-variant" />
                <div className="flex-1 h-3 rounded-full bg-surface-variant" />
              </div>
              <div className="flex items-center gap-3 opacity-30">
                <div className="w-8 h-8 rounded-full bg-surface-variant" />
                <div className="w-2/3 h-3 rounded-full bg-surface-variant" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-start w-full gap-2 mb-12">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            AI가 일시적 흔들림과
          </h1>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            진짜 성장을 구분해드려요
          </h2>
          <p className="font-body-lg text-body-lg text-outline mt-2 pt-2">
            3일 하락에 흔들리지 마세요. 데이터로 안심시켜드립니다.
          </p>
        </div>
      </main>

      <OnboardingNav
        step={2}
        totalSteps={4}
        onPrev={() => router.push("/onboarding/1")}
        onNext={() => router.push("/onboarding/3")}
      />
    </>
  );
}
