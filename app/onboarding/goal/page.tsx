"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import OnboardingNav from "@/components/onboarding/OnboardingNav";

const categories = ["공부", "운동", "자기개발"] as const;

export default function OnboardingGoal() {
  const router = useRouter();
  const [category, setCategory] = useState<(typeof categories)[number]>("공부");

  return (
    <>
      <main className="flex-1 flex flex-col items-center px-[20px] py-4">
        <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 flex flex-col gap-card-gap-v">
          <div className="text-center mb-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              새로운 목표 설정
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              당신의 성장을 위한 첫 걸음
            </p>
          </div>

          {/* Nickname */}
          <div className="flex flex-col gap-stack-sm">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="예: 종건"
              className="h-[52px] px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface placeholder-outline focus:outline-none focus:border-2 focus:border-primary transition-colors"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-stack-sm">
            <span className="font-label-lg text-label-lg text-on-surface">
              목표 카테고리
            </span>
            <div className="flex bg-surface-container-low rounded-xl p-1">
              {categories.map((c) => {
                const on = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={
                      "flex-1 h-[44px] rounded-lg font-label-lg text-label-lg flex items-center justify-center transition-all " +
                      (on
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Metric */}
          <div className="flex flex-col gap-stack-sm">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="metric-type"
            >
              지표 / 목표 수치
            </label>
            <div className="flex gap-stack-sm">
              <div className="relative flex-1">
                <select
                  id="metric-type"
                  className="w-full h-[52px] pl-4 pr-10 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:border-2 focus:border-primary transition-colors cursor-pointer"
                  defaultValue="study_time"
                >
                  <option value="study_time">공부 시간 (분)</option>
                  <option value="pages">페이지 수</option>
                  <option value="sessions">세션 수</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  expand_more
                </span>
              </div>
              <input
                type="number"
                defaultValue={1000}
                className="w-[100px] h-[52px] px-4 text-center bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:border-2 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-stack-sm">
            <label
              className="font-label-lg text-label-lg text-on-surface"
              htmlFor="deadline"
            >
              마감일
            </label>
            <input
              id="deadline"
              type="date"
              defaultValue="2026-08-01"
              className="w-full h-[52px] px-4 bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:border-2 focus:border-primary transition-colors"
            />
          </div>
        </div>
      </main>

      <OnboardingNav
        step={4}
        totalSteps={4}
        onPrev={() => router.push("/onboarding/3")}
        onNext={() => router.push("/")}
        nextLabel="시작하기"
      />
    </>
  );
}
