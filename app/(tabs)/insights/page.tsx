import MainHeader from "@/components/layout/MainHeader";
import BottomNav from "@/components/layout/BottomNav";
import BarTrendChart from "@/components/BarTrendChart";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const [decomp, insightsRes, { goal }] = await Promise.all([
    api.decompose(),
    api.insights(),
    api.home(),
  ]);

  const today = insightsRes.today;
  const last7 = decomp.points.slice(-7);
  const last7Avg = last7.reduce((acc, d) => acc + d.observed, 0) / last7.length;
  const best = decomp.points.reduce((max, d) =>
    d.observed > max.observed ? d : max,
  );
  const avgAbsResidual =
    decomp.points.reduce((acc, d) => acc + Math.abs(d.residual), 0) /
    decomp.points.length;
  const weeklyGrowth =
    ((decomp.last_trend - decomp.first_trend) / decomp.window_days) * 7;

  return (
    <>
      <MainHeader />

      <main className="flex-1 px-[20px] pt-2 pb-6 flex flex-col gap-card-gap-v">
        <div className="flex flex-col gap-[4px] pt-2">
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            AI Insights
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            데이터로 풀어드리는 성장 이야기
          </p>
        </div>

        {/* Card 1: Verdict */}
        <a
          href={`/insights/${today.id}`}
          className="gradient-growth rounded-card p-6 text-white shadow-[0_4px_14px_rgba(0,127,95,0.2)]"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">{today.emoji}</span>
            <div>
              <h2 className="font-headline-sm text-headline-sm mb-2 text-white leading-snug">
                {today.title}
              </h2>
              <p className="font-body-md text-body-md opacity-90">
                {today.body}
              </p>
            </div>
          </div>
        </a>

        {/* Card 2: Trend Chart */}
        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5">
          <h3 className="font-headline-sm text-headline-sm mb-4 text-on-surface">
            장기 흐름 분석
          </h3>
          <div className="flex gap-4 mb-3 text-label-sm text-on-surface-variant">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#E5E7DA] rounded-sm" />
              실제 기록
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-[3px] bg-[#2B9348] rounded-full" />
              실제 흐름
            </div>
          </div>
          <BarTrendChart data={last7} />
        </section>

        {/* Card 3: Numeric Breakdown */}
        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5">
          <h3 className="font-headline-sm text-headline-sm mb-4 text-on-surface">
            수치로 풀어드리면
          </h3>
          <div className="flex flex-col divide-y divide-outline-variant">
            <Stat
              icon="📅"
              label="지난 7일 평균"
              value={`${last7Avg.toFixed(0)}${goal.unit}/일 (${decomp.trend_change_pct >= 0 ? "+" : ""}${decomp.trend_change_pct}%)`}
            />
            <Stat
              icon="🏆"
              label="이번 주 최고 기록"
              value={`${best.date.slice(5)} · ${best.observed}${goal.unit}`}
            />
            <Stat
              icon="〰️"
              label="평균 변동량"
              value={`±${avgAbsResidual.toFixed(0)}${goal.unit} (잔잔한 편)`}
            />
            <Stat
              icon="📈"
              label="성장 속도"
              value={`매주 약 ${weeklyGrowth.toFixed(1)}${goal.unit}씩 증가`}
            />
            <Stat
              icon="🎯"
              label="목표까지 예상"
              value="37일 (예상 범위 30~45일)"
            />
          </div>
        </section>

        {/* Card 4: Plain Explanation */}
        <section className="bg-subtle-tint rounded-card p-6">
          <h3 className="font-headline-sm text-headline-sm mb-2 text-on-surface">
            쉽게 말하면
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            최근 며칠간의 수치 감소는 학습 곡선에서 흔히 나타나는 자연스러운
            조정기입니다. 장기적인 추세선은 여전히 우상향을 그리고 있으며,
            이는 기초 실력이 탄탄하게 다져지고 있음을 의미합니다.
          </p>
        </section>

        {/* Card 5: Burnout Warning */}
        <section className="bg-peach rounded-card p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-headline-sm text-headline-sm text-peach-dark flex items-center gap-2">
              <span aria-hidden>⚠️</span> 번아웃 위험
            </h3>
            <button className="text-peach-dark font-label-sm text-label-sm font-bold underline">
              패턴 확인하기
            </button>
          </div>
          <p className="font-body-md text-body-md text-peach-dark opacity-90">
            휴식이 필요해 보여요. 수면 패턴이 불규칙해지고 있습니다.
          </p>
        </section>
      </main>

      <BottomNav activeTab="insights" />
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
