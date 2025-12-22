import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

interface StrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
  percentage: number;
}

function calculatePasswordStrength(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      label: "Masukkan password",
      color: "text-muted-foreground",
      percentage: 0,
    };
  }

  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;

  const labels = ["Sangat Lemah", "Lemah", "Sedang", "Kuat", "Sangat Kuat"];
  const colors = [
    "text-destructive",
    "text-orange-500",
    "text-yellow-500",
    "text-blue-500",
    "text-green-500",
  ];

  const index = Math.min(score, 4);

  return {
    score: index,
    label: labels[index],
    color: colors[index],
    percentage: ((index + 1) / 5) * 100,
  };
}

export function PasswordStrength({
  password,
}: Readonly<PasswordStrengthProps>) {
  const strength = useMemo(
    () => calculatePasswordStrength(password),
    [password],
  );

  if (!password) return null;

  const getBarColor = (index: number) => {
    if (index > strength.score) return "bg-muted";

    const colors = [
      "bg-destructive",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];
    return colors[strength.score];
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Kekuatan Password:
        </span>
        <span className={cn("text-xs font-medium", strength.color)}>
          {strength.label}
        </span>
      </div>

      <div className="flex gap-1 h-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-full transition-colors",
              getBarColor(index),
            )}
          />
        ))}
      </div>

      {strength.score < 3 && (
        <p className="text-xs text-muted-foreground">
          Gunakan minimal 8 karakter dengan kombinasi huruf besar, kecil, angka,
          dan simbol
        </p>
      )}
    </div>
  );
}
