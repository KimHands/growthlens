"use client";

import { useState } from "react";
import TrendChart from "@/components/TrendChart";
import type { DecomposeResponse } from "@/lib/api";
import {
  describeAcceleration,
  describeVarianceRatio,
  describeVolatility,
  formatTargetEta,
} from "@/lib/stl-format";

type Props = {
  decomp: DecomposeResponse;
  unit: string;
  target: number;
};

export default function AnalysisClient({ decomp, unit, target }: Props) {

  const last3 = decomp.points.slice(-3);
  const last3Range =
    Math.max(...last3.map((d) => d.observed)) -
    Math.min(...last3.map((d) => d.observed));

  const dailyGrowth = decomp.trend_slope_per_day;
  const weeklyGrowth = dailyGrowth * 7;
  const last3WithinNormal = last3Range <= decomp.residual_std * 3;

  const verdict = pickVerdict({
    isRising: dailyGrowth > 0.05,
    isFalling: dailyGrowth < -0.05,
    last3WithinNormal,
  });

  const targetEtaLabel = formatTargetEta(
    decomp.days_to_target,
    decomp.target_eta_low,
    decomp.target_eta_high,
    decomp.last_trend,
    target,
  );

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
                {verdict.icon}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {verdict.title}
            </h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant ml-8">
            {verdict.sub}
          </p>
        </div>

        <hr className="border-outline-variant" />

        <div className="flex flex-col gap-3">
          <Row
            label="성장 속도"
            value={`매일 ${dailyGrowth >= 0 ? "+" : ""}${dailyGrowth.toFixed(2)}${unit} / 주간 ${weeklyGrowth >= 0 ? "+" : ""}${weeklyGrowth.toFixed(1)}${unit}`}
          />
          <Row
            label="가속도"
            value={`${decomp.trend_acceleration >= 0 ? "+" : ""}${decomp.trend_acceleration.toFixed(2)} ${describeAcceleration(decomp.trend_acceleration)}`}
          />
          <Row
            label="평균 변동량 (잔차 σ)"
            value={`±${decomp.residual_std.toFixed(2)}${unit} ${describeVolatility(decomp.residual_std)}`}
          />
          <Row
            label="시즌 진폭 (주중↔주말)"
            value={`${decomp.seasonal_amplitude.toFixed(1)}${unit} (Δ ${decomp.weekday_vs_weekend >= 0 ? "+" : ""}${decomp.weekday_vs_weekend.toFixed(1)})`}
          />
          <Row
            label="전체 변동 중 흐름 비중"
            value={`${(decomp.trend_variance_ratio * 100).toFixed(0)}% ${describeVarianceRatio(decomp.trend_variance_ratio)}`}
          />
          <Row label="목표까지 예상" value={targetEtaLabel} />
          <Row
            label="최근 3일 변동"
            value={`${last3Range.toFixed(1)}${unit} ${last3WithinNormal ? "(정상 범위)" : "(평소보다 큼)"}`}
          />
        </div>

        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
          * 정상 범위는 평균 변동량(σ)의 3배 이내를 말해요.
          STL: period=7, robust=True.
        </p>
      </section>
    </div>
  );
}

function pickVerdict(input: {
  isRising: boolean;
  isFalling: boolean;
  last3WithinNormal: boolean;
}): { title: string; sub: string; icon: string } {
  if (input.isFalling) {
    return {
      title: "판정: 흐름 약화",
      sub: "트렌드가 빠지고 있어요. 환경 변수 점검 권장.",
      icon: "trending_down",
    };
  }
  if (input.isRising && input.last3WithinNormal) {
    return {
      title: "판정: 안정적 상승",
      sub: "최근 변동은 정상 범위 안. 걱정 안 하셔도 돼요.",
      icon: "check_circle",
    };
  }
  if (input.isRising) {
    return {
      title: "판정: 상승 중 일시적 변동",
      sub: "트렌드는 상승. 최근 변동만 평소보다 큼.",
      icon: "trending_up",
    };
  }
  return {
    title: "판정: 평탄한 구간",
    sub: "큰 변화 없음. 다음 도약 전의 정체기일 수 있어요.",
    icon: "remove",
  };
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-3">
      <span className="font-body-md text-body-md text-on-surface-variant shrink-0">
        {label}
      </span>
      <span className="font-label-lg text-label-lg text-on-surface font-bold text-right">
        {value}
      </span>
    </div>
  );
}
