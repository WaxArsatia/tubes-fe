import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  AdminDashboardResponse,
  AdminUserDetailResponse,
  AdminUsersResponse,
  BanUserRequest,
  BanUserResponse,
  ClearCacheRequest,
  ClearCacheResponse,
  ExportDataRequest,
  ExportDataResponse,
  ExportStatusResponse,
  MessageResponse,
  SystemAnalyticsResponse,
  SystemHealthResponse,
  UpdateUserRequest,
} from "@/lib/types";

/**
 * Query key factory for admin endpoints
 */
export const adminKeys = {
  all: ["admin"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
  dashboardWithPeriod: (period?: string) =>
    [...adminKeys.dashboard(), period] as const,
  users: () => [...adminKeys.all, "users"] as const,
  usersList: (filters: {
    search?: string;
    role?: string;
    verified?: boolean;
    sort?: string;
    per_page?: number;
    page?: number;
  }) => [...adminKeys.users(), "list", filters] as const,
  userDetails: () => [...adminKeys.users(), "detail"] as const,
  userDetail: (id: number) => [...adminKeys.userDetails(), id] as const,
};

/**
 * Hook to fetch admin dashboard statistics
 */
export function useAdminDashboard(
  period?: "today" | "week" | "month" | "year" | "all",
) {
  return useQuery({
    queryKey: adminKeys.dashboardWithPeriod(period),
    queryFn: async () => {
      const url = period
        ? `/admin/dashboard?period=${period}`
        : "/admin/dashboard";
      return apiClient.get<AdminDashboardResponse>(url);
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to fetch all users with filtering and pagination
 */
export function useAdminUsers(params?: {
  search?: string;
  role?: "admin" | "user";
  verified?: boolean;
  sort?: "newest" | "oldest" | "name" | "email" | "activity";
  per_page?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: adminKeys.usersList(params ?? {}),
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.search) searchParams.append("search", params.search);
      if (params?.role) searchParams.append("role", params.role);
      if (params?.verified !== undefined)
        searchParams.append("verified", params.verified.toString());
      if (params?.sort) searchParams.append("sort", params.sort);
      if (params?.per_page)
        searchParams.append("per_page", params.per_page.toString());
      if (params?.page) searchParams.append("page", params.page.toString());

      const query = searchParams.toString();
      const url = query ? `/admin/users?${query}` : "/admin/users";

      return apiClient.get<AdminUsersResponse>(url);
    },
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Hook to fetch detailed information about a specific user
 */
export function useAdminUser(userId: number) {
  return useQuery({
    queryKey: adminKeys.userDetail(userId),
    queryFn: () =>
      apiClient.get<AdminUserDetailResponse>(`/admin/users/${userId}`),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!userId,
  });
}

/**
 * Hook to update user information (admin only)
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: number;
      data: UpdateUserRequest;
    }) => {
      return apiClient.put<MessageResponse>(`/admin/users/${userId}`, data);
    },
    onSuccess: (_, { userId }) => {
      // Invalidate user detail and users list
      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(userId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
}

/**
 * Hook to delete a user (admin only)
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return apiClient.delete<MessageResponse>(`/admin/users/${userId}`);
    },
    onSuccess: (_, userId) => {
      // Invalidate users list and remove user from cache
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.removeQueries({ queryKey: adminKeys.userDetail(userId) });
      // Refresh dashboard stats
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

/**
 * Hook to ban a user (admin only)
 */
export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: number;
      data: BanUserRequest;
    }) => {
      return apiClient.post<BanUserResponse>(
        `/admin/users/${userId}/ban`,
        data,
      );
    },
    onSuccess: (_, { userId }) => {
      // Invalidate user detail and users list
      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(userId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
}

/**
 * Hook to unban a user (admin only)
 */
export function useUnbanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return apiClient.post<MessageResponse>(`/admin/users/${userId}/unban`);
    },
    onSuccess: (_, userId) => {
      // Invalidate user detail and users list
      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(userId) });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
}

/**
 * Hook to fetch system analytics (admin only)
 */
export function useSystemAnalytics(params: {
  metric:
    | "users"
    | "documents"
    | "summaries"
    | "quizzes"
    | "storage"
    | "performance";
  period?: "day" | "week" | "month" | "year";
  granularity?: "hourly" | "daily" | "weekly" | "monthly";
}) {
  return useQuery({
    queryKey: [...adminKeys.all, "analytics", params] as const,
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        metric: params.metric,
        ...(params.period && { period: params.period }),
        ...(params.granularity && { granularity: params.granularity }),
      });

      return apiClient.get<SystemAnalyticsResponse>(
        `/admin/analytics?${searchParams}`,
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to export data (admin only)
 */
export function useExportData() {
  return useMutation({
    mutationFn: async (data: ExportDataRequest) => {
      return apiClient.post<ExportDataResponse>("/admin/export", data);
    },
  });
}

/**
 * Hook to check export status (admin only)
 */
export function useExportStatus(exportId: string) {
  return useQuery({
    queryKey: [...adminKeys.all, "exports", exportId] as const,
    queryFn: () =>
      apiClient.get<ExportStatusResponse>(`/admin/exports/${exportId}`),
    staleTime: 1000 * 5, // 5 seconds
    refetchInterval: (query) => {
      // Stop polling if export is completed or failed
      const status = query.state.data?.data.status;
      return status === "processing" ? 5000 : false;
    },
    enabled: !!exportId,
  });
}

/**
 * Hook to fetch system health (admin only)
 */
export function useSystemHealth() {
  return useQuery({
    queryKey: [...adminKeys.all, "health"] as const,
    queryFn: () => apiClient.get<SystemHealthResponse>("/admin/health"),
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 30000, // Auto-refetch every 30 seconds
  });
}

/**
 * Hook to clear cache (admin only)
 */
export function useClearCache() {
  return useMutation({
    mutationFn: async (data: ClearCacheRequest) => {
      return apiClient.post<ClearCacheResponse>("/admin/cache/clear", data);
    },
  });
}
