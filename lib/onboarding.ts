export const ONBOARDED_COOKIE = "gl_onboarded";

/** 온보딩 완료(또는 건너뛰기) — 클라이언트에서 호출. */
export function markOnboarded() {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${ONBOARDED_COOKIE}=1; path=/; max-age=${oneYear}; SameSite=Lax`;
}
