import MainHeader from "@/components/layout/MainHeader";
import BottomNav from "@/components/layout/BottomNav";
import NotImplementedButton from "@/components/NotImplementedButton";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { goal, series } = await api.home();
  const avg = (series.reduce((acc, p) => acc + p.observed, 0) / series.length).toFixed(0);

  return (
    <>
      <MainHeader />

      <main className="flex-1 px-[20px] py-[20px] flex flex-col gap-card-gap-v">
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="w-20 h-20 rounded-full gradient-growth flex items-center justify-center text-white font-headline-lg font-bold">
            종
          </div>
          <div className="text-center">
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              종건
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {goal.started_at} 부터 함께하고 있어요
            </p>
          </div>
        </div>

        <section className="bg-surface-container-lowest rounded-card border border-outline-variant ambient-shadow p-5 grid grid-cols-3 gap-2 text-center">
          <Stat label="연속" value={`${goal.streak}일`} />
          <Stat label="목표" value={`${goal.target}${goal.unit}`} />
          <Stat label="평균" value={`${avg}${goal.unit}`} />
        </section>

        <section className="flex flex-col">
          <Row icon="notifications" label="알림 설정" />
          <Row icon="palette" label="테마" />
          <Row icon="help" label="도움말" />
          <Row icon="logout" label="로그아웃" />
        </section>
      </main>

      <BottomNav activeTab="profile" />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-headline-md text-headline-md font-bold text-on-surface">
        {value}
      </span>
      <span className="font-label-sm text-label-sm text-on-surface-variant">
        {label}
      </span>
    </div>
  );
}

function Row({ icon, label }: { icon: string; label: string }) {
  return (
    <NotImplementedButton className="flex items-center justify-between py-4 border-b border-outline-variant text-left hover:bg-surface-variant/30 transition-colors px-2 -mx-2 rounded-lg w-full">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-on-surface-variant">
          {icon}
        </span>
        <span className="font-body-lg text-body-lg text-on-surface">
          {label}
        </span>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant">
        chevron_right
      </span>
    </NotImplementedButton>
  );
}
