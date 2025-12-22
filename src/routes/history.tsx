import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  FileText,
  Filter,
  History as HistoryIcon,
  LayoutPanelLeft,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/shared/logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout, useUser } from "@/data/auth";
import { useActivityStats, useHistory } from "@/data/history";
import { requireAuth } from "@/lib/auth-utils";
import type { ActivityType } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  beforeLoad: async ({ context }) => {
    await requireAuth(context.queryClient);
  },
  component: HistoryPage,
});

function HistoryPage() {
  const { data: user } = useUser();
  const logout = useLogout();
  const [activityType, setActivityType] = useState<ActivityType | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const { data: historyData, isLoading } = useHistory({
    type: activityType === "all" ? undefined : activityType,
    date_from: dateFrom || undefined,
    date_to: dateTo || undefined,
    per_page: 20,
    page,
  });

  const { data: statsData } = useActivityStats("month");

  const activities = historyData?.data.activities || [];
  const pagination = historyData?.data.pagination;
  const stats = statsData?.data.stats;

  const activityTypeColors: Record<ActivityType, string> = {
    document_upload: "bg-blue-100 text-blue-700",
    document_view: "bg-purple-100 text-purple-700",
    document_delete: "bg-red-100 text-red-700",
    summary_generate: "bg-green-100 text-green-700",
    summary_view: "bg-teal-100 text-teal-700",
    quiz_generate: "bg-orange-100 text-orange-700",
    quiz_start: "bg-yellow-100 text-yellow-700",
    quiz_complete: "bg-emerald-100 text-emerald-700",
    profile_update: "bg-gray-100 text-gray-700",
  };

  const activityTypeLabels: Record<ActivityType, string> = {
    document_upload: "Upload Dokumen",
    document_view: "Lihat Dokumen",
    document_delete: "Hapus Dokumen",
    summary_generate: "Buat Ringkasan",
    summary_view: "Lihat Ringkasan",
    quiz_generate: "Buat Kuis",
    quiz_start: "Mulai Kuis",
    quiz_complete: "Selesai Kuis",
    profile_update: "Update Profil",
  };

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
      <aside className="fixed top-0 left-0 z-40 flex-col justify-between hidden h-screen border-r lg:flex bg-background w-72 border-border">
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
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-muted-foreground hover:bg-muted",
              )}
            >
              <LayoutPanelLeft className="size-6" aria-hidden="true" />
              <span className="text-base font-medium">Dashboard</span>
            </Link>

            <Link
              to="/history"
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors bg-primary/10 text-primary",
              )}
              aria-current="page"
            >
              <HistoryIcon className="size-6" aria-hidden="true" />
              <span className="text-base font-medium">History</span>
            </Link>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t bg-muted/50 border-border">
          <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
            <Button
              onClick={handleLogout}
              disabled={logout.isPending}
              className={cn(
                buttonVariants(),
                "w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
              )}
              aria-label={
                logout.isPending ? "Sedang logout..." : "Logout dari akun"
              }
            >
              <LogOut className="size-6" aria-hidden="true" />
              <span className="text-base font-semibold">
                {logout.isPending ? "Logging out..." : "Logout"}
              </span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <HistoryIcon className="size-8" />
              Riwayat Aktivitas
            </h1>
            <p className="text-muted-foreground">
              Lihat semua aktivitas Anda dalam menggunakan aplikasi
            </p>
          </div>

          {/* Statistics Cards */}
          {stats && (
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Aktivitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.total_activities}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Dokumen Diunggah
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.documents_uploaded}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Kuis Diselesaikan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.quizzes_completed}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Ringkasan Dibuat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.summaries_generated}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="size-5" />
                Filter Aktivitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label htmlFor="type">Jenis Aktivitas</Label>
                  <Select
                    value={activityType}
                    onValueChange={(v) =>
                      setActivityType(v as typeof activityType)
                    }
                  >
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="document_upload">
                        Upload Dokumen
                      </SelectItem>
                      <SelectItem value="summary_generate">
                        Buat Ringkasan
                      </SelectItem>
                      <SelectItem value="quiz_complete">
                        Kuis Selesai
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateFrom">Dari Tanggal</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="dateTo">Sampai Tanggal</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActivityType("all");
                      setDateFrom("");
                      setDateTo("");
                      setPage(1);
                    }}
                    className="w-full"
                  >
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity List */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Aktivitas</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {new Array(5).fill(null).map(() => (
                    <Skeleton
                      key={crypto.randomUUID()}
                      className="w-full h-20"
                    />
                  ))}
                </div>
              ) : activities.length === 0 ? (
                <div className="py-12 text-center">
                  <HistoryIcon className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Tidak ada aktivitas ditemukan
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 transition-colors border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-center rounded-full size-10 bg-primary/10 shrink-0">
                          <FileText className="size-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={cn(
                                "text-xs",
                                activityTypeColors[activity.activity_type],
                              )}
                            >
                              {activityTypeLabels[activity.activity_type]}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="size-3" />
                              {new Date(activity.created_at).toLocaleString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </div>
                          </div>

                          <p className="mb-1 font-medium">
                            {activity.description}
                          </p>

                          {activity.metadata.document_name && (
                            <p className="text-sm text-muted-foreground">
                              Dokumen: {activity.metadata.document_name}
                            </p>
                          )}

                          {activity.metadata.score !== undefined && (
                            <p className="text-sm text-muted-foreground">
                              Skor: {activity.metadata.score}%
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination && pagination.last_page > 1 && (
                    <div className="flex items-center justify-between pt-6 mt-6 border-t">
                      <div className="text-sm text-muted-foreground">
                        Menampilkan {pagination.from} - {pagination.to} dari{" "}
                        {pagination.total} aktivitas
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Sebelumnya
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setPage((p) =>
                              Math.min(pagination.last_page, p + 1),
                            )
                          }
                          disabled={page === pagination.last_page}
                        >
                          Selanjutnya
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
