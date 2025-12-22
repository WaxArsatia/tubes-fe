import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: Readonly<EmptyStateProps>) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center bg-muted/30">
      <div className="flex items-center justify-center mb-4 rounded-full bg-muted size-16">
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm mb-6 text-sm text-muted-foreground">
        {description}
      </p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </Card>
  );
}
