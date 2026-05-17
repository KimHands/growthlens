"use client";

import { notImplemented } from "@/lib/toast";

type Props = {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

export default function NotImplementedButton({
  className,
  children,
  ariaLabel,
}: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={notImplemented}
      className={className}
    >
      {children}
    </button>
  );
}
