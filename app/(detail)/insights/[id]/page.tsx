import Link from "next/link";
import { notFound } from "next/navigation";
import SubHeader from "@/components/layout/SubHeader";
import MiniTrendChart from "@/components/MiniTrendChart";
import { api } from "@/lib/api";
import {
  describeAcceleration,
  describeVarianceRatio,
  describeVolatility,
  formatTargetEta,
} from "@/lib/stl-format";

export const dynamic = "force-dynamic";

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [decomp, insightsRes, { goal }] = await Promise.all([
    api.decompose(),
    api.insights(),
    api.home(),
  ]);

  const all = [insightsRes.today, ...insightsRes.past];
  const insight = all.find((i) => i.id === id);
  if (!insight) notFound();

  const last7 = decomp.points.slice(-7);
  const last7Avg = last7.reduce((acc, d) => acc + d.observed, 0) / last7.length;
  const best = last7.reduce((max, d) =>
    d.observed > max.observed ? d : max,
  );
  const weeklyGrowth = decomp.trend_slope_per_day * 7;
  const targetEtaLabel = formatTargetEta(
    decomp.days_to_target,
    decomp.target_eta_low,
    decomp.target_eta_high,
    decomp.last_trend,
    goal.target,
  );

  return (
    <>
      <SubHeader
        title="인사이트"
        backHref="/insights"
      />
      <div className="px-[20px] py-4 pb-10 flex flex-col gap-card-gap-v">
        <section className="gradient-growth rounded-card p-6 text-white shadow-[0_4px_14px_rgba(0,127,95,0.2)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">{insight.emoji}</span>
            <div>
              <h2 className="font-headline-sm text-headline-sm mb-2 text-white leading-snug">
                {insight.title}
              </h2>
              <p className="font-body-md text-body-md opacity-90">
                {insight.body}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5">
          <h3 className="font-headline-sm text-headline-sm mb-4 text-on-surface">
            장기 흐름 분석
          </h3>
          <div className="flex gap-4 mb-3 text-label-sm text-on-surface-variant">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-outline rounded-full" />
              실제 기록
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-[3px] bg-[#2B9348] rounded-full" />
              흐름선
            </div>
          </div>
          <MiniTrendChart data={decomp.points} />
          <div className="flex justify-end mt-3">
            <Link
              href="/analysis"
              className="font-label-sm text-label-sm font-semibold text-primary-container"
            >
              전체 차트로 보기 →
            </Link>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5">
          <h3 className="font-headline-sm text-headline-sm mb-4 text-on-surface">
            수치로 풀어드리면
          </h3>
          <div className="flex flex-col divide-y divide-outline-variant">
            <Stat
              icon="📅"
              label="지난 7일 평균"
              value={`${last7Avg.toFixed(0)}${goal.unit}/일`}
            />
            <Stat
              icon="🏆"
              label="최근 7일 최고 기록"
              value={`${best.date.slice(5)} · ${best.observed}${goal.unit}`}
            />
            <Stat
              icon="〰️"
              label="평균 변동량"
              value={`±${decomp.residual_std.toFixed(1)}${goal.unit} ${describeVolatility(decomp.residual_std)}`}
            />
            <Stat
              icon="📈"
              label="성장 속도"
              value={`매주 ${weeklyGrowth >= 0 ? "+" : ""}${weeklyGrowth.toFixed(1)}${goal.unit} ${describeAcceleration(decomp.trend_acceleration)}`}
            />
            <Stat
              icon="🎯"
              label="목표까지 예상"
              value={targetEtaLabel}
            />
            <Stat
              icon="📊"
              label="전체 변동 중 흐름 비중"
              value={`${(decomp.trend_variance_ratio * 100).toFixed(0)}% ${describeVarianceRatio(decomp.trend_variance_ratio)}`}
            />
          </div>
        </section>
      </div>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center py-3 gap-3 first:pt-0 last:pb-0">
      <span className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
        <span className="text-lg">{icon}</span>
        {label}
      </span>
      <span className="font-bold text-primary-container text-right">
        {value}
      </span>
    </div>
  );
}
