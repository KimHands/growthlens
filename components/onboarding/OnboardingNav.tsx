"use client";

type Props = {
  step: number;
  totalSteps: number;
  onPrev?: () => void;
  onNext: () => void;
  nextLabel?: string;
};

export default function OnboardingNav({
  step,
  totalSteps,
  onPrev,
  onNext,
  nextLabel,
}: Props) {
  const isFirst = step === 1;
  const isLast = step === totalSteps;
  const dots = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div
      className="mt-auto w-full flex items-center justify-between px-[20px] pt-4"
      style={{
        paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
      }}
    >
      {/* LEFT: 이전 (step 1 = invisible로 자리 유지) */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className={
          "text-[14px] text-[#4B5563] font-medium hover:opacity-80 transition-opacity w-16 text-left " +
          (isFirst ? "invisible" : "")
        }
      >
        이전
      </button>

      {/* CENTER: dot indicators */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        {dots.map((d) => {
          const active = d === step;
          return (
            <div
              key={d}
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (active ? "w-6 bg-[#007F5F]" : "w-2 bg-[#E5E7DA]")
              }
              aria-current={active ? "step" : undefined}
            />
          );
        })}
      </div>

      {/* RIGHT: 마지막 단계면 "시작하기" 풀폭 버튼, 아니면 원형 → */}
      {isLast ? (
        <button
          type="button"
          onClick={onNext}
          className="flex-1 max-w-[160px] h-14 ml-3 rounded-[28px] bg-[#007F5F] text-white font-label-lg text-label-lg font-semibold flex items-center justify-center shadow-[0_4px_12px_rgba(0,127,95,0.25)] hover:opacity-90 transition-opacity"
        >
          {nextLabel ?? "시작하기"}
        </button>
      ) : (
        <div className="w-16 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            aria-label={nextLabel ?? "다음"}
            className="w-14 h-14 rounded-full bg-[#007F5F] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{ boxShadow: "0 4px 12px rgba(0, 127, 95, 0.25)" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
              arrow_forward
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
