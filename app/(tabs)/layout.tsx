export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto w-full max-w-md min-h-[100dvh] flex flex-col bg-surface-container-lowest"
      style={{
        paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
      }}
    >
      {children}
    </div>
  );
}
