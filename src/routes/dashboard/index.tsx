import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileQuestion,
  FileText,
  Loader2,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteDocument,
  useDocuments,
  useUploadDocument,
} from "@/data/documents";
import type { Document } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndexPage,
});

function DashboardIndexPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data, isLoading } = useDocuments({ sort: "newest" });
  const uploadDocument = useUploadDocument();
  const deleteDocument = useDeleteDocument();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File terlalu besar", {
          description: "Ukuran file maksimal 10 MB",
        });
        return;
      }

      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (!validTypes.includes(file.type)) {
        toast.error("Format file tidak didukung", {
          description: "Format yang didukung: PDF, DOC, DOCX, TXT, PPT, PPTX",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadDocument.mutateAsync(selectedFile);
      toast.success("Dokumen berhasil diunggah", {
        description: "Dokumen Anda sedang diproses",
      });
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById(
        "file-input",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Gagal mengunggah dokumen", {
        description:
          (error as { message?: string }).message || "Terjadi kesalahan",
      });
    }
  };

  const handleDelete = async (documentId: number, filename: string) => {
    if (!confirm(`Hapus dokumen "${filename}"?`)) return;

    try {
      await deleteDocument.mutateAsync(documentId);
      toast.success("Dokumen berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus dokumen", {
        description:
          (error as { message?: string }).message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <main className="flex-1 lg:ml-72">
      <div className="flex flex-col px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge className="gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/15">
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">AI-Powered Learning</span>
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">Dokumen Saya</h1>
          <p className="text-muted-foreground">
            Unggah dan kelola dokumen untuk dibuat ringkasan atau kuis
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Unggah Dokumen Baru</h2>
            <div className="flex gap-4">
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadDocument.isPending}
              >
                {uploadDocument.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                Unggah
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Format: PDF, DOC, DOCX, TXT, PPT, PPTX • Maksimal 10 MB
            </p>
          </div>
        </Card>

        {/* Documents List */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Daftar Dokumen</h2>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {new Array(4).fill(null).map(() => (
                <Card key={crypto.randomUUID()} className="p-6">
                  <Skeleton className="h-24 w-full" />
                </Card>
              ))}
            </div>
          ) : data?.data.documents.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="mx-auto mb-4 size-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium">Belum ada dokumen</h3>
              <p className="text-sm text-muted-foreground">
                Unggah dokumen pertama Anda untuk memulai
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {data?.data.documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  onDelete={handleDelete}
                  isDeleting={deleteDocument.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function DocumentCard({
  document,
  onDelete,
  isDeleting,
}: Readonly<{
  document: Document;
  onDelete: (id: number, filename: string) => void;
  isDeleting: boolean;
}>) {
  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Menunggu",
      className: "bg-yellow-100 text-yellow-800",
    },
    processing: {
      icon: Loader2,
      label: "Memproses",
      className: "bg-blue-100 text-blue-800",
    },
    completed: {
      icon: CheckCircle,
      label: "Selesai",
      className: "bg-green-100 text-green-800",
    },
    failed: {
      icon: AlertCircle,
      label: "Gagal",
      className: "bg-red-100 text-red-800",
    },
  };

  const status = statusConfig[document.status];
  const StatusIcon = status.icon;
  const canInteract = document.status === "completed";

  return (
    <Card className="p-6 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <FileText className="size-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">
                {document.original_filename}
              </h3>
              <p className="text-sm text-muted-foreground">
                {(document.file_size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <Badge className={cn("shrink-0", status.className)}>
            <StatusIcon
              className={cn(
                "size-3",
                document.status === "processing" && "animate-spin",
              )}
            />
            {status.label}
          </Badge>
        </div>

        {/* Actions */}
        {canInteract && (
          <div className="flex gap-2 flex-wrap">
            <Link
              to="/dashboard/$id/summarize"
              params={{ id: document.id.toString() }}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "flex-1",
              )}
            >
              <Sparkles className="size-4" />
              Ringkas
            </Link>
            <Link
              to="/quiz/$id"
              params={{ id: document.id.toString() }}
              search={{ mode: "generate" }}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "flex-1",
              )}
            >
              <FileQuestion className="size-4" />
              Kuis
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(document.id, document.original_filename)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4 text-red-600" />
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
