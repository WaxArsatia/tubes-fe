import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  ActivityStatsResponse,
  ActivityType,
  DocumentHistoryResponse,
  HistoryResponse,
  MessageResponse,
  RecentActivityResponse,
} from "@/lib/types";

interface HistoryFilters {
  type?: ActivityType;
  document_id?: number;
  date_from?: string;
  date_to?: string;
  per_page?: number;
  page?: number;
}

/**
 * Query key factory for history
 */
export const historyKeys = {
  all: ["history"] as const,
  lists: () => [...historyKeys.all, "list"] as const,
  list: (filters: HistoryFilters) => [...historyKeys.lists(), filters] as const,
  stats: () => [...historyKeys.all, "stats"] as const,
  stat: (period?: string) => [...historyKeys.stats(), period] as const,
};

/**
 * Hook to fetch activity history with filtering and pagination
 */
export function useHistory(params?: HistoryFilters) {
  return useQuery({
    queryKey: historyKeys.list(params ?? {}),
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.type) {
        searchParams.append("type", params.type);
      }

      if (params?.document_id)
        searchParams.append("document_id", params.document_id.toString());
      if (params?.date_from) searchParams.append("date_from", params.date_from);
      if (params?.date_to) searchParams.append("date_to", params.date_to);
      if (params?.per_page)
        searchParams.append("per_page", params.per_page.toString());
      if (params?.page) searchParams.append("page", params.page.toString());

      const query = searchParams.toString();
      const url = query ? `/history?${query}` : "/history";

      return apiClient.get<HistoryResponse>(url);
    },
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Hook to fetch activity statistics
 */
export function useActivityStats(
  period?: "today" | "week" | "month" | "year" | "all",
) {
  return useQuery({
    queryKey: historyKeys.stat(period),
    queryFn: async () => {
      const url = period ? `/history/stats?period=${period}` : "/history/stats";
      return apiClient.get<ActivityStatsResponse>(url);
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to fetch document-specific history
 */
export function useDocumentHistory(documentId: number) {
  return useQuery({
    queryKey: [...historyKeys.all, "documents", documentId] as const,
    queryFn: () =>
      apiClient.get<DocumentHistoryResponse>(
        `/history/documents/${documentId}`,
      ),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!documentId,
  });
}

/**
 * Hook to fetch recent activity
 */
export function useRecentActivity(limit = 10) {
  return useQuery({
    queryKey: [...historyKeys.all, "recent", limit] as const,
    queryFn: async () => {
      return apiClient.get<RecentActivityResponse>(
        `/history/recent?limit=${limit}`,
      );
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 30000, // Auto-refetch every 30 seconds for real-time feel
  });
}

/**
 * Hook to clear history
 */
export function useClearHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params?: { type?: string; before_date?: string }) => {
      const searchParams = new URLSearchParams();
      if (params?.type) searchParams.append("type", params.type);
      if (params?.before_date)
        searchParams.append("before_date", params.before_date);

      const query = searchParams.toString();
      const url = query ? `/history?${query}` : "/history";

      return apiClient.delete<MessageResponse>(url);
    },
    onSuccess: () => {
      // Invalidate all history queries
      queryClient.invalidateQueries({ queryKey: historyKeys.all });
    },
  });
}
