import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className,
  variant = "dark",
  size = "md",
}: Readonly<LogoProps>) {
  const textColor =
    variant === "dark" ? "text-foreground" : "text-primary-foreground";
  const accentColor =
    variant === "dark" ? "text-primary" : "text-primary-foreground/80";

  const sizeClasses = {
    sm: { img: "size-8", text: "text-base" },
    md: { img: "size-12", text: "text-lg" },
    lg: { img: "size-16", text: "text-xl" },
  };

  const { img, text } = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img src="/assets/logo.svg" alt="Rangkuman Cerdas Logo" className={img} />
      <div className="flex flex-col">
        <span
          className={cn(
            "font-heading font-semibold leading-tight tracking-tight",
            text,
            textColor,
          )}
        >
          Rangkuman
        </span>
        <span
          className={cn(
            "font-heading font-semibold leading-tight tracking-tight",
            text,
            accentColor,
          )}
        >
          Cerdas
        </span>
      </div>
    </div>
  );
}
