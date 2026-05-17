import SubHeader from "@/components/layout/SubHeader";
import AnalysisClient from "./AnalysisClient";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AnalysisPage() {
  const [decomp, { goal }] = await Promise.all([api.decompose(), api.home()]);
  return (
    <>
      <SubHeader
        title={`${goal.title} · 분석`}
        backHref="/"
        rightIcon="share"
        rightAriaLabel="공유"
      />
      <AnalysisClient decomp={decomp} unit={goal.unit} />
    </>
  );
}
