"use client";

import { useToast } from "@/lib/toast";

export default function Toast() {
  const message = useToast((s) => s.message);
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-[60] bg-on-surface text-surface-container-lowest px-5 py-3 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.2)] font-body-md text-body-md animate-toast-in pointer-events-none"
    >
      {message}
    </div>
  );
}
