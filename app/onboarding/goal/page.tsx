"use client";

import { useRouter } from "next/navigation";
import OnboardingNav from "@/components/onboarding/OnboardingNav";
import { completeOnboarding } from "@/lib/onboarding";

export default function OnboardingGoal() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 flex flex-col items-center px-[20px] py-4">
        <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 flex flex-col gap-card-gap-v text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            데모로 둘러보기
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            로그인 없이 14일치 예시 기록으로 분석 화면을 체험해요. 화면의 수치는
            모두 예시 데이터로 계산한 값이에요.
          </p>
        </div>
      </main>

      <OnboardingNav
        step={4}
        totalSteps={4}
        onPrev={() => router.push("/onboarding/3")}
        onNext={() => completeOnboarding("/")}
        nextLabel="시작하기"
      />
    </>
  );
}
