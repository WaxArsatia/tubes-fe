import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  DocumentDetailResponse,
  DocumentResponse,
  DocumentStatsResponse,
  DocumentsListResponse,
  MessageResponse,
} from "@/lib/types";

/**
 * Query key factory for documents
 */
export const documentKeys = {
  all: ["documents"] as const,
  lists: () => [...documentKeys.all, "list"] as const,
  list: (filters: {
    status?: string;
    sort?: string;
    per_page?: number;
    page?: number;
  }) => [...documentKeys.lists(), filters] as const,
  details: () => [...documentKeys.all, "detail"] as const,
  detail: (id: number) => [...documentKeys.details(), id] as const,
};

/**
 * Hook to fetch all user documents with filtering and pagination
 */
export function useDocuments(params?: {
  status?: "pending" | "processing" | "completed" | "failed";
  sort?: "newest" | "oldest" | "name";
  per_page?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: documentKeys.list(params ?? {}),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status) searchParams.append("status", params.status);
      if (params?.sort) searchParams.append("sort", params.sort);
      if (params?.per_page)
        searchParams.append("per_page", params.per_page.toString());
      if (params?.page) searchParams.append("page", params.page.toString());

      const query = searchParams.toString();
      const url = query ? `/documents?${query}` : "/documents";

      return apiClient.get<DocumentsListResponse>(url);
    },
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Hook to fetch a single document by ID with details
 */
export function useDocument(documentId: number) {
  return useQuery({
    queryKey: documentKeys.detail(documentId),
    queryFn: () =>
      apiClient.get<DocumentDetailResponse>(`/documents/${documentId}`),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!documentId,
  });
}

/**
 * Hook to upload a new document
 */
export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      return apiClient.uploadFile<DocumentResponse>("/documents", file, "file");
    },
    onSuccess: () => {
      // Invalidate all document lists to refetch
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
  });
}

/**
 * Hook to delete a document
 */
export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: number) => {
      return apiClient.delete<MessageResponse>(`/documents/${documentId}`);
    },
    onSuccess: (_, documentId) => {
      // Invalidate document lists
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      // Remove the specific document from cache
      queryClient.removeQueries({ queryKey: documentKeys.detail(documentId) });
    },
  });
}

/**
 * Hook to download a document
 * Note: This returns a URL that can be used in an anchor tag or window.open()
 */
export function getDocumentDownloadUrl(documentId: number): string {
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const token = localStorage.getItem("access_token");

  // Return URL with token as query parameter for direct download links
  return `${API_URL}/documents/${documentId}/download?token=${token}`;
}

/**
 * Hook to fetch document statistics
 */
export function useDocumentStats(documentId: number) {
  return useQuery({
    queryKey: [...documentKeys.detail(documentId), "stats"] as const,
    queryFn: () =>
      apiClient.get<DocumentStatsResponse>(`/documents/${documentId}/stats`),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!documentId,
  });
}
