import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Copy,
  FileQuestion,
  FileText,
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useDocument } from "@/data/documents";
import {
  useDeleteSummary,
  useGenerateSummary,
  useSummaries,
} from "@/data/summaries";
import { requireAuth } from "@/lib/auth-utils";
import type { Summary } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/$id/summarize")({
  beforeLoad: async ({ context }) => {
    await requireAuth(context.queryClient);
  },
  component: SummarizePage,
});

function SummarizePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const documentId = Number.parseInt(id, 10);

  const { data: documentData, isLoading: isLoadingDocument } =
    useDocument(documentId);
  const { data: summariesData, isLoading: isLoadingSummaries } =
    useSummaries(documentId);
  const generateSummary = useGenerateSummary();
  const deleteSummary = useDeleteSummary();

  const [summaryType, setSummaryType] = useState<
    "concise" | "detailed" | "bullet_points" | "abstract"
  >("concise");
  const [language, setLanguage] = useState<"en" | "id">("id");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);

  const document = documentData?.data.document;
  const summaries = summariesData?.data.summaries || [];

  const handleGenerateSummary = async () => {
    try {
      const result = await generateSummary.mutateAsync({
        document_id: documentId,
        summary_type: summaryType,
        language,
        custom_prompt: customPrompt || undefined,
      });

      toast.success("Ringkasan berhasil dibuat", {
        description: `${result.data.summary.word_count} kata`,
      });

      setSelectedSummary(result.data.summary);
    } catch (error) {
      toast.error("Gagal membuat ringkasan", {
        description: (error as { message?: string }).message,
      });
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Ringkasan disalin ke clipboard");
  };

  const handleDelete = async (summaryId: number) => {
    if (!confirm("Hapus ringkasan ini?")) return;

    try {
      await deleteSummary.mutateAsync(summaryId);
      toast.success("Ringkasan berhasil dihapus");
      if (selectedSummary?.id === summaryId) {
        setSelectedSummary(null);
      }
    } catch (_error) {
      toast.error("Gagal menghapus ringkasan");
    }
  };

  if (isLoadingDocument) {
    return (
      <main className="flex-1 lg:ml-72">
        <div className="p-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </main>
    );
  }

  if (!document) {
    return (
      <main className="flex-1 lg:ml-72">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Dokumen tidak ditemukan</h2>
          <Link to="/dashboard" className={buttonVariants()}>
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 lg:ml-72">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/dashboard" })}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Ringkasan Dokumen</h1>
            <p className="text-sm text-muted-foreground">
              {document.original_filename}
            </p>
          </div>
          <Link
            to="/quiz/$id"
            params={{ id: id }}
            search={{ mode: "generate" }}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <FileQuestion className="size-4" />
            Buat Kuis
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Generation Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-5" />
                Buat Ringkasan Baru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="type">Jenis Ringkasan</Label>
                <Select
                  value={summaryType}
                  onValueChange={(v) => setSummaryType(v as typeof summaryType)}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">
                      Ringkas (150-300 kata)
                    </SelectItem>
                    <SelectItem value="detailed">
                      Detail (500-1000 kata)
                    </SelectItem>
                    <SelectItem value="bullet_points">
                      Poin-Poin Utama
                    </SelectItem>
                    <SelectItem value="abstract">Abstrak Akademik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Bahasa</Label>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v as typeof language)}
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prompt">Instruksi Tambahan (Opsional)</Label>
                <Textarea
                  id="prompt"
                  placeholder="Contoh: Fokus pada konsep utama dan definisi..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerateSummary}
                disabled={
                  generateSummary.isPending || document.status !== "completed"
                }
                className="w-full"
              >
                {generateSummary.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Membuat...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Buat Ringkasan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Summary Display */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingSummaries ? (
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : summaries.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto size-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Belum ada ringkasan. Buat yang pertama!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary Tabs */}
                  <div className="flex gap-2 flex-wrap">
                    {summaries.map((summary) => (
                      <Button
                        key={summary.id}
                        variant={
                          selectedSummary?.id === summary.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedSummary(summary)}
                      >
                        {summary.summary_type === "concise" && "Ringkas"}
                        {summary.summary_type === "detailed" && "Detail"}
                        {summary.summary_type === "bullet_points" &&
                          "Poin-Poin"}
                        {summary.summary_type === "abstract" && "Abstrak"}
                      </Button>
                    ))}
                  </div>

                  {/* Selected Summary Content */}
                  {selectedSummary ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge>{selectedSummary.word_count} kata</Badge>
                          <Badge variant="outline">
                            {selectedSummary.language === "id" ? "ID" : "EN"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(selectedSummary.content)}
                          >
                            <Copy className="size-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(selectedSummary.id)}
                            disabled={deleteSummary.isPending}
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                        {selectedSummary.content}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Pilih ringkasan untuk melihat
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
