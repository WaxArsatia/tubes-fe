import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { InputWithIcon } from "@/components/shared/input-with-icon";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useLogin } from "@/data/auth";
import { requireGuest } from "@/lib/auth-utils";
import type { ApiError } from "@/lib/types";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async ({ context }) => {
    // Redirect to dashboard if already authenticated
    await requireGuest(context.queryClient);
  },
  component: LoginPage,
});

// ============================================================================
// Login Form Component
// ============================================================================
function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    login.mutate(formData, {
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
      id="login-form"
      className="flex flex-col w-full max-w-md gap-6"
      onSubmit={handleSubmit}
      aria-label="Form login"
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-heading text-foreground sm:text-3xl">
          Masuk ke Akunmu
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Selamat datang kembali! Masukkan kredensialmu untuk melanjutkan.
        </p>
      </div>

      {generalError && (
        <div className="p-4 text-sm border rounded-xl border-destructive/20 bg-destructive/10 text-destructive">
          {generalError}
        </div>
      )}

      <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <InputWithIcon
            icon={Mail}
            type="email"
            name="email"
            placeholder="Masukkan email kamu"
            autoComplete="email"
            disabled={login.isPending}
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
            autoComplete="current-password"
            disabled={login.isPending}
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {fieldErrors.password && (
            <FieldError>{fieldErrors.password}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={login.isPending}
        className="gap-2 font-semibold rounded-xl"
      >
        <LogIn className="size-5" />
        {login.isPending ? "Sedang masuk..." : "Masuk"}
      </Button>

      <p className="text-sm text-center text-muted-foreground sm:text-base">
        Belum punya akun?{" "}
        <Link
          to="/auth/register"
          className="font-semibold transition-colors text-primary hover:text-primary/80 hover:underline"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}

// ============================================================================
// Main Login Page Component
// ============================================================================
function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <a
        href="#login-form"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Lewati ke form login
      </a>
      {/* Left Panel - Illustration */}
      <div className="items-center justify-center hidden bg-linear-to-br from-primary/5 to-blue-50 lg:flex lg:w-1/2">
        <img
          src="/assets/undraw_authentication_1evl.svg"
          alt="Login Illustration"
          className="max-w-md px-8 xl:max-w-2xl"
        />
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col items-center justify-center w-full gap-8 px-6 lg:w-1/2 lg:px-12">
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}
