import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, RotateCcw, Target, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuizAttemptDetail } from "@/data/quiz";
import { requireAuth } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";

type ResultSearchParams = {
  attemptId?: number;
};

export const Route = createFileRoute("/quiz/$id_/result")({
  validateSearch: (search: Record<string, unknown>): ResultSearchParams => {
    return {
      attemptId: search.attemptId ? Number(search.attemptId) : undefined,
    };
  },
  beforeLoad: async ({ context }) => {
    await requireAuth(context.queryClient);
  },
  component: QuizResultPage,
});

function QuizResultPage() {
  const { id } = Route.useParams();
  const { attemptId } = Route.useSearch();
  const quizId = Number.parseInt(id, 10);

  const { data, isLoading } = useQuizAttemptDetail(quizId, attemptId ?? 0);

  // If no attemptId provided, show error
  if (!attemptId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md p-8">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            No Attempt Found
          </h2>
          <p className="mb-4 text-slate-600">
            Please submit a quiz attempt first.
          </p>
          <Link
            to="/quiz/$id"
            params={{ id: id }}
            className={buttonVariants({ variant: "default" })}
          >
            Back to Quiz
          </Link>
        </Card>
      </div>
    );
  }

  const result = data;

  if (isLoading) {
    return <QuizResultSkeleton />;
  }

  if (!result) {
    return null;
  }

  const { quiz_attempt, answers, quiz } = result.data;
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="relative flex w-full min-h-screen bg-background">
      <main className="flex-1 p-5">
        <div className="mx-auto flex max-w-287.5 flex-col gap-8">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <nav className="flex items-center gap-2 text-sm">
                <Link
                  to="/dashboard"
                  className="font-medium text-slate-600 hover:text-slate-900"
                >
                  Dashboard
                </Link>
                <span className="text-slate-400">/</span>
                <Link
                  to="/dashboard/$id/summarize"
                  params={{ id: String(quiz.document_id) }}
                  className="font-medium text-slate-600 hover:text-slate-900"
                >
                  Summarize
                </Link>
                <span className="text-slate-400">/</span>
                <Link
                  to="/quiz/$id"
                  params={{ id: String(quizId) }}
                  className="font-medium text-slate-600 hover:text-slate-900"
                >
                  Quiz
                </Link>
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-900">Result</span>
              </nav>
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                Quiz Results
              </h1>
              <p className="font-medium text-cyan-700">
                Assessment completed on {formatDate(quiz_attempt.submitted_at)}{" "}
                • {quiz.question_count} Questions
              </p>
            </div>
            <Link
              to="/quiz/$id"
              params={{ id: String(quizId) }}
              className={buttonVariants({
                variant: "default",
                className: "h-11 gap-2 bg-cyan-600 hover:bg-cyan-700",
              })}
            >
              <RotateCcw className="size-5" />
              <span className="text-sm font-bold">Retake Quiz</span>
            </Link>
          </div>
          <div className="flex gap-25">
            <Card className="relative flex flex-1 items-center justify-center overflow-hidden rounded-3xl border-border p-31.5 shadow-sm">
              <div className="absolute rounded-full -left-10 -top-10 size-32 bg-cyan-100/50 blur-8" />
              <div className="absolute rounded-full -bottom-10 -right-10 size-32 bg-cyan-100/50 blur-8" />
              <div className="z-10 flex flex-col items-center gap-6">
                <div className="relative flex items-center justify-center size-40">
                  <svg
                    className="-rotate-90 size-40"
                    viewBox="0 0 160 160"
                    aria-label="Score circle"
                  >
                    <title>Score visualization</title>
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${(quiz_attempt.percentage / 100) * 440} 440`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                      {quiz_attempt.score}
                    </span>
                    <span className="text-xs font-bold text-cyan-700">
                      Score
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Great Job!
                  </h3>
                  <p className="text-sm font-medium text-cyan-700">
                    You passed the threshold.
                  </p>
                </div>
              </div>
            </Card>
            <div className="flex flex-col gap-5">
              <Card className="flex w-70.5 flex-col gap-1 overflow-hidden rounded-3xl border-border px-6 py-20 shadow-sm">
                <div className="flex items-center gap-2 pb-1.5">
                  <Clock className="size-5 text-cyan-700" />
                  <span className="text-xs font-bold tracking-wide uppercase text-cyan-700">
                    Time Taken
                  </span>
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {formatTime(quiz_attempt.time_spent_seconds)}
                </span>
              </Card>
              <Card className="flex w-70.5 flex-col gap-1 overflow-hidden rounded-3xl border-border px-6 py-20 shadow-sm">
                <div className="flex items-center gap-2 pb-1.5">
                  <Target className="size-5 text-cyan-700" />
                  <span className="text-xs font-bold tracking-wide uppercase text-cyan-700">
                    Accuracy
                  </span>
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {quiz_attempt.percentage}%
                </span>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="text-2xl font-bold text-slate-900">
                Question Review
              </h2>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
                  <div className="rounded-full size-2 bg-emerald-500" />
                  <span className="text-xs font-bold text-cyan-700">
                    Correct
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm">
                  <div className="bg-red-500 rounded-full size-2" />
                  <span className="text-xs font-bold text-cyan-700">
                    Incorrect
                  </span>
                </div>
              </div>
            </div>
            {answers.map((answer, index) => (
              <QuestionReviewCard
                key={answer.question_id}
                questionNumber={index + 1}
                question={answer.question}
                questionType={answer.type}
                options={answer.options}
                userAnswer={answer.user_answer}
                correctAnswer={answer.correct_answer}
                isCorrect={answer.is_correct}
                explanation={answer.explanation}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

interface QuestionReviewCardProps {
  questionNumber: number;
  question: string;
  questionType?: "multiple_choice" | "true_false";
  options: string[];
  userAnswer?: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

function QuestionReviewCard({
  questionNumber,
  question,
  questionType,
  options,
  userAnswer,
  correctAnswer,
  isCorrect,
  explanation,
}: Readonly<QuestionReviewCardProps>) {
  return (
    <Card className="overflow-hidden shadow-sm rounded-3xl border-border">
      <div className="flex flex-col gap-6 p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <h3 className="text-xl font-bold text-slate-900">
                {questionNumber}. {question}
              </h3>
              {questionType && (
                <Badge variant="outline" className="text-xs">
                  {questionType === "multiple_choice"
                    ? "Pilihan Ganda"
                    : "Benar/Salah"}
                </Badge>
              )}
            </div>
          </div>
          <div
            className={cn(
              "rounded-full border px-3 py-1",
              isCorrect
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-200 bg-red-50",
            )}
          >
            <span
              className={cn(
                "text-xs font-bold",
                isCorrect ? "text-emerald-600" : "text-red-500",
              )}
            >
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          </div>
        </div>
        {isCorrect ? (
          <div className="p-5 border rounded-2xl border-border bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full shadow-sm size-8 bg-emerald-500">
                <Check className="text-white size-5" strokeWidth={3} />
              </div>
              <span className="font-semibold text-slate-900">
                {options[correctAnswer]}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="relative flex-1 p-5 overflow-hidden border border-red-200 rounded-2xl bg-red-50/50">
              <div className="absolute rounded-bl-full -right-4 -top-4 size-16 bg-red-50/50" />
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-wide text-red-500 uppercase">
                  Your Answer
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-red-500 rounded-full shadow-sm size-8">
                    <X className="text-white size-5" strokeWidth={3} />
                  </div>
                  <span className="font-semibold text-slate-900">
                    {userAnswer === undefined
                      ? "No answer"
                      : options[userAnswer]}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex-1 p-5 overflow-hidden border rounded-2xl border-emerald-200 bg-emerald-50/50">
              <div className="absolute rounded-bl-full -right-4 -top-4 size-16 bg-emerald-50/50" />
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-wide uppercase text-emerald-600">
                  Correct Answer
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-full shadow-sm size-8 bg-emerald-500">
                    <Check className="text-white size-5" strokeWidth={3} />
                  </div>
                  <span className="font-semibold text-slate-900">
                    {options[correctAnswer]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {explanation && (
          <div className="p-5 border rounded-2xl border-border bg-slate-50">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold tracking-wide uppercase text-cyan-700">
                Explanation
              </span>
              <p className="text-sm text-slate-700">{explanation}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function QuizResultSkeleton() {
  return (
    <div className="relative flex w-full min-h-screen bg-background">
      <main className="flex-1 p-5">
        <div className="mx-auto flex max-w-287.5 flex-col gap-8">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-64 h-4" />
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-5 w-80" />
            </div>
            <Skeleton className="w-32 h-11" />
          </div>
          <div className="flex gap-25">
            <Skeleton className="flex-1 h-123 rounded-3xl" />
            <div className="flex flex-col gap-5">
              <Skeleton className="h-59 w-70.5 rounded-3xl" />
              <Skeleton className="h-59 w-70.5 rounded-3xl" />
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-8">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-48 rounded-3xl" />
            <Skeleton className="w-full h-48 rounded-3xl" />
            <Skeleton className="w-full h-48 rounded-3xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
