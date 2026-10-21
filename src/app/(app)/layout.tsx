import { TabBar } from "@/components/TabBar";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-dvh pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-label">
      {children}
      <TabBar />
    </div>
  );
}
