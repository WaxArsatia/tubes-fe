import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UserAvatar({
  name,
  className,
  size = "md",
}: Readonly<UserAvatarProps>) {
  const sizeClasses = {
    sm: { container: "size-8", icon: "size-4", text: "text-xs" },
    md: { container: "size-10", icon: "size-5", text: "text-sm" },
    lg: { container: "size-12", icon: "size-6", text: "text-base" },
  };

  const { container, icon, text } = sizeClasses[size];

  const initial = name?.charAt(0).toUpperCase() || "U";

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full bg-muted-foreground/20 shrink-0",
        container,
        className,
      )}
    >
      {name ? (
        <span className={cn("font-semibold text-muted-foreground", text)}>
          {initial}
        </span>
      ) : (
        <User className={cn("text-muted-foreground", icon)} />
      )}
    </div>
  );
}
