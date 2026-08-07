import { requireUser } from "@/lib/auth/guard";
import { ToastProvider } from "@/components/ui/Feedback";
import { AppShell } from "@/components/shell/AppShell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <ToastProvider>
      <AppShell userName={user.name} orgName={user.org.name}>
        {children}
      </AppShell>
    </ToastProvider>
  );
}
