"use client";

import { useState } from "react";
import TrendChart from "@/components/TrendChart";
import type { DecomposeResponse } from "@/lib/api";

type Props = {
  decomp: DecomposeResponse;
  unit: string;
};

export default function AnalysisClient({ decomp, unit }: Props) {
  const [overlay, setOverlay] = useState(false);

  const avgAbsResidual =
    decomp.points.reduce((acc, d) => acc + Math.abs(d.residual), 0) /
    decomp.points.length;

  const last3 = decomp.points.slice(-3);
  const last3Range =
    Math.max(...last3.map((d) => d.observed)) -
    Math.min(...last3.map((d) => d.observed));

  const dailyGrowth =
    (decomp.last_trend - decomp.first_trend) / decomp.window_days;

  return (
    <div className="px-[20px] py-4 pb-10 flex flex-col gap-card-gap-v">
      <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5">
        <TrendChart data={decomp.points} />
      </section>

      <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-primary-container">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              판정: 일시적 변동 (안심)
            </h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant ml-8">
            걱정 안 하셔도 돼요
          </p>
        </div>

        <hr className="border-outline-variant" />

        <div className="flex flex-col gap-3">
          <Row
            label="성장 속도"
            value={`매일 약 ${dailyGrowth.toFixed(1)}${unit}씩 늘고 있어요`}
          />
          <Row
            label="평균 변동량"
            value={`±${avgAbsResidual.toFixed(1)}${unit} (잔잔한 편)`}
          />
          <Row
            label="최근 3일 변동"
            value={`${last3Range.toFixed(1)}${unit} (정상 범위 안)`}
          />
        </div>

        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
          * 정상 범위는 평균 변동량의 1.5배까지를 말해요
        </p>
      </section>

      <div className="flex justify-between items-center py-2 px-2">
        <span className="font-body-md text-body-md text-on-surface font-medium">
          과거 비슷한 흐름 겹쳐보기
        </span>
        <button
          aria-label="과거 흐름 겹쳐보기 토글"
          aria-pressed={overlay}
          onClick={() => setOverlay((v) => !v)}
          className={
            "w-12 h-6 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 " +
            (overlay ? "bg-primary-container" : "bg-outline-variant")
          }
        >
          <span
            className={
              "absolute top-1 w-4 h-4 rounded-full bg-surface-container-lowest transition-all shadow-sm " +
              (overlay ? "left-7" : "left-1")
            }
          />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="font-body-md text-body-md text-on-surface-variant">
        {label}
      </span>
      <span className="font-label-lg text-label-lg text-on-surface font-bold text-right">
        {value}
      </span>
    </div>
  );
}
