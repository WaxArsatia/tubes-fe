import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { History, LayoutPanelLeft, LogOut, Settings } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLogout, useUser } from "@/data/auth";
import { redirectAdminToAdminDashboard, requireAuth } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    // Check if user is authenticated
    const user = await requireAuth(context.queryClient);
    // Redirect admins to admin dashboard
    redirectAdminToAdminDashboard(user);
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { data: user } = useUser();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        globalThis.location.href = "/auth/login";
      },
    });
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        user={user ?? undefined}
        onLogout={handleLogout}
        isLoggingOut={logout.isPending}
      />

      {/* Render child routes */}
      <Outlet />
    </div>
  );
}

// ============================================================================
// Sidebar Component
// ============================================================================
interface DashboardSidebarProps {
  user: { name: string; email: string } | undefined;
  onLogout: () => void;
  isLoggingOut: boolean;
}

function DashboardSidebar({
  user,
  onLogout,
  isLoggingOut,
}: Readonly<DashboardSidebarProps>) {
  return (
    <aside className="fixed top-0 left-0 z-40 hidden lg:flex flex-col justify-between h-screen border-r bg-background w-72 border-border">
      {/* Top Section */}
      <div className="border-b border-border">
        <div className="flex flex-col gap-8 px-6 pt-6 pb-6">
          <Logo size="lg" />

          <div className="bg-muted border border-border rounded-2xl p-3.5 flex items-center gap-3">
            <UserAvatar name={user?.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-5 truncate text-foreground">
                {user?.name || "User"}
              </p>
            </div>
            <Link to="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 size-6 hover:bg-muted-foreground/10"
                aria-label="Pengaturan profil"
              >
                <Settings className="size-6 text-muted-foreground" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-4 py-6 overflow-auto"
        aria-label="Menu navigasi utama"
      >
        <div className="flex flex-col gap-2">
          <div className="px-4 mb-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
              Menu Utama
            </h2>
          </div>

          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors bg-primary/10 text-primary",
            )}
            aria-current="page"
          >
            <LayoutPanelLeft className="size-6" aria-hidden="true" />
            <span className="text-base font-medium">Dashboard</span>
          </Link>

          <Link
            to="/history"
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors text-muted-foreground hover:bg-muted",
            )}
          >
            <History className="size-6" aria-hidden="true" />
            <span className="text-base font-medium">History</span>
          </Link>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t bg-muted/50 border-border">
        <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
          <Button
            onClick={onLogout}
            disabled={isLoggingOut}
            className={cn(
              buttonVariants(),
              "w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
            )}
            aria-label={isLoggingOut ? "Sedang logout..." : "Logout dari akun"}
          >
            <LogOut className="size-6" aria-hidden="true" />
            <span className="text-base font-semibold">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
