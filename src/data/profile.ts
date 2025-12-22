/**
 * Profile-related TanStack Query hooks
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import type { MessageResponse, User } from "@/lib/types";

/**
 * Query key factory for profile
 */
export const profileKeys = {
  all: ["profile"] as const,
  user: () => [...profileKeys.all, "user"] as const,
};

/**
 * Types for profile operations
 */
interface UpdateProfileRequest {
  name: string;
  email: string;
}

interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

interface ProfileUpdateResponse {
  message: string;
  data: {
    user: User;
  };
}

interface AvatarUploadResponse {
  message: string;
  data: {
    avatar_url: string;
  };
}

/**
 * Hook to update profile information
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const response = await apiClient.put<ProfileUpdateResponse>(
        "/profile",
        data,
      );
      return response;
    },
    onSuccess: (data) => {
      // Update user data in cache
      queryClient.setQueryData(["user"], data.data.user);
      // Optionally invalidate to refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Show success toast
      toast.success("Profil berhasil diupdate!", {
        description: "Informasi profil Anda telah disimpan",
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Gagal update profil", {
        description: error.message || "Terjadi kesalahan saat menyimpan data",
      });
    },
  });
}

/**
 * Hook to update password
 */
export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (data: UpdatePasswordRequest) => {
      const response = await apiClient.patch<MessageResponse>(
        "/profile/password",
        data,
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Password berhasil diubah!", {
        description: "Password Anda telah diperbarui",
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Gagal ubah password", {
        description: error.message || "Password saat ini mungkin salah",
      });
    },
  });
}

/**
 * Hook to upload profile avatar
 */
export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await apiClient.uploadFile<AvatarUploadResponse>(
        "/profile/avatar",
        file,
        "avatar",
      );
      return response;
    },
    onSuccess: () => {
      // Invalidate user query to refetch with new avatar
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Show success toast
      toast.success("Avatar berhasil diupload!", {
        description: "Foto profil Anda telah diperbarui",
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Gagal upload avatar", {
        description: error.message || "Terjadi kesalahan saat upload foto",
      });
    },
  });
}

/**
 * Hook to delete profile avatar
 */
export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response =
        await apiClient.delete<MessageResponse>("/profile/avatar");
      return response;
    },
    onSuccess: () => {
      // Invalidate user query to refetch without avatar
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Show success toast
      toast.success("Avatar berhasil dihapus", {
        description: "Foto profil Anda telah dihapus",
      });
    },
    onError: (error: { message?: string }) => {
      toast.error("Gagal hapus avatar", {
        description: error.message || "Terjadi kesalahan saat menghapus foto",
      });
    },
  });
}
