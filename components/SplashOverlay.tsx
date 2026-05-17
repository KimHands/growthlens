"use client";

type Props = {
  onClose: () => void;
};

export default function SplashOverlay({ onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-label="GrowthLens 스플래시"
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#F4F8EE] to-white flex flex-col items-center justify-between py-20 px-8 cursor-pointer animate-toast-in"
    >
      <div aria-hidden />

      <div className="flex flex-col items-center gap-5">
        <div className="w-[96px] h-[96px] bg-white rounded-[28px] shadow-[0_8px_24px_rgba(0,127,95,0.15)] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.svg"
            alt="GrowthLens 로고"
            className="w-[68px] h-[68px]"
          />
        </div>
        <h1 className="font-headline-lg text-[28px] font-bold text-[#007F5F] leading-none">
          GrowthLens
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          성장을 읽어주는 앱
        </p>
      </div>

      <p className="font-label-sm text-label-sm tracking-[0.25em] text-outline">
        YOUR PATH TO GROWTH
      </p>
    </div>
  );
}
