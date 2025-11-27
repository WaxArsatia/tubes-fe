import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quiz")({
	component: Quiz,
});

type QuizOption = {
	id: string;
	label: string;
};

type QuizQuestion = {
	id: number;
	question: string;
	options: QuizOption[];
	correctAnswer?: string;
};

const QUIZ_DATA: QuizQuestion[] = [
	{
		id: 1,
		question: "Siapa Mulyono",
		options: [
			{ id: "jokowi", label: "Jokowi" },
			{ id: "habibie", label: "Habibie" },
			{ id: "raka", label: "Raka" },
			{ id: "gibran", label: "Gibran" },
		],
		correctAnswer: "jokowi",
	},
	{
		id: 2,
		question: "Siapa presiden Indonesia saat ini?",
		options: [
			{ id: "jokowi", label: "Jokowi" },
			{ id: "prabowo", label: "Prabowo" },
			{ id: "sby", label: "Susilo Bambang Yudhoyono" },
			{ id: "megawati", label: "Megawati Soekarnoputri" },
		],
		correctAnswer: "prabowo",
	},
	{
		id: 3,
		question: "Apa ibu kota Indonesia?",
		options: [
			{ id: "jakarta", label: "Jakarta" },
			{ id: "bandung", label: "Bandung" },
			{ id: "surabaya", label: "Surabaya" },
			{ id: "medan", label: "Medan" },
		],
		correctAnswer: "jakarta",
	},
];

const DIFFICULTY = "Sulit";
const QUIZ_TYPE = "Pilihan ganda";

