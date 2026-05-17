export const ONBOARDED_COOKIE = "gl_onboarded";

/** 온보딩 완료(또는 건너뛰기) + 풀 페이지 이동.
 *  router.push는 RSC 캐시 + middleware redirect와 충돌이 있어,
 *  cookie 적용을 확실히 하려면 full navigation을 사용한다. */
export function completeOnboarding(href: string = "/") {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${ONBOARDED_COOKIE}=1; path=/; max-age=${oneYear}; SameSite=Lax`;
  window.location.href = href;
}
