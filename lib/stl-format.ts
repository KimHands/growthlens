export function describeVolatility(std: number): string {
  if (std < 2) return "(잔잔한 편)";
  if (std < 5) return "(보통)";
  return "(흔들림 큼)";
}

export function describeAcceleration(acc: number): string {
  if (acc > 0.05) return "↑ 가속 중";
  if (acc < -0.05) return "↓ 둔화 중";
  return "→ 안정";
}

export function describeVarianceRatio(ratio: number): string {
  if (ratio >= 0.7) return "(매우 일관)";
  if (ratio >= 0.4) return "(일관적)";
  return "(변동 큼)";
}

export function formatTargetEta(
  days: number | null,
  low: number | null,
  high: number | null,
  lastTrend: number,
  target: number,
): string {
  if (lastTrend >= target) return "목표 달성! 🎉";
  if (days === null) return "현재 페이스로는 예측 어려움";
  if (low && high) return `${days}일 (${high}~${low}일)`;
  return `${days}일`;
}
