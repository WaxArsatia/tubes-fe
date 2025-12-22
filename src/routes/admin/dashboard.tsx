import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  CheckCircle,
  Clock,
  Database,
  FileText,
  HardDrive,
  LogOut,
  Search,
  Server,
  Sparkles,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/shared/logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminDashboard, useAdminUsers, useDeleteUser } from "@/data/admin";
import { useLogout, useUser } from "@/data/auth";
import { requireAdmin } from "@/lib/auth-utils";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: async ({ context }) => {
    await requireAdmin(context.queryClient);
  },
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data: user } = useUser();
  const logout = useLogout();
  const [period, setPeriod] = useState<
    "today" | "week" | "month" | "year" | "all"
  >("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [page, setPage] = useState(1);

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useAdminDashboard(period);
  const { data: usersData, isLoading: isUsersLoading } = useAdminUsers({
    search: searchQuery || undefined,
    role: roleFilter === "all" ? undefined : roleFilter,
    per_page: 10,
    page,
  });

  const deleteUser = useDeleteUser();

  const stats = dashboardData?.data.stats;
  const users = usersData?.data.users || [];
  const pagination = usersData?.data.pagination;

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        globalThis.location.href = "/auth/login";
      },
    });
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      deleteUser.mutate(userId);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 flex flex-col h-screen overflow-y-auto border-r w-72 bg-card">
        <div className="p-6 border-b">
          <Logo size="lg" />
        </div>

        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <a
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 font-medium rounded-lg bg-primary/10 text-primary"
            >
              <BarChart3 className="size-5" />
              Dashboard
            </a>
          </nav>
        </div>

        {user && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <UserAvatar name={user.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <Badge className="text-xs">Admin</Badge>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={logout.isPending}
              className="justify-start w-full"
            >
              <LogOut className="mr-2 size-4" />
              {logout.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Lihat perkembangan aplikasi
              </p>
            </div>

            <Select
              value={period}
              onValueChange={(v) => setPeriod(v as typeof period)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="week">Minggu Ini</SelectItem>
                <SelectItem value="month">Bulan Ini</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
                <SelectItem value="all">Semua</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Statistics Grid */}
          {isDashboardLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Skeleton key={n} className="h-32" />
              ))}
            </div>
          ) : stats ? (
            <>
              {/* User Stats */}
              <div>
                <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                  <Users className="size-6" />
                  Pengguna
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Pengguna"
                    value={stats.users?.total ?? 0}
                    change={`+${stats.users?.new_this_period ?? 0} baru`}
                    icon={<Users className="text-blue-500 size-5" />}
                  />
                  <StatCard
                    title="Pengguna Aktif"
                    value={stats.users?.active_users ?? 0}
                    change={`${(stats.users?.growth_percentage ?? 0).toFixed(1)}% pertumbuhan`}
                    icon={<Activity className="text-green-500 size-5" />}
                  />
                  <StatCard
                    title="Admin"
                    value={stats.users?.admin_count ?? 0}
                    icon={<CheckCircle className="text-purple-500 size-5" />}
                  />
                  <StatCard
                    title="Terverifikasi"
                    value={stats.users?.verified_count ?? 0}
                    change={`${((stats.users?.total ?? 0) > 0 ? ((stats.users?.verified_count ?? 0) / (stats.users?.total ?? 1)) * 100 : 0).toFixed(1)}%`}
                    icon={<CheckCircle className="size-5 text-emerald-500" />}
                  />
                </div>
              </div>

              {/* Document Stats */}
              <div>
                <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                  <FileText className="size-6" />
                  Dokumen
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Dokumen"
                    value={stats.documents?.total ?? 0}
                    change={`+${stats.documents?.uploaded_this_period ?? 0} periode ini`}
                    icon={<FileText className="text-blue-500 size-5" />}
                  />
                  <StatCard
                    title="Selesai"
                    value={stats.documents?.by_status?.completed ?? 0}
                    icon={<CheckCircle className="text-green-500 size-5" />}
                  />
                  <StatCard
                    title="Proses"
                    value={stats.documents?.by_status?.processing ?? 0}
                    icon={<Clock className="text-yellow-500 size-5" />}
                  />
                  <StatCard
                    title="Gagal"
                    value={stats.documents?.by_status?.failed ?? 0}
                    icon={<XCircle className="text-red-500 size-5" />}
                  />
                </div>
              </div>

              {/* Summary & Quiz Stats */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                    <Sparkles className="size-6" />
                    Ringkasan
                  </h2>
                  <div className="grid gap-4">
                    <StatCard
                      title="Total Ringkasan"
                      value={stats.summaries?.total ?? 0}
                      change={`+${stats.summaries?.generated_this_period ?? 0} periode ini`}
                      icon={<Sparkles className="text-purple-500 size-5" />}
                    />
                    <StatCard
                      title="Total Views"
                      value={stats.summaries?.total_views ?? 0}
                      icon={<TrendingUp className="text-blue-500 size-5" />}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                    <BarChart3 className="size-6" />
                    Kuis
                  </h2>
                  <div className="grid gap-4">
                    <StatCard
                      title="Total Kuis"
                      value={stats.quizzes?.total ?? 0}
                      change={`+${stats.quizzes?.generated_this_period ?? 0} periode ini`}
                      icon={<BarChart3 className="text-orange-500 size-5" />}
                    />
                    <StatCard
                      title="Rata-rata Skor"
                      value={`${(stats.quizzes?.average_score ?? 0).toFixed(1)}%`}
                      change={`${stats.quizzes?.completed_attempts ?? 0} selesai`}
                      icon={<TrendingUp className="text-green-500 size-5" />}
                    />
                  </div>
                </div>
              </div>

              {/* System Stats */}
              <div>
                <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                  <Server className="size-6" />
                  Sistem
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <StatCard
                    title="Storage Digunakan"
                    value={`${(stats.system?.storage_used_gb ?? 0).toFixed(2)} GB`}
                    change={`${(stats.system?.storage_percentage ?? 0).toFixed(1)}% dari ${stats.system?.storage_limit_gb ?? 0} GB`}
                    icon={<HardDrive className="text-blue-500 size-5" />}
                  />
                  <StatCard
                    title="API Calls"
                    value={stats.system?.api_calls_this_period ?? 0}
                    icon={<Database className="text-purple-500 size-5" />}
                  />
                  <StatCard
                    title="Avg Response Time"
                    value={`${stats.system?.average_response_time_ms ?? 0} ms`}
                    icon={<Clock className="text-green-500 size-5" />}
                  />
                </div>
              </div>
            </>
          ) : null}

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Pengguna</CardTitle>
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <Label htmlFor="search">Cari</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Cari nama atau email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={roleFilter}
                    onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}
                  >
                    <SelectTrigger id="role" className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isUsersLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Skeleton key={n} className="w-full h-16" />
                  ))}
                </div>
              ) : users.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="mx-auto mb-4 size-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Tidak ada pengguna ditemukan
                  </p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Dokumen</TableHead>
                        <TableHead>Storage</TableHead>
                        <TableHead>Terdaftar</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <UserAvatar name={u.name} size="sm" />
                              <span className="font-medium">{u.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                u.role === "admin" ? "default" : "secondary"
                              }
                            >
                              {u.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{u.stats?.documents_count || 0}</TableCell>
                          <TableCell>
                            {(u.stats?.total_storage_mb ?? 0).toFixed(2)} MB
                          </TableCell>
                          <TableCell>
                            {new Date(u.created_at).toLocaleDateString("id-ID")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(u.id)}
                              disabled={
                                deleteUser.isPending || u.id === user?.id
                              }
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {pagination && pagination.last_page > 1 && (
                    <div className="flex items-center justify-between pt-6 mt-6 border-t">
                      <div className="text-sm text-muted-foreground">
                        Menampilkan {pagination.from} - {pagination.to} dari{" "}
                        {pagination.total} pengguna
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

function StatCard({
  title,
  value,
  change,
  icon,
}: Readonly<{
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}>) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="mt-1 text-xs text-muted-foreground">{change}</p>
        )}
      </CardContent>
    </Card>
  );
}
