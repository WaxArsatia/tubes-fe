/**
 * Auth utility functions for route guards
 */

import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import type { User } from "@/lib/types";

/**
 * Fetch the current user from the API
 * Returns null if not authenticated or token is invalid
 */
export async function fetchCurrentUser(
  queryClient: QueryClient,
): Promise<User | null> {
  return await queryClient.fetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { apiClient } = await import("@/lib/api-client");
        const { authStorage } = await import("@/lib/auth-storage");

        if (!authStorage.hasToken()) {
          return null;
        }

        const response = await apiClient.get<{ data: { user: User } }>("/user");
        return response.data.user;
      } catch {
        const { authStorage } = await import("@/lib/auth-storage");
        authStorage.removeToken();
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

/**
 * Route guard: Require authentication
 * Redirects to login if not authenticated
 */
export async function requireAuth(queryClient: QueryClient): Promise<User> {
  const user = await fetchCurrentUser(queryClient);

  if (!user) {
    throw redirect({ to: "/auth/login" });
  }

  return user;
}

/**
 * Route guard: Require guest (not authenticated)
 * Redirects to dashboard if already authenticated
 */
export async function requireGuest(queryClient: QueryClient): Promise<void> {
  const user = await fetchCurrentUser(queryClient);

  if (user) {
    throw redirect({ to: "/dashboard" });
  }
}

/**
 * Route guard: Require admin role
 * Redirects to dashboard if not admin
 */
export async function requireAdmin(queryClient: QueryClient): Promise<User> {
  const user = await requireAuth(queryClient);

  if (user.role !== "admin") {
    throw redirect({ to: "/dashboard" });
  }

  return user;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null | undefined): boolean {
  return user?.role === "admin";
}

/**
 * Redirect admin users to admin dashboard
 */
export function redirectAdminToAdminDashboard(user: User): void {
  if (user.role === "admin") {
    throw redirect({ to: "/admin/dashboard" });
  }
}
