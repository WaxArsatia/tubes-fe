import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

// ============================================================================
// Logo Component
// ============================================================================
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/assets/logo.svg"
        alt="Rangkuman Cerdas Logo"
        className="size-12"
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold leading-tight tracking-tight font-heading text-foreground">
          Rangkuman
        </span>
        <span className="text-lg font-semibold leading-tight tracking-tight font-heading text-primary">
          Cerdas
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Input Field Components
// ============================================================================
function InputWithIcon({
  icon: Icon,
  ...props
}: Readonly<
  React.ComponentProps<typeof Input> & {
    icon: React.ComponentType<{ className?: string }>;
  }
>) {
  return (
    <div className="relative">
      <Icon className="absolute -translate-y-1/2 left-3 top-1/2 size-5 text-muted-foreground" />
      <Input className="h-11 pl-11 rounded-xl" {...props} />
    </div>
  );
}

// ============================================================================
// Login Form Component
// ============================================================================
function LoginForm() {
  const navigate = Route.useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // TODO: Implement actual login logic
    console.log("Login attempt:", { email, password });

    try {
      // Simulate API call - replace with actual auth logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate({ to: "/" });
    } catch {
      setError("Login gagal. Silakan coba lagi.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-md gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight font-heading text-foreground sm:text-3xl">
          Masuk ke Akunmu
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Selamat datang kembali! Masukkan kredensialmu untuk melanjutkan.
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm border rounded-xl border-destructive/20 bg-destructive/10 text-destructive">
          {error}
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
            disabled={isPending}
            required
          />
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputWithIcon
            icon={Lock}
            type="password"
            name="password"
            placeholder="Masukkan password kamu"
            autoComplete="current-password"
            disabled={isPending}
            required
          />
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="gap-2 font-semibold rounded-xl"
      >
        <LogIn className="size-5" />
        {isPending ? "Sedang masuk..." : "Masuk"}
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
