import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
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
// Register Form Component
// ============================================================================
function RegisterForm() {
  const navigate = Route.useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!validatePasswords(password, confirmPassword)) {
      return;
    }

    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullName") as string;
    const email = formData.get("email") as string;

    // TODO: Implement actual register logic
    console.log("Register attempt:", { name, email, password });

    try {
      // Simulate API call - replace with actual auth logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate({ to: "/" });
    } catch {
      setError("Pendaftaran gagal. Silakan coba lagi.");
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
          Buat Akun Baru
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Daftar sekarang dan mulai belajar lebih cerdas dengan AI.
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm border rounded-xl border-destructive/20 bg-destructive/10 text-destructive">
          {error}
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
            disabled={isPending}
            required
          />
        </Field>

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
            autoComplete="new-password"
            disabled={isPending}
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePasswords(e.target.value, confirmPassword);
            }}
          />
        </Field>

        <Field>
          <FieldLabel>Konfirmasi Password</FieldLabel>
          <InputWithIcon
            icon={Lock}
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi password kamu"
            autoComplete="new-password"
            disabled={isPending}
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validatePasswords(password, e.target.value);
            }}
          />
          {passwordError && <FieldError>{passwordError}</FieldError>}
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={isPending || !!passwordError}
        className="gap-2 font-semibold rounded-xl"
      >
        <UserPlus className="size-5" />
        {isPending ? "Sedang mendaftar..." : "Daftar"}
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
