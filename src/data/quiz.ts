import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type {
  MessageResponse,
  QuizAttemptHistoryResponse,
  QuizGenerationRequest,
  QuizResponse,
  QuizResultResponse,
  QuizStartResponse,
  QuizSubmitRequest,
  QuizzesListResponse,
} from "@/lib/types";

/**
 * Query key factory for quizzes
 */
export const quizKeys = {
  all: ["quizzes"] as const,
  lists: () => [...quizKeys.all, "list"] as const,
  list: (filters: {
    document_id?: number;
    difficulty?: string;
    sort?: string;
    per_page?: number;
    page?: number;
  }) => [...quizKeys.lists(), filters] as const,
  details: () => [...quizKeys.all, "detail"] as const,
  detail: (id: number) => [...quizKeys.details(), id] as const,
  results: () => [...quizKeys.all, "result"] as const,
  result: (id: number) => [...quizKeys.results(), id] as const,
  attempts: (id: number) => [...quizKeys.all, id, "attempts"] as const,
  attemptDetail: (quizId: number, attemptId: number) =>
    [...quizKeys.all, quizId, "attempts", attemptId] as const,
};

/**
 * Hook to generate a new quiz from a document
 */
export function useGenerateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: QuizGenerationRequest) => {
      return apiClient.post<QuizResponse>("/quizzes/generate", request);
    },
    onSuccess: (response) => {
      // Cache the newly generated quiz
      const quiz = response.data.quiz;
      queryClient.setQueryData(quizKeys.detail(quiz.id), response);
    },
  });
}

/**
 * Hook to fetch a quiz by ID
 */
export function useQuiz(quizId: number) {
  return useQuery({
    queryKey: quizKeys.detail(quizId),
    queryFn: () => apiClient.get<QuizResponse>(`/quizzes/${quizId}`),
    staleTime: 1000 * 60 * 5, // 5 minutes - quizzes don't change
    enabled: !!quizId,
  });
}

/**
 * Hook to submit quiz answers
 */
export function useSubmitQuiz(quizId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: QuizSubmitRequest) => {
      return apiClient.post<QuizResultResponse>(
        `/quizzes/${quizId}/submit`,
        request,
      );
    },
    onSuccess: (response) => {
      // Cache the quiz result
      queryClient.setQueryData(quizKeys.result(quizId), response);
    },
  });
}

/**
 * Hook to fetch quiz result
 */
export function useQuizResult(quizId: number) {
  return useQuery({
    queryKey: quizKeys.result(quizId),
    queryFn: () =>
      apiClient.get<QuizResultResponse>(`/quizzes/${quizId}/result`),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!quizId,
  });
}

/**
 * Hook to fetch all quizzes with filtering and pagination
 */
export function useQuizzes(params?: {
  document_id?: number;
  difficulty?: string;
  sort?: "newest" | "oldest" | "difficulty";
  per_page?: number;
  page?: number;
}) {
  return useQuery({
    queryKey: quizKeys.list(params ?? {}),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.document_id)
        searchParams.append("document_id", params.document_id.toString());
      if (params?.difficulty)
        searchParams.append("difficulty", params.difficulty);
      if (params?.sort) searchParams.append("sort", params.sort);
      if (params?.per_page)
        searchParams.append("per_page", params.per_page.toString());
      if (params?.page) searchParams.append("page", params.page.toString());

      const query = searchParams.toString();
      const url = query ? `/quizzes?${query}` : "/quizzes";

      return apiClient.get<QuizzesListResponse>(url);
    },
    staleTime: 1000 * 60, // 1 minute
  });
}

/**
 * Hook to start a quiz attempt
 */
export function useStartQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: number) => {
      return apiClient.post<QuizStartResponse>(`/quizzes/${quizId}/start`);
    },
    onSuccess: (_, quizId) => {
      // Invalidate quiz details to refresh attempt count
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
    },
  });
}

/**
 * Hook to fetch quiz attempt history
 */
export function useQuizAttempts(quizId: number) {
  return useQuery({
    queryKey: quizKeys.attempts(quizId),
    queryFn: () =>
      apiClient.get<QuizAttemptHistoryResponse>(`/quizzes/${quizId}/attempts`),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!quizId,
  });
}

/**
 * Hook to fetch detailed quiz attempt result
 */
export function useQuizAttemptDetail(quizId: number, attemptId: number) {
  return useQuery({
    queryKey: quizKeys.attemptDetail(quizId, attemptId),
    queryFn: () =>
      apiClient.get<QuizResultResponse>(
        `/quizzes/${quizId}/attempts/${attemptId}`,
      ),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!quizId && !!attemptId,
  });
}

/**
 * Hook to delete a quiz
 */
export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: number) => {
      return apiClient.delete<MessageResponse>(`/quizzes/${quizId}`);
    },
    onSuccess: () => {
      // Invalidate all quiz queries
      queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
}
