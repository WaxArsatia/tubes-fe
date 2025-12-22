import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";

interface InputWithIconProps extends ComponentProps<typeof Input> {
  icon: React.ComponentType<{ className?: string }>;
}

export function InputWithIcon({
  icon: Icon,
  ...props
}: Readonly<InputWithIconProps>) {
  return (
    <div className="relative">
      <Icon
        className="absolute -translate-y-1/2 left-3 top-1/2 size-5 text-muted-foreground"
        aria-hidden="true"
      />
      <Input className="h-11 pl-11 rounded-xl" {...props} />
    </div>
  );
}
