import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, LogIn, Mail, User } from "lucide-react";
import { useId, useState } from "react";

export const Route = createFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const validatePasswords = (pass: string, confirm: string) => {
    if (confirm && pass !== confirm) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError(undefined);
    return true;
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gray-300"></div>
      <div className="flex items-center justify-center w-1/2 px-12 bg-gray-100">
        <form
          className="flex flex-col w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (!validatePasswords(password, confirmPassword)) {
              return;
            }
          }}
        >
          <h1 className="mb-4 text-2xl font-bold text-center">
            Sign up for an account
          </h1>
          <label htmlFor={fullNameId} className="flex flex-col gap-1 pt-4">
            <span className="font-medium text-gray-700">Full Name</span>
            <div className="flex items-center h-12 gap-3 pl-3 bg-white border border-gray-300 rounded-lg cursor-text hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/25">
              <User className="text-gray-500" />
              <input
                className="flex-1 text-gray-900 outline-none placeholder:text-gray-400"
                type="text"
                placeholder="Enter your full name"
                name="fullName"
                id={fullNameId}
                autoComplete="name"
                required
              />
            </div>
          </label>
          <label htmlFor={emailId} className="flex flex-col gap-1 pt-4">
            <span className="font-medium text-gray-700">Email</span>
            <div className="flex items-center h-12 gap-3 pl-3 bg-white border border-gray-300 rounded-lg cursor-text hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/25">
              <Mail className="text-gray-500" />
              <input
                className="flex-1 text-gray-900 outline-none placeholder:text-gray-400"
                type="email"
                placeholder="Enter your email"
                name="email"
                id={emailId}
                autoComplete="email"
                required
              />
            </div>
          </label>
          <label htmlFor={passwordId} className="flex flex-col gap-1 pt-4">
            <span className="font-medium text-gray-700">Password</span>
            <div className="flex items-center h-12 gap-3 pl-3 bg-white border border-gray-300 rounded-lg cursor-text hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/25">
              <Lock className="text-gray-500" />
              <input
                className="flex-1 text-gray-900 outline-none placeholder:text-gray-400"
                type="password"
                placeholder="Enter your password"
                name="password"
                id={passwordId}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePasswords(e.target.value, confirmPassword);
                }}
              />
            </div>
          </label>
          <label
            htmlFor={confirmPasswordId}
            className="flex flex-col gap-1 pt-4"
          >
            <span className="font-medium text-gray-700">Confirm Password</span>
            <div className="flex items-center h-12 gap-3 pl-3 bg-white border border-gray-300 rounded-lg cursor-text hover:border-gray-400 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-600/25">
              <Lock className="text-gray-500" />
              <input
                className="flex-1 text-gray-900 outline-none placeholder:text-gray-400"
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                id={confirmPasswordId}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswords(password, e.target.value);
                }}
              />
            </div>
            {passwordError && (
              <span className="mt-1 text-sm text-red-600">{passwordError}</span>
            )}
          </label>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-3 mt-8 font-medium text-white rounded-lg cursor-pointer bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn />
            Sign Up
          </button>
          <p className="pt-4 text-center">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-cyan-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
