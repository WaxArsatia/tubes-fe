import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  FileQuestion,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGenerateQuiz,
  useQuiz,
  useStartQuiz,
  useSubmitQuiz,
} from "@/data/quiz";
import { requireAuth } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";

type QuizSearchParams = {
  mode?: "generate";
};

export const Route = createFileRoute("/quiz/$id")({
  validateSearch: (search: Record<string, unknown>): QuizSearchParams => {
    return {
      mode: search.mode === "generate" ? "generate" : undefined,
    };
  },
  beforeLoad: async ({ context }) => {
    await requireAuth(context.queryClient);
  },
  component: QuizPage,
});

function QuizPage() {
  const { id } = Route.useParams();
  const { mode } = Route.useSearch();
  const navigate = useNavigate();

  // Check if this is generation mode (document ID) or quiz mode (quiz ID)
  const isGenerationMode = mode === "generate";
  const documentId = isGenerationMode ? Number.parseInt(id, 10) : null;
  const quizId = isGenerationMode ? null : Number.parseInt(id, 10);

  // Show generation form when accessing with mode=generate
  const showGenerationForm = isGenerationMode;
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [questionType, setQuestionType] = useState<
    "multiple_choice" | "true_false" | "mixed"
  >("multiple_choice");

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [attemptId, setAttemptId] = useState<number | null>(null);

  const generateQuiz = useGenerateQuiz();
  const { data: quizData, isLoading } = useQuiz(quizId || 0);
  const submitQuiz = useSubmitQuiz(quizId || 0);
  const startQuiz = useStartQuiz();

  const quiz = quizData?.data.quiz;

  // Start quiz attempt when quiz loads
  useEffect(() => {
    if (quizId && !attemptId && !startQuiz.isPending) {
      startQuiz.mutate(quizId, {
        onSuccess: (response) => {
          setAttemptId(response.data.attempt_id);
        },
        onError: (error) => {
          toast.error("Gagal memulai kuis", {
            description: (error as { message?: string }).message,
          });
        },
      });
    }
  }, [quizId, attemptId, startQuiz]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleGenerateQuiz = async () => {
    if (!documentId) return;

    try {
      const result = await generateQuiz.mutateAsync({
        document_id: documentId,
        question_count: questionCount,
        difficulty,
        question_type: questionType,
      });

      toast.success("Kuis berhasil dibuat", {
        description: `${result.data.quiz.question_count} pertanyaan ${difficulty}`,
      });

      // Navigate to the generated quiz
      navigate({
        to: "/quiz/$id",
        params: { id: result.data.quiz.id.toString() },
      });
    } catch (error) {
      toast.error("Gagal membuat kuis", {
        description: (error as { message?: string }).message,
      });
    }
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (!quiz) return;
    const questionId = quiz.questions[currentQuestionIndex].id;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (!quiz || currentQuestionIndex >= quiz.questions.length - 1) return;
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex <= 0) return;
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!quiz || !quizId) return;

    if (!attemptId) {
      toast.error("Gagal mengirim kuis", {
        description: "Attempt ID tidak ditemukan. Silakan muat ulang halaman.",
      });
      return;
    }

    const answers = quiz.questions.map((q) => ({
      question_id: q.id,
      answer_index: selectedAnswers[q.id] ?? -1,
    }));

    const unanswered = answers.filter((a) => a.answer_index === -1).length;
    if (unanswered > 0) {
      if (!confirm(`${unanswered} pertanyaan belum dijawab. Kirim tetap?`)) {
        return;
      }
    }

    try {
      const result = await submitQuiz.mutateAsync({
        attempt_id: attemptId,
        answers,
        time_spent_seconds: timeSpent,
      });

      toast.success("Kuis berhasil dikirim");
      navigate({
        to: "/quiz/$id/result",
        params: { id: quizId.toString() },
        search: { attemptId: result.data.quiz_attempt.id },
      });
    } catch (error) {
      toast.error("Gagal mengirim kuis", {
        description: (error as { message?: string }).message,
      });
    }
  };

  if (showGenerationForm && documentId) {
    return (
      <main className="flex-1 lg:ml-72">
        <div className="max-w-2xl p-6 mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/dashboard" })}
            className="mb-6"
          >
            <ArrowLeft className="size-4" />
            Kembali
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="size-5" />
                Buat Kuis Baru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="count">Jumlah Pertanyaan</Label>
                <Select
                  value={questionCount.toString()}
                  onValueChange={(v) =>
                    setQuestionCount(Number.parseInt(v || "10", 10))
                  }
                >
                  <SelectTrigger id="count">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Pertanyaan</SelectItem>
                    <SelectItem value="10">10 Pertanyaan</SelectItem>
                    <SelectItem value="15">15 Pertanyaan</SelectItem>
                    <SelectItem value="20">20 Pertanyaan</SelectItem>
                    <SelectItem value="30">30 Pertanyaan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                <Select
                  value={difficulty}
                  onValueChange={(v) => setDifficulty(v as typeof difficulty)}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Mudah</SelectItem>
                    <SelectItem value="medium">Sedang</SelectItem>
                    <SelectItem value="hard">Sulit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Jenis Pertanyaan</Label>
                <Select
                  value={questionType}
                  onValueChange={(v) =>
                    setQuestionType(v as typeof questionType)
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple_choice">
                      Pilihan Ganda
                    </SelectItem>
                    <SelectItem value="true_false">Benar/Salah</SelectItem>
                    <SelectItem value="mixed">Campuran</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateQuiz}
                disabled={generateQuiz.isPending}
                className="w-full"
              >
                {generateQuiz.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Membuat Kuis...
                  </>
                ) : (
                  <>
                    <FileQuestion className="size-4" />
                    Buat Kuis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex-1 lg:ml-72">
        <div className="p-8">
          <Skeleton className="w-64 h-8 mb-4" />
          <Skeleton className="w-full h-96" />
        </div>
      </main>
    );
  }

  if (!quiz) {
    return (
      <main className="flex-1 lg:ml-72">
        <div className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Kuis tidak ditemukan</h2>
          <Button onClick={() => navigate({ to: "/dashboard" })}>
            Kembali ke Dashboard
          </Button>
        </div>
      </main>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / quiz.question_count) * 100;

  return (
    <main className="flex-1 lg:ml-72">
      <div className="max-w-4xl p-6 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Kuis</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge>{quiz.difficulty}</Badge>
                <span>•</span>
                <span>{quiz.question_count} pertanyaan</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4" />
            <span>
              {Math.floor(timeSpent / 60)}:
              {(timeSpent % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {answeredCount}/{quiz.question_count} dijawab
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted">
            <div
              className="h-2 transition-all rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">
                  Pertanyaan {currentQuestionIndex + 1} dari{" "}
                  {quiz.question_count}
                </CardTitle>
                {currentQuestion.type && (
                  <Badge variant="secondary" className="text-xs">
                    {currentQuestion.type === "multiple_choice"
                      ? "Pilihan Ganda"
                      : "Benar/Salah"}
                  </Badge>
                )}
              </div>
              {selectedAnswers[currentQuestion.id] !== undefined && (
                <Badge variant="outline">Dijawab</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">{currentQuestion.question}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={`option-${currentQuestion.id}-${index}`}
                  type="button"
                  onClick={() => handleSelectAnswer(index)}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-all",
                    selectedAnswers[currentQuestion.id] === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex items-center justify-center size-6 rounded-full border-2",
                        selectedAnswers[currentQuestion.id] === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border",
                      )}
                    >
                      {selectedAnswers[currentQuestion.id] === index && (
                        <span className="text-sm">✓</span>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="size-4" />
                Sebelumnya
              </Button>

              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={submitQuiz.isPending}>
                  {submitQuiz.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Kirim Jawaban"
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Selanjutnya
                  <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
