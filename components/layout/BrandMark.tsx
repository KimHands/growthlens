import Link from "next/link";

export default function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full border-2 border-[#007F5F] bg-white flex items-center justify-center">
        <span
          className="material-symbols-outlined text-[#007F5F]"
          style={{ fontSize: 18, fontVariationSettings: "'FILL' 0" }}
        >
          monitoring
        </span>
      </div>
      <span className="font-headline-md text-headline-md font-bold text-[#007F5F]">
        GrowthLens
      </span>
    </Link>
  );
}