function Quiz() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [isViewingAnswers, setIsViewingAnswers] = useState(false);

	const totalQuestions = QUIZ_DATA.length;
	const currentQuestion = QUIZ_DATA[currentQuestionIndex];

	const handleAnswerChange = (questionId: number, answerId: string) => {
		if (isViewingAnswers) return;
		setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		}
	};

	const handleNext = () => {
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handleViewAnswers = () => {
		setIsViewingAnswers(true);
	};

	const handleQuestionNumberClick = (index: number) => {
		setCurrentQuestionIndex(index);
	};

	return (
		<div className="bg-[#F5F5F5] w-dvw h-dvh">
			<div className="flex items-start max-w-[1300px] w-full mx-auto justify-between gap-[5%] lg:flex-row flex-col pt-20">
				{/* Left Section */}
				<div className="flex items-start lg:w-[781px] w-full h-full flex-col gap-[21px]">
					{/* Quiz Info */}
					<div className="flex py-[30px] px-5 items-center gap-5 self-stretch bg-white rounded-2xl shadow-md flex-wrap">
						<p>
							Tingkat Kesulitan:{" "}
							<span className="text-[#EB7348] font-semibold">{DIFFICULTY}</span>
						</p>
						<p>
							Tipe soal:{" "}
							<span className="text-[#0E7490] font-semibold">{QUIZ_TYPE}</span>
						</p>
					</div>

					{/* Question Card */}
					<div className="flex min-h-[330px] py-[30px] px-6 flex-col justify-between items-start self-stretch rounded-xl bg-white shadow-md mb-4 lg:mb-0">
						<div className="w-full">
							<p className="mb-4 font-bold">
								{currentQuestion.id}. {currentQuestion.question}
							</p>
							<div className="ml-4 space-y-4">
								{currentQuestion.options.map((option) => {
									const isSelected = answers[currentQuestion.id] === option.id;
									const isCorrect = currentQuestion.correctAnswer === option.id;
									const showCorrect = isViewingAnswers && isCorrect;
									const showIncorrect =
										isViewingAnswers && isSelected && !isCorrect;

									let highlightClass = "";
									if (showCorrect) {
										highlightClass = "bg-green-100 border border-green-500";
									} else if (showIncorrect) {
										highlightClass = "bg-red-100 border border-red-500";
									}

									return (
										<div
											key={option.id}
											className={`p-2 rounded ${highlightClass}`}
										>
											<input
												type="radio"
												name={`question_${currentQuestion.id}`}
												id={`${currentQuestion.id}_${option.id}`}
												value={option.id}
												checked={isSelected}
												onChange={() =>
													handleAnswerChange(currentQuestion.id, option.id)
												}
												disabled={isViewingAnswers}
												className="mr-2 cursor-pointer disabled:cursor-not-allowed"
											/>
											<label
												htmlFor={`${currentQuestion.id}_${option.id}`}
												className={`cursor-pointer ${
													isViewingAnswers ? "cursor-not-allowed" : ""
												}`}
											>
												{option.label}
												{showCorrect && (
													<span className="ml-2 font-semibold text-green-700">
														Jawaban Benar
													</span>
												)}
												{showIncorrect && (
													<span className="ml-2 font-semibold text-red-700">
														Jawaban Salah
													</span>
												)}
											</label>
										</div>
									);
								})}
							</div>
						</div>

						{/* Navigation */}
						<div className="flex items-center self-stretch justify-between mt-14">
							<button
								type="button"
								onClick={handlePrevious}
								disabled={currentQuestionIndex === 0}
								className="h-10 p-2.5 w-full max-w-[150px] min-w-[130px] bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Sebelumnya
							</button>
							<p className="hidden md:block">
								Soal {currentQuestionIndex + 1} dari {totalQuestions}
							</p>
							<button
								type="button"
								onClick={handleNext}
								disabled={currentQuestionIndex === totalQuestions - 1}
								className="h-10 p-2.5 w-full max-w-[150px] min-w-[130px] bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-lg text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Selanjutnya
							</button>
						</div>
					</div>
				</div>

				{/* Right Section */}
				<div className="flex lg:w-[630px] w-full flex-col items-center gap-[30px] self-stretch justify-between">
					{/* Question Numbers */}
					<div className="flex px-[30px] py-5 flex-col items-start gap-[26px] self-stretch rounded-2xl bg-white shadow-md grow">
						<p className="font-semibold">Soal</p>
						<div className="grid justify-between w-full h-full grid-cols-5 gap-2">
							{QUIZ_DATA.map((question) => {
								const isAnswered = answers[question.id] !== undefined;
								const isCurrentQuestion =
									currentQuestionIndex === question.id - 1;
								const isCorrectAnswer =
									isViewingAnswers &&
									isAnswered &&
									answers[question.id] === question.correctAnswer;
								const isWrongAnswer =
									isViewingAnswers &&
									isAnswered &&
									answers[question.id] !== question.correctAnswer;

								let buttonClass =
									"w-12 h-12 pt-3 mx-auto mb-3 text-center rounded-md cursor-pointer lg:pt-5 lg:w-16 lg:h-16 transition-colors";
								let tooltipText = "";

								if (isViewingAnswers) {
									if (isCorrectAnswer) {
										buttonClass +=
											" bg-green-500 text-white hover:bg-green-600";
										tooltipText = "Jawaban Benar";
									} else if (isWrongAnswer) {
										buttonClass += " bg-red-500 text-white hover:bg-red-600";
										tooltipText = "Jawaban Salah";
									} else {
										buttonClass +=
											" bg-neutral-200 text-neutral-400 hover:bg-neutral-300";
										tooltipText = "Tidak Dijawab";
									}
								} else if (isCurrentQuestion) {
									buttonClass += " bg-cyan-500 text-white hover:bg-cyan-600";
									tooltipText = "Soal Saat Ini";
								} else if (isAnswered) {
									buttonClass += " bg-cyan-200 text-cyan-900 hover:bg-cyan-300";
									tooltipText = "Sudah Dijawab";
								} else {
									buttonClass += " bg-neutral-300 hover:bg-neutral-400";
									tooltipText = "Belum Dijawab";
								}

								return (
									<button
										type="button"
										key={question.id}
										onClick={() => handleQuestionNumberClick(question.id - 1)}
										className={buttonClass}
										title={tooltipText}
									>
										{question.id}
									</button>
								);
							})}
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-wrap items-center self-stretch gap-x-[7%] gap-y-5">
						<button
							type="button"
							className="rounded-[10px] shadow-2xl bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 h-10 grow text-white cursor-pointer"
						>
							Ubah Quiz
						</button>
						<button
							type="button"
							className="rounded-[10px] shadow-2xl bg-white hover:bg-slate-50 active:bg-slate-100 h-10 grow cursor-pointer"
						>
							Unduh PDF
						</button>
						<button
							type="button"
							onClick={handleViewAnswers}
							disabled={isViewingAnswers}
							className="rounded-[10px] shadow-2xl bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 h-10 w-full text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isViewingAnswers ? "Sedang Melihat Jawaban" : "Lihat Jawaban"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
