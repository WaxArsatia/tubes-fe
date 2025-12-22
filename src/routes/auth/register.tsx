import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { InputWithIcon } from "@/components/shared/input-with-icon";
import { Logo } from "@/components/shared/logo";
import { PasswordStrength } from "@/components/shared/password-strength";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRegister } from "@/data/auth";
import { requireGuest } from "@/lib/auth-utils";
import type { ApiError } from "@/lib/types";

export const Route = createFileRoute("/auth/register")({
  beforeLoad: async ({ context }) => {
    // Redirect to dashboard if already authenticated
    await requireGuest(context.queryClient);
  },
  component: RegisterPage,
});

// ============================================================================
// Register Form Component
// ============================================================================
function RegisterForm() {
  const router = useRouter();
  const register = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const validatePasswords = (pass: string, confirm: string) => {
    if (confirm && pass !== confirm) {
      setPasswordError("Password tidak cocok");
      return false;
    }
    setPasswordError(undefined);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePasswords(formData.password, formData.password_confirmation)) {
      return;
    }

    setFieldErrors({});
    setGeneralError(null);

    register.mutate(formData, {
      onSuccess: () => {
        router.navigate({ to: "/dashboard" });
      },
      onError: (error) => {
        // Handle validation errors (422) for field-level display
        const apiError = error as ApiError;
        if (apiError.status === 422 && apiError.errors) {
          const errors: Record<string, string> = {};
          for (const [field, messages] of Object.entries(apiError.errors)) {
            errors[field] = messages[0];
          }
          setFieldErrors(errors);
        }
        // General errors are now handled by toast in mutation
      },
    });
  };

  return (
    <form
      className="flex flex-col w-full max-w-md gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-heading text-foreground sm:text-3xl">
          Buat Akun Baru
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Daftar sekarang dan mulai belajar lebih cerdas dengan AI.
        </p>
      </div>

      {generalError && (
        <div className="p-4 text-sm border rounded-xl border-destructive/20 bg-destructive/10 text-destructive">
          {generalError}
        </div>
      )}

      <FieldGroup>
        <Field>
          <FieldLabel>Nama Lengkap</FieldLabel>
          <InputWithIcon
            icon={User}
            type="text"
            name="fullName"
            placeholder="Masukkan nama lengkap kamu"
            autoComplete="name"
            disabled={register.isPending}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <InputWithIcon
            icon={Mail}
            type="email"
            name="email"
            placeholder="Masukkan email kamu"
            autoComplete="email"
            disabled={register.isPending}
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputWithIcon
            icon={Lock}
            type="password"
            name="password"
            placeholder="Masukkan password kamu"
            autoComplete="new-password"
            disabled={register.isPending}
            required
            value={formData.password}
            onChange={(e) => {
              const newPassword = e.target.value;
              setFormData({ ...formData, password: newPassword });
              validatePasswords(newPassword, formData.password_confirmation);
            }}
          />
          {formData.password && (
            <PasswordStrength password={formData.password} />
          )}
          {fieldErrors.password && (
            <FieldError>{fieldErrors.password}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel>Konfirmasi Password</FieldLabel>
          <InputWithIcon
            icon={Lock}
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi password kamu"
            autoComplete="new-password"
            disabled={register.isPending}
            required
            value={formData.password_confirmation}
            onChange={(e) => {
              const newConfirm = e.target.value;
              setFormData({ ...formData, password_confirmation: newConfirm });
              validatePasswords(formData.password, newConfirm);
            }}
          />
          {passwordError && <FieldError>{passwordError}</FieldError>}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={register.isPending || !!passwordError}
        className="gap-2 font-semibold rounded-xl"
      >
        <UserPlus className="size-5" />
        {register.isPending ? "Sedang mendaftar..." : "Daftar"}
      </Button>

      <p className="text-sm text-center text-muted-foreground sm:text-base">
        Sudah punya akun?{" "}
        <Link
          to="/auth/login"
          className="font-semibold transition-colors text-primary hover:text-primary/80 hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}

// ============================================================================
// Main Register Page Component
// ============================================================================
function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Illustration */}
      <div className="items-center justify-center hidden bg-linear-to-br from-primary/5 to-blue-50 lg:flex lg:w-1/2">
        <img
          src="/assets/undraw_online-profile_v9c1.svg"
          alt="Register Illustration"
          className="max-w-sm px-8 xl:max-w-xl"
        />
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col items-center justify-center w-full gap-8 px-6 py-8 lg:w-1/2 lg:px-12">
        <Logo />
        <RegisterForm />
      </div>
    </div>
  );
}
