import { AlertTriangle } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
          <Card className="w-full max-w-md p-8">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center justify-center rounded-full bg-destructive/10 size-16">
                <AlertTriangle className="text-destructive size-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Terjadi Kesalahan
                </h2>
                <p className="text-muted-foreground">
                  Maaf, terjadi kesalahan saat memuat halaman ini.
                </p>
                {this.state.error && (
                  <details className="mt-4 text-sm text-left">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                      Detail error
                    </summary>
                    <pre className="mt-2 p-4 overflow-auto rounded-lg bg-muted text-xs">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    this.setState({ hasError: false, error: undefined })
                  }
                  variant="outline"
                >
                  Coba Lagi
                </Button>
                <Button
                  onClick={() => {
                    globalThis.location.href = "/";
                  }}
                >
                  Kembali ke Beranda
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
