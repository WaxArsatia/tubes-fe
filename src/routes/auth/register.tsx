import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, LogIn, Mail, User } from "lucide-react";
import { useId, useState } from "react";
import { useRegister } from "@/data/auth";
import type { ApiError } from "@/data/types";

export const Route = createFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const navigate = Route.useNavigate();
  const register = useRegister();
  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const getErrorField = (field: string) => {
    const error = register.error as ApiError | null;
    return error?.errors?.[field]?.[0];
  };

  const validatePasswords = (pass: string, confirm: string) => {
    if (confirm && pass !== confirm) {
      setPasswordError("Passwords do not match");
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

    const formData = new FormData(e.currentTarget);

    try {
      await register.mutateAsync({
        name: formData.get("fullName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        password_confirmation: formData.get("confirmPassword") as string,
      });
      navigate({ to: "/" });
    } catch {
      // Error handling is done via register.error
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="items-center justify-center hidden bg-linear-to-br from-gray-100 to-gray-200 lg:flex lg:w-1/2">
        <img
          src="/assets/undraw_online-profile_v9c1.svg"
          alt="Register Illustration"
          className="max-w-sm xl:max-w-xl px-8"
        />
      </div>
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-12 bg-white lg:w-1/2">
        <form
          className="flex flex-col w-full max-w-md py-8"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-center text-gray-900">
            Sign up for an account
          </h1>

          {register.error && (
            <div className="p-3 sm:p-4 mb-4 sm:mb-6 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
              {register.error.message ||
                "Registration failed. Please try again."}
            </div>
          )}

          <label htmlFor={fullNameId} className="flex flex-col gap-1.5 mb-4">
            <span className="text-sm font-semibold text-gray-700">
              Full Name
            </span>
            <div className="flex items-center h-11 sm:h-12 gap-3 pl-3 sm:pl-4 bg-white border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/20">
              <User className="size-5 text-gray-500" />
              <input
                className="flex-1 text-sm sm:text-base text-gray-900 outline-none placeholder:text-gray-400"
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                id={fullNameId}
                autoComplete="name"
                disabled={register.isPending}
                required
              />
            </div>
            {getErrorField("name") && (
              <span className="mt-1 text-xs sm:text-sm text-red-600">
                {getErrorField("name")}
              </span>
            )}
          </label>

          <label htmlFor={emailId} className="flex flex-col gap-1.5 mb-4">
            <span className="text-sm font-semibold text-gray-700">Email</span>
            <div className="flex items-center h-11 sm:h-12 gap-3 pl-3 sm:pl-4 bg-white border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/20">
              <Mail className="size-5 text-gray-500" />
              <input
                className="flex-1 text-sm sm:text-base text-gray-900 outline-none placeholder:text-gray-400"
                type="email"
                placeholder="Enter your email"
                name="email"
                id={emailId}
                autoComplete="email"
                disabled={register.isPending}
                required
              />
            </div>
            {getErrorField("email") && (
              <span className="mt-1 text-xs sm:text-sm text-red-600">
                {getErrorField("email")}
              </span>
            )}
          </label>

          <label htmlFor={passwordId} className="flex flex-col gap-1.5 mb-4">
            <span className="text-sm font-semibold text-gray-700">
              Password
            </span>
            <div className="flex items-center h-11 sm:h-12 gap-3 pl-3 sm:pl-4 bg-white border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/20">
              <Lock className="size-5 text-gray-500" />
              <input
                className="flex-1 text-sm sm:text-base text-gray-900 outline-none placeholder:text-gray-400"
                type="password"
                placeholder="Enter your password"
                name="password"
                id={passwordId}
                autoComplete="new-password"
                disabled={register.isPending}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePasswords(e.target.value, confirmPassword);
                }}
              />
            </div>
            {getErrorField("password") && (
              <span className="mt-1 text-xs sm:text-sm text-red-600">
                {getErrorField("password")}
              </span>
            )}
          </label>

          <label
            htmlFor={confirmPasswordId}
            className="flex flex-col gap-1.5 mb-6"
          >
            <span className="text-sm font-semibold text-gray-700">
              Confirm Password
            </span>
            <div className="flex items-center h-11 sm:h-12 gap-3 pl-3 sm:pl-4 bg-white border border-gray-300 rounded-lg transition-all hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/20">
              <Lock className="size-5 text-gray-500" />
              <input
                className="flex-1 text-sm sm:text-base text-gray-900 outline-none placeholder:text-gray-400"
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                id={confirmPasswordId}
                autoComplete="new-password"
                disabled={register.isPending}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswords(password, e.target.value);
                }}
              />
            </div>
            {passwordError && (
              <span className="mt-1 text-xs sm:text-sm text-red-600">
                {passwordError}
              </span>
            )}
          </label>

          <button
            type="submit"
            disabled={register.isPending || !!passwordError}
            className="flex items-center justify-center gap-2 h-11 sm:h-12 py-2.5 sm:py-3 font-semibold text-sm sm:text-base text-white rounded-lg bg-cyan-600 transition-all hover:bg-cyan-700 active:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            <LogIn className="size-5" />
            {register.isPending ? "Signing up..." : "Sign Up"}
          </button>

          <p className="pt-6 text-sm sm:text-base text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
