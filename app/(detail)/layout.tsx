export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md min-h-[100dvh] flex flex-col bg-surface-container-lowest">
      {children}
    </div>
  );
}
