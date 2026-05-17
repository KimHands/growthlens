import OnboardingHeader from "@/components/onboarding/OnboardingHeader";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md min-h-[100dvh] flex flex-col bg-surface-container-lowest">
      <OnboardingHeader />
      {children}
    </div>
  );
}
