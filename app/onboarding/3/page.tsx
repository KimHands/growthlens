"use client";

import { useRouter } from "next/navigation";
import OnboardingNav from "@/components/onboarding/OnboardingNav";

export default function OnboardingStep3() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 flex flex-col px-[20px] pt-8">
        {/* Feature Preview Card */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant ambient-shadow p-6 mb-10 w-full flex flex-col items-center justify-center relative min-h-[220px]">
          <div className="w-full h-32 relative">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 200 100"
            >
              <line stroke="#E5E7DA" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="200" y1="25" y2="25" />
              <line stroke="#E5E7DA" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="200" y1="50" y2="50" />
              <line stroke="#E5E7DA" strokeDasharray="2,2" strokeWidth="0.5" x1="0" x2="200" y1="75" y2="75" />
              <path
                d="M 0 80 Q 20 60, 50 70 T 100 40 T 150 50 T 200 10"
                fill="none"
                stroke="#007F5F"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <path
                d="M 0 80 Q 20 60, 50 70 T 100 40 T 150 50 T 200 10 L 200 100 L 0 100 Z"
                fill="#007F5F"
                opacity="0.15"
              />
              <circle cx="50" cy="70" fill="#FFFFFF" r="4" stroke="#007F5F" strokeWidth="2" />
              <circle cx="100" cy="40" fill="#FFFFFF" r="4" stroke="#007F5F" strokeWidth="2" />
              <circle cx="150" cy="50" fill="#FFFFFF" r="4" stroke="#007F5F" strokeWidth="2" />
              <circle cx="200" cy="10" fill="#007F5F" r="5" />
            </svg>
            <div className="absolute top-2 left-4 bg-[#ECFCCB] px-3 py-1 rounded-full border border-[#007F5F]/20 flex items-center gap-1 shadow-sm">
              <span
                className="material-symbols-outlined text-[#007F5F] text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                trending_up
              </span>
              <span className="font-label-sm text-label-sm text-[#007430]">
                성장 속도 15% 증가
              </span>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-left w-full mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            당신만의 성장 패턴을
          </h1>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            한눈에 확인하세요
          </h2>
          <p className="font-body-md text-body-md text-[#4B5563] leading-relaxed">
            주간 리포트와 함께 무엇이 효과 있었는지 알려드려요.
          </p>
        </div>
      </main>

      <OnboardingNav
        step={3}
        totalSteps={4}
        onPrev={() => router.push("/onboarding/2")}
        onNext={() => router.push("/onboarding/goal")}
      />
    </>
  );
}
