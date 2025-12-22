/**
 * Auth-related TanStack Query hooks
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { authStorage } from "@/lib/auth-storage";
import type {
  AuthResponse,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  UserResponse,
} from "@/lib/types";

const userQueryKey = ["user"] as const;

/**
 * Hook to get current authenticated user
 * Returns null if not authenticated or token invalid
 */
export function useUser() {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: async () => {
      // Don't try to fetch if no token
      if (!authStorage.hasToken()) {
        return null;
      }

      try {
        const response = await apiClient.get<UserResponse>("/user");
        return response.data.user;
      } catch (error) {
        // If 401, clear token and return null
        if ((error as { status?: number }).status === 401) {
          authStorage.removeToken();
          return null;
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Don't retry on auth errors
  });
}

/**
 * Hook to login user
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await apiClient.post<AuthResponse>(
        "/login",
        credentials,
      );
      return response;
    },
    onSuccess: (data) => {
      // Store token
      authStorage.setToken(data.data.access_token);
      // Set user data in cache
      queryClient.setQueryData(userQueryKey, data.data.user);
      // Show success toast
      toast.success("Login berhasil!", {
        description: `Selamat datang, ${data.data.user.name}`,
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Login gagal", {
        description: error.message || "Silakan periksa email dan password Anda",
      });
    },
  });
}

/**
 * Hook to register new user
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: RegisterRequest) => {
      const response = await apiClient.post<AuthResponse>(
        "/register",
        credentials,
      );
      return response;
    },
    onSuccess: (data) => {
      // Store token
      authStorage.setToken(data.data.access_token);
      // Set user data in cache
      queryClient.setQueryData(userQueryKey, data.data.user);
      // Show success toast
      toast.success("Registrasi berhasil!", {
        description: `Selamat datang, ${data.data.user.name}`,
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Registrasi gagal", {
        description: error.message || "Silakan periksa data Anda dan coba lagi",
      });
    },
  });
}

/**
 * Hook to logout user
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await apiClient.post<MessageResponse>("/logout");
      } catch (error) {
        // Continue with logout even if API call fails
        console.error("Logout API error:", error);
      }
    },
    onSuccess: () => {
      // Clear token
      authStorage.removeToken();
      // Clear user data from cache
      queryClient.setQueryData(userQueryKey, null);
      // Clear all queries
      queryClient.clear();
      // Show success toast
      toast.success("Logout berhasil", {
        description: "Sampai jumpa lagi!",
      });
    },
  });
}
