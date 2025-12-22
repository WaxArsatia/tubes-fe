/**
 * API Types based on Laravel API Documentation
 */

export type SummaryType = "concise" | "detailed" | "bullet_points" | "abstract";
export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizQuestionType = "multiple_choice" | "true_false" | "mixed";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  last_login_ip?: string;
}

export type UserRole = User["role"];

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
  };
}

export interface UserResponse {
  data: {
    user: User;
  };
}

export interface ValidationError {
  message: string;
  errors: { [field: string]: string[] };
}

export interface ApiError {
  message: string;
  errors?: { [field: string]: string[] };
  status?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface MessageResponse {
  message: string;
}

/**
 * Document Types
 */

export interface Document {
  id: number;
  user_id: number;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  status: "pending" | "processing" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}

export interface DocumentResponse {
  data: {
    document: Document;
  };
}

export interface DocumentsResponse {
  data: {
    documents: Document[];
  };
}

/**
 * Summary Types
 */

export interface Summary {
  id: number;
  document_id: number;
  user_id: number;
  content: string;
  summary_type: SummaryType;
  word_count: number;
  language: "en" | "id";
  status: "pending" | "processing" | "completed" | "failed";
  processing_time_seconds?: number;
  views_count?: number;
  last_viewed_at?: string;
  document_name?: string;
  created_at: string;
  updated_at: string;
}

export interface SummaryResponse {
  data: {
    summary: Summary;
  };
}

/**
 * AI Chat Types
 */

export interface ChatMessage {
  id: number;
  document_id: number;
  user_id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ChatMessagesResponse {
  data: {
    messages: ChatMessage[];
  };
}

export interface ChatMessageRequest {
  document_id: number;
  message: string;
}

/**
 * Quiz Types
 */

export interface QuizQuestion {
  id: number;
  question: string;
  type?: "multiple_choice" | "true_false"; // Only present for mixed question_type
  options: string[]; // 4 options for multiple_choice, 2 for true_false
  correct_answer: number; // 0-3 for multiple_choice, 0-1 for true_false
  explanation?: string;
}

export interface Quiz {
  id: number;
  document_id: number;
  document_name?: string;
  user_id: number;
  difficulty: QuizDifficulty;
  question_count: number;
  question_type: QuizQuestionType;
  questions: QuizQuestion[];
  attempts_count?: number;
  best_score?: number;
  average_score?: number;
  created_at: string;
  updated_at: string;
}

export interface QuizResponse {
  data: {
    quiz: Quiz;
  };
}

export interface QuizGenerationRequest {
  document_id: number;
  question_count: number;
  difficulty: QuizDifficulty;
  question_type: QuizQuestionType;
}

/**
 * Quiz Result Types
 */

export interface QuizAttempt {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unanswered?: number;
  time_spent_seconds: number;
  percentage: number;
  passed: boolean;
  submitted_at: string;
}

export interface QuizAnswerResult {
  question_id: number;
  question: string;
  type?: "multiple_choice" | "true_false"; // Only present for mixed question_type
  options: string[];
  user_answer: number;
  correct_answer: number;
  is_correct: boolean;
  explanation: string;
}

export interface QuizResultResponse {
  data: {
    quiz_attempt: QuizAttempt;
    answers: QuizAnswerResult[];
    quiz: Quiz;
  };
}

export interface QuizSubmitRequest {
  attempt_id: number;
  answers: Array<{
    question_id: number;
    answer_index: number;
  }>;
  time_spent_seconds: number;
}

/**
 * Pagination Types
 */

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

/**
 * Enhanced Document Response Types
 */

export interface DocumentWithDetails extends Document {
  summary?: {
    id: number;
    content: string;
    word_count: number;
    created_at: string;
  };
  quizzes_count?: number;
  last_accessed_at?: string;
}

export interface DocumentsListResponse {
  data: {
    documents: Document[];
    pagination: PaginationMeta;
  };
}

export interface DocumentDetailResponse {
  data: {
    document: DocumentWithDetails;
  };
}

/**
 * Summary Request/Response Types
 */

export interface SummaryGenerationRequest {
  document_id: number;
  summary_type: SummaryType;
  language?: "en" | "id";
  custom_prompt?: string;
}

export interface SummaryWithDocument extends Summary {
  document?: {
    id: number;
    original_filename: string;
    file_size: number;
    mime_type: string;
  };
}

export interface SummaryDetailResponse {
  data: {
    summary: SummaryWithDocument;
    document?: {
      id: number;
      original_filename: string;
      file_size: number;
      mime_type: string;
    };
  };
}

export interface DocumentSummariesResponse {
  data: {
    document: {
      id: number;
      original_filename: string;
    };
    summaries: Summary[];
    stats: {
      total_summaries: number;
      total_views: number;
      most_viewed_type: string;
    };
  };
}

/**
 * History/Activity Types
 */

export type ActivityType =
  | "document_upload"
  | "document_view"
  | "document_delete"
  | "summary_generate"
  | "summary_view"
  | "quiz_generate"
  | "quiz_start"
  | "quiz_complete"
  | "profile_update";

export interface Activity {
  id: number;
  user_id: number;
  activity_type: ActivityType;
  description: string;
  metadata: {
    document_id?: number;
    document_name?: string;
    quiz_id?: number;
    summary_id?: number;
    score?: number;
    total_questions?: number;
    time_spent_seconds?: number;
    difficulty?: string;
    word_count?: number;
    file_size?: number;
    mime_type?: string;
    [key: string]: unknown;
  };
  created_at: string;
}

export interface HistoryResponse {
  data: {
    activities: Activity[];
    pagination: PaginationMeta;
  };
}

export interface ActivityStats {
  period: string;
  date_from: string;
  date_to: string;
  stats: {
    total_activities: number;
    documents_uploaded: number;
    documents_deleted: number;
    summaries_generated: number;
    quizzes_generated: number;
    quizzes_completed: number;
    total_quiz_attempts: number;
    average_quiz_score: number;
    total_time_spent_minutes: number;
  };
  activity_breakdown: Record<ActivityType, number>;
  daily_activity: Array<{
    date: string;
    count: number;
  }>;
  top_documents: Array<{
    document_id: number;
    document_name: string;
    activity_count: number;
  }>;
}

export interface ActivityStatsResponse {
  data: ActivityStats;
}

/**
 * Admin Types
 */

export interface UserStats {
  documents_count: number;
  summaries_count: number;
  quizzes_count: number;
  quiz_attempts_count?: number;
  average_quiz_score?: number;
  total_storage_mb: number;
  total_activities?: number;
  account_age_days?: number;
  last_active_at?: string;
}

export interface UserWithStats extends User {
  stats: UserStats;
}

export interface AdminDashboardStats {
  period: string;
  date_from: string;
  date_to: string;
  stats: {
    users: {
      total: number;
      new_this_period: number;
      active_users: number;
      admin_count: number;
      verified_count: number;
      growth_percentage: number;
    };
    documents: {
      total: number;
      uploaded_this_period: number;
      total_size_mb: number;
      by_status: {
        completed: number;
        processing: number;
        pending: number;
        failed: number;
      };
      average_size_mb: number;
      by_type: Record<string, number>;
    };
    summaries: {
      total: number;
      generated_this_period: number;
      total_views: number;
      average_word_count: number;
      by_type: Record<string, number>;
    };
    quizzes: {
      total: number;
      generated_this_period: number;
      total_attempts: number;
      completed_attempts: number;
      average_score: number;
      by_difficulty: Record<string, number>;
    };
    system: {
      storage_used_gb: number;
      storage_limit_gb: number;
      storage_percentage: number;
      api_calls_this_period: number;
      average_response_time_ms: number;
    };
  };
  recent_activities: Array<{
    user_name: string;
    activity_type: ActivityType;
    description: string;
    created_at: string;
  }>;
  charts: {
    daily_signups: Array<{ date: string; count: number }>;
    daily_uploads: Array<{ date: string; count: number }>;
    quiz_performance: Array<{ difficulty: string; average_score: number }>;
  };
}

export interface AdminDashboardResponse {
  data: AdminDashboardStats;
}

export interface AdminUsersResponse {
  data: {
    users: UserWithStats[];
    pagination: PaginationMeta;
  };
}

export interface AdminUserDetailResponse {
  data: {
    user: User;
    stats: UserStats;
    recent_documents: Array<{
      id: number;
      original_filename: string;
      file_size: number;
      status: string;
      created_at: string;
    }>;
    recent_activities: Activity[];
  };
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "user";
  email_verified_at?: string | null;
}

/**
 * Health Check Type
 */

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
}

/**
 * Quiz List and Attempt Types
 */

export interface QuizListItem {
  id: number;
  document_id: number;
  document_name: string;
  difficulty: QuizDifficulty;
  question_count: number;
  question_type: QuizQuestionType;
  attempts_count: number;
  best_score?: number;
  last_attempt_at?: string;
  created_at: string;
}

export interface QuizzesListResponse {
  data: {
    quizzes: QuizListItem[];
    pagination: PaginationMeta;
  };
}

export interface QuizStartResponse {
  message: string;
  data: {
    attempt_id: number;
    quiz_id: number;
    started_at: string;
    expires_at?: string;
  };
}

export interface QuizAttemptHistoryResponse {
  data: {
    quiz: {
      id: number;
      document_name: string;
      difficulty: string;
      question_count: number;
    };
    attempts: Array<{
      id: number;
      score: number;
      percentage: number;
      passed: boolean;
      time_spent_seconds: number;
      submitted_at: string;
    }>;
    stats: {
      total_attempts: number;
      best_score: number;
      average_score: number;
      average_time_seconds: number;
      pass_rate: number;
    };
  };
}

/**
 * Document Stats Types
 */

export interface DocumentStats {
  file_size_mb: number;
  page_count?: number;
  word_count?: number;
  summaries_generated: number;
  quizzes_generated: number;
  total_quiz_attempts: number;
  average_quiz_score?: number;
  views_count: number;
  last_accessed_at?: string;
}

export interface DocumentStatsResponse {
  data: {
    document_id: number;
    stats: DocumentStats;
  };
}

/**
 * Document History Types
 */

export interface DocumentHistoryResponse {
  data: {
    document: {
      id: number;
      original_filename: string;
      created_at: string;
    };
    activities: Activity[];
    stats: {
      total_views: number;
      summaries_generated: number;
      quizzes_taken: number;
      average_quiz_score: number;
    };
  };
}

export interface RecentActivityResponse {
  data: {
    activities: Activity[];
  };
}

/**
 * Summary Advanced Types
 */

export interface SummariesListResponse {
  data: {
    summaries: Summary[];
    pagination: PaginationMeta;
  };
}

export interface SummaryRegenerateRequest {
  summary_type?: SummaryType;
  custom_prompt?: string;
}

export interface SummaryCompareRequest {
  summary_ids: number[];
}

export interface SummaryCompareResponse {
  data: {
    summaries: Summary[];
    comparison: {
      common_themes: string[];
      word_count_range: {
        min: number;
        max: number;
      };
      average_word_count: number;
    };
  };
}

export interface SummaryStatsResponse {
  data: {
    stats: {
      total_summaries: number;
      total_word_count: number;
      average_word_count: number;
      total_views: number;
      average_processing_time: number;
      by_type: Record<string, number>;
      by_language: Record<string, number>;
      most_viewed: {
        id: number;
        document_name: string;
        summary_type: string;
        views_count: number;
      };
    };
  };
}

/**
 * Admin Advanced Types
 */

export interface BanUserRequest {
  reason: string;
  duration_days?: number;
  permanent?: boolean;
}

export interface BanUserResponse {
  message: string;
  data: {
    user_id: number;
    banned_at: string;
    banned_until?: string;
    reason: string;
    permanent: boolean;
  };
}

export interface SystemAnalyticsResponse {
  data: {
    metric: string;
    period: string;
    granularity: string;
    date_from: string;
    date_to: string;
    data: Array<Record<string, unknown>>;
    summary: Record<string, unknown>;
  };
}

export interface ExportDataRequest {
  type: "users" | "documents" | "summaries" | "quizzes" | "activities" | "all";
  format: "csv" | "json" | "xlsx";
  filters?: Record<string, unknown>;
}

export interface ExportDataResponse {
  message: string;
  data: {
    export_id: string;
    status: "processing" | "completed" | "failed";
    estimated_time_seconds?: number;
    download_url?: string;
  };
}

export interface ExportStatusResponse {
  data: {
    export_id: string;
    status: "processing" | "completed" | "failed";
    progress_percentage?: number;
    estimated_time_remaining_seconds?: number;
    download_url?: string;
    file_size_mb?: number;
    expires_at?: string;
  };
}

export interface SystemHealthResponse {
  data: {
    status: "healthy" | "degraded" | "unhealthy";
    timestamp: string;
    checks: {
      database: {
        status: string;
        response_time_ms: number;
      };
      storage: {
        status: string;
        available_gb: number;
        used_gb: number;
        usage_percentage: number;
      };
      queue: {
        status: string;
        pending_jobs: number;
        failed_jobs: number;
      };
      cache: {
        status: string;
        hit_rate_percentage: number;
      };
      ai_api: {
        status: string;
        response_time_ms: number;
        rate_limit_remaining: number;
      };
    };
    version: string;
    environment: string;
  };
}

export interface ClearCacheRequest {
  cache_types: ("all" | "config" | "routes" | "views" | "query")[];
}

export interface ClearCacheResponse {
  message: string;
  data: {
    cleared_types: string[];
    timestamp: string;
  };
}
