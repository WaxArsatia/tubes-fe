import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api-client";
import type { ApiResponse, AuthResponse, User } from "./types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<AuthResponse>(
        "/login",
        credentials,
      );
      apiClient.setToken(response.data.access_token);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await apiClient.post<AuthResponse>(
        "/register",
        credentials,
      );
      apiClient.setToken(response.data.access_token);
      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/logout");
    },
    onSuccess: () => {
      apiClient.setToken(null);
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = apiClient.getToken();
      if (!token) return null;

      try {
        const response =
          await apiClient.get<ApiResponse<{ user: User }>>("/user");
        return response.data.user;
      } catch {
        apiClient.setToken(null);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
