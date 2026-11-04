import BrandMark from "./BrandMark";

export default function MainHeader() {
  return (
    <header className="bg-surface-container-lowest flex justify-between items-center h-header-height px-container-margin w-full sticky top-0 z-40">
      <BrandMark />

      <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold px-[10px] py-[4px] rounded-full">
        데모 데이터
      </span>
    </header>
  );
}
