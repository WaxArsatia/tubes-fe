import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera,
  Eye,
  EyeOff,
  History,
  LayoutPanelLeft,
  Lock,
  LogOut,
  Mail,
  Settings,
  Shield,
  User,
  UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/shared/logo";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogout, useUser } from "@/data/auth";
import {
  useDeleteAvatar,
  useUpdatePassword,
  useUpdateProfile,
  useUploadAvatar,
} from "@/data/profile";
import { requireAuth } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ context }) => {
    // Require authentication
    await requireAuth(context.queryClient);
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { data: user } = useUser();
  const logout = useLogout();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();
  const uploadAvatar = useUploadAvatar();
  const deleteAvatar = useDeleteAvatar();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  // Update profile data when user data loads
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        globalThis.location.href = "/auth/login";
      },
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword.mutate(passwordData, {
      onSuccess: () => {
        // Reset password form on success
        setPasswordData({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      },
    });
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Sidebar */}
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
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors text-muted-foreground hover:bg-muted",
              )}
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
      <main className="flex-1 lg:ml-72 min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-10 pb-24 pt-10">
          <div className="w-full max-w-6xl">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
              <h1 className="text-3xl font-bold text-foreground">Profil</h1>
              <p className="text-lg text-muted-foreground">
                Kelola informasi pribadi dan keamanan akun Anda
              </p>
            </div>

            {/* Content Grid */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column - Basic Info */}
              <Card className="flex-1 p-8 max-w-3xl">
                <div className="flex gap-3 pb-4 mb-6 border-b border-border">
                  <div className="flex items-center justify-center p-2 rounded-lg bg-primary/10 shrink-0">
                    <UserPen
                      className="text-primary size-6"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Informasi Dasar
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Perbarui foto dan detail profil Anda
                    </p>
                  </div>
                </div>

                <div className="flex gap-12">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center pt-2">
                    <div className="relative">
                      <div className="flex items-center justify-center overflow-hidden rounded-full size-36 bg-muted">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover size-full"
                          />
                        ) : (
                          <User className="text-muted-foreground size-20" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 2048 * 1024) {
                              alert("File terlalu besar. Maksimal 2MB");
                              return;
                            }
                            uploadAvatar.mutate(file);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("avatar-upload")?.click()
                        }
                        disabled={uploadAvatar.isPending}
                        className="absolute bottom-1 right-1 flex items-center justify-center p-2 bg-background border border-border rounded-full shadow-lg hover:bg-muted"
                      >
                        <Camera className="text-foreground size-6" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <p className="text-sm font-medium text-center text-foreground">
                        Foto Profil
                      </p>
                      <p className="text-xs text-center text-muted-foreground">
                        Format JPG, GIF atau PNG.
                        <br />
                        Max ukuran 2MB
                      </p>
                      {user?.avatar && (
                        <button
                          type="button"
                          onClick={() => deleteAvatar.mutate()}
                          disabled={deleteAvatar.isPending}
                          className="text-xs text-destructive hover:underline"
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form
                    className="flex flex-col flex-1 gap-5"
                    onSubmit={handleProfileSubmit}
                  >
                    <FieldGroup>
                      <FieldLabel htmlFor="name">Nama lengkap</FieldLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="text-muted-foreground size-6" />
                        </div>
                        <Input
                          id="name"
                          type="text"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          className="pl-11"
                        />
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="text-muted-foreground size-6" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="pl-11"
                        />
                      </div>
                    </FieldGroup>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={updateProfile.isPending}
                        className="rounded-lg bg-primary text-primary-foreground"
                      >
                        {updateProfile.isPending
                          ? "Menyimpan..."
                          : "Simpan Profil"}
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>

              {/* Right Column */}
              <div className="flex flex-col gap-6 w-96">
                {/* Security Card */}
                <Card className="p-6">
                  <div className="flex gap-3 pb-4 mb-6 border-b border-border">
                    <div className="flex items-center justify-center p-2 rounded-lg bg-primary/10 shrink-0">
                      <Shield className="text-primary size-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">
                        Keamanan Akun
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Atur ulang kata sandi Anda
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handlePasswordSubmit}
                    className="flex flex-col gap-4"
                  >
                    <FieldGroup>
                      <FieldLabel htmlFor="current-password">
                        Password Saat Ini
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="text-muted-foreground size-6" />
                        </div>
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-11 pr-11"
                          value={passwordData.current_password}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              current_password: e.target.value,
                            })
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="text-muted-foreground size-6" />
                          ) : (
                            <Eye className="text-muted-foreground size-6" />
                          )}
                        </button>
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="new-password">
                        Password Baru
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="text-muted-foreground size-6" />
                        </div>
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-11 pr-11"
                          value={passwordData.new_password}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              new_password: e.target.value,
                            })
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showNewPassword ? (
                            <EyeOff className="text-muted-foreground size-6" />
                          ) : (
                            <Eye className="text-muted-foreground size-6" />
                          )}
                        </button>
                      </div>
                    </FieldGroup>

                    <FieldGroup>
                      <FieldLabel htmlFor="confirm-password">
                        Konfirmasi Password
                      </FieldLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="text-muted-foreground size-6" />
                        </div>
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-11 pr-11"
                          value={passwordData.new_password_confirmation}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              new_password_confirmation: e.target.value,
                            })
                          }
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="text-muted-foreground size-6" />
                          ) : (
                            <Eye className="text-muted-foreground size-6" />
                          )}
                        </button>
                      </div>
                    </FieldGroup>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full rounded-lg"
                        disabled={updatePassword.isPending}
                      >
                        {updatePassword.isPending
                          ? "Mengupdate..."
                          : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Logout Card */}
                <Card className="p-6 bg-linear-to-br from-background to-primary/5">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center rounded-full bg-primary/20 size-12">
                      <LogOut className="text-primary size-6" />
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                      <h3 className="text-base font-bold text-foreground">
                        Sesi Login
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Keluar dari akun Anda di perangkat ini.
                      </p>
                    </div>
                    <Button
                      onClick={handleLogout}
                      disabled={logout.isPending}
                      className="w-full rounded-lg shadow-lg bg-primary text-primary-foreground shadow-primary/20"
                    >
                      {logout.isPending ? "Logging out..." : "Logout"}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
