import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  DocumentSummariesResponse,
  MessageResponse,
  SummariesListResponse,
  SummaryCompareRequest,
  SummaryCompareResponse,
  SummaryDetailResponse,
  SummaryGenerationRequest,
  SummaryRegenerateRequest,
  SummaryResponse,
  SummaryStatsResponse,
} from "@/lib/types";

/**
 * Query key factory for summaries
 */
export const summaryKeys = {
  all: ["summaries"] as const,
  details: () => [...summaryKeys.all, "detail"] as const,
  detail: (id: number) => [...summaryKeys.details(), id] as const,
  byDocument: (documentId: number) =>
    [...summaryKeys.all, "document", documentId] as const,
};

/**
 * Hook to generate a new summary from a document
 */
export function useGenerateSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: SummaryGenerationRequest) => {
      return apiClient.post<SummaryResponse>("/summaries/generate", request);
    },
    onSuccess: (response, variables) => {
      // Cache the newly generated summary
      const summary = response.data.summary;
      queryClient.setQueryData(summaryKeys.detail(summary.id), response);

      // Invalidate document's summaries list
      queryClient.invalidateQueries({
        queryKey: summaryKeys.byDocument(variables.document_id),
      });
    },
  });
}

/**
 * Hook to fetch a summary by ID
 */
export function useSummary(summaryId: number) {
  return useQuery({
    queryKey: summaryKeys.detail(summaryId),
    queryFn: () =>
      apiClient.get<SummaryDetailResponse>(`/summaries/${summaryId}`),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!summaryId,
  });
}

/**
 * Hook to fetch all summaries for a document
 */
export function useSummaries(
  documentId: number,
  params?: {
    summary_type?: "concise" | "detailed" | "bullet_points" | "abstract";
    language?: "en" | "id";
  },
) {
  return useQuery({
    queryKey: [...summaryKeys.byDocument(documentId), params] as const,
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.summary_type)
        searchParams.append("summary_type", params.summary_type);
      if (params?.language) searchParams.append("language", params.language);

      const query = searchParams.toString();
      const url = query
        ? `/documents/${documentId}/summaries?${query}`
        : `/documents/${documentId}/summaries`;

      return apiClient.get<DocumentSummariesResponse>(url);
    },
    staleTime: 1000 * 60, // 1 minute
    enabled: !!documentId,
  });
}

/**
 * Hook to delete a summary
 */
export function useDeleteSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (summaryId: number) => {
      return apiClient.delete<MessageResponse>(`/summaries/${summaryId}`);
    },
    onSuccess: (_, summaryId) => {
      // Remove the specific summary from cache
      queryClient.removeQueries({ queryKey: summaryKeys.detail(summaryId) });

      // Invalidate all document summaries (we don't know which document it belongs to)
      queryClient.invalidateQueries({ queryKey: summaryKeys.all });
    },
  });
}

/**
 * Hook to fetch all summaries with filtering and pagination
 */
export function useAllSummaries(params?: {
  summary_type?: string;
  language?: string;
  status?: string;
  sort?: "newest" | "oldest" | "views";
  per_page?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: [...summaryKeys.all, "list", params] as const,
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.summary_type)
        searchParams.append("summary_type", params.summary_type);
      if (params?.language) searchParams.append("language", params.language);
      if (params?.status) searchParams.append("status", params.status);
      if (params?.sort) searchParams.append("sort", params.sort);
      if (params?.per_page)
        searchParams.append("per_page", params.per_page.toString());
      if (params?.page) searchParams.append("page", params.page.toString());

      const query = searchParams.toString();
      const url = query ? `/summaries?${query}` : "/summaries";

      return apiClient.get<SummariesListResponse>(url);
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to regenerate an existing summary
 */
export function useRegenerateSummary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      summaryId,
      data,
    }: {
      summaryId: number;
      data?: SummaryRegenerateRequest;
    }) => {
      return apiClient.post<SummaryResponse>(
        `/summaries/${summaryId}/regenerate`,
        data,
      );
    },
    onSuccess: (response, variables) => {
      // Update the cached summary
      const summary = response.data.summary;
      queryClient.setQueryData(
        summaryKeys.detail(variables.summaryId),
        response,
      );

      // Invalidate document's summaries list
      queryClient.invalidateQueries({
        queryKey: summaryKeys.byDocument(summary.document_id),
      });

      // Invalidate all summaries list
      queryClient.invalidateQueries({ queryKey: summaryKeys.all });
    },
  });
}

/**
 * Hook to export a summary in various formats
 * Returns a URL to trigger download
 */
export function useSummaryExport() {
  return useMutation({
    mutationFn: async ({
      summaryId,
      format,
    }: {
      summaryId: number;
      format: "txt" | "pdf" | "docx" | "markdown";
    }) => {
      // Trigger download by opening URL in new window
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
      const token = localStorage.getItem("access_token");
      const url = `${API_URL}/summaries/${summaryId}/export?format=${format}&token=${token}`;
      window.open(url, "_blank");
      return { success: true };
    },
  });
}

/**
 * Hook to compare multiple summaries
 */
export function useCompareSummaries() {
  return useMutation({
    mutationFn: async (data: SummaryCompareRequest) => {
      return apiClient.post<SummaryCompareResponse>("/summaries/compare", data);
    },
  });
}

/**
 * Hook to fetch summary statistics
 */
export function useSummaryStats(
  period?: "today" | "week" | "month" | "year" | "all",
) {
  return useQuery({
    queryKey: [...summaryKeys.all, "stats", period] as const,
    queryFn: async () => {
      const url = period
        ? `/summaries/stats?period=${period}`
        : "/summaries/stats";
      return apiClient.get<SummaryStatsResponse>(url);
    },
    staleTime: 1000 * 60, // 1 minute
  });
}
