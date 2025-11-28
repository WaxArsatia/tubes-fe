import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/historyBawah")({
	component: HistoryBawah,
});

function HistoryBawah() {
	return (
		<div className="min-h-screen w-full bg-neutral-100">
			{/* Header */}
			<div className="w-full h-20 bg-neutral-50 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] flex items-center px-16 justify-between">
				<div className="flex items-center gap-6">
					<div data-svg-wrapper>
						<svg
							width="64"
							height="64"
							viewBox="0 0 64 64"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="32" cy="32" r="32" fill="#0E7490" />
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="34"
							height="39"
							viewBox="0 0 34 39"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M27.0336 0H6.7584C3.02584 0 0 2.86538 0 6.4V32C0 35.5346 3.02584 38.4 6.7584 38.4H27.0336C30.7662 38.4 33.792 35.5346 33.792 32V6.4C33.792 2.86538 30.7662 0 27.0336 0Z"
								fill="white"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="23"
							height="2"
							viewBox="0 0 23 2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1H21.2752"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="23"
							height="2"
							viewBox="0 0 23 2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1H21.2752"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="23"
							height="2"
							viewBox="0 0 23 2"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1H21.2752"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="20"
							height="3"
							viewBox="0 0 20 3"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 1.25024L18.0239 1"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>
					<div className="w-4 h-4" />
					<div data-svg-wrapper>
						<svg
							width="14"
							height="21"
							viewBox="0 0 14 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.1081 2.33654L6.68848 0L0.000472619 18.3751L6.42005 20.7117L13.1081 2.33654Z"
								fill="#F4C430"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="8"
							height="6"
							viewBox="0 0 8 6"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.42251 2.33654L1.00293 0L-0.000270904 2.75627L6.41931 5.09281L7.42251 2.33654Z"
								fill="#C0C0C0"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="8"
							height="6"
							viewBox="0 0 8 6"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.42251 2.33654L1.00293 0L-0.000270991 2.75627L6.41931 5.09281L7.42251 2.33654Z"
								fill="#FF6F7D"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="7"
							height="7"
							viewBox="0 0 7 7"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 0L6.41958 2.33654L1.31336 6.37867L0 0Z"
								fill="#E6C29F"
							/>
						</svg>
					</div>
					<div data-svg-wrapper>
						<svg
							width="3"
							height="5"
							viewBox="0 0 3 5"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0.220703 0L2.78854 0.934615L-0.000181363 4.60171L0.220703 0Z"
								fill="#333333"
							/>
						</svg>
					</div>
					<div className="p-2.5 flex items-center">
						<div className="text-cyan-700 text-xl font-semibold font-['Inter'] leading-8">
							Rangkuman
						</div>
					</div>
					<div className="p-2.5 flex items-center">
						<div className="text-black text-xl font-semibold font-['Inter'] leading-8">
							History
						</div>
					</div>
				</div>
				<div className="h-14 flex items-center gap-3.5">
					<div className="text-black text-base font-normal font-['Inter'] leading-7">
						Riki
					</div>
				</div>
			</div>

			{/* PDF Upload Section */}
			<div className="max-w-[1312px] mx-auto mt-6 px-4">
				<div className="bg-neutral-50 rounded-[30px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] p-7">
					<div className="bg-gray-100 rounded-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] border border-orange-400 py-12 px-7 flex flex-col items-center gap-3.5">
						<svg
							className="w-16 h-20"
							viewBox="0 0 64 79"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="64" height="79" rx="4" fill="#FF6B6B" />
							<text
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
								fill="white"
								fontSize="24"
								fontWeight="bold"
							>
								PDF
							</text>
						</svg>
						<div className="text-center text-black text-sm font-normal font-['Inter'] leading-5">
							WebPro.pdf
						</div>
					</div>
				</div>
			</div>

			{/* Three Cards Section */}
			<div className="max-w-[1312px] mx-auto mt-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Summarize Card */}
					<div className="bg-neutral-50 rounded-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] p-5 flex flex-col">
						<div className="flex flex-col gap-3.5 flex-1">
							<div className="flex flex-col gap-10">
								<div className="flex flex-col items-center">
									<div className="text-center text-black text-base font-bold font-['Inter'] leading-6">
										Summarize
									</div>
									<div className="text-black text-sm font-normal font-['Inter'] leading-7">
										Silahkan Download atau Copy untuk melihat hasil summarize
									</div>
								</div>
								<div className="text-black text-base font-normal font-['Inter'] leading-7">
									Preview Summary
								</div>
							</div>
							<div className="text-black text-base font-normal font-['Inter'] leading-7">
								Text paragraf
							</div>
						</div>
						<div className="flex gap-2.5 mt-auto pt-5">
							<button
								type="button"
								className="flex-1 h-10 px-2.5 py-2.5 bg-white rounded-lg border border-cyan-700 text-black text-sm font-medium font-['Inter'] leading-5"
							>
								Copy Summarize
							</button>
							<button
								type="button"
								className="flex-1 h-10 px-2.5 py-2.5 bg-cyan-600 rounded-lg text-white text-sm font-medium font-['Inter'] leading-5"
							>
								Download
							</button>
						</div>
					</div>

					{/* Tanya AI Card */}
					<div className="bg-neutral-50 rounded-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] p-5 flex flex-col">
						<div className="flex flex-col gap-3.5 flex-1">
							<div className="flex flex-col gap-10">
								<div className="flex flex-col items-center">
									<div className="text-center text-black text-base font-bold font-['Inter'] leading-6">
										Tanya AI
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-6 mt-auto pt-5">
							<input
								type="text"
								placeholder="Tanyakan pertanyaanmu..."
								className="flex-1 h-10 px-5 py-2.5 bg-white rounded-lg border border-cyan-700 text-black/50 text-xs font-semibold font-['Inter'] leading-4 outline-none focus:ring-2 focus:ring-cyan-600"
							/>
							<button
								type="button"
								className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center"
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Generate Quiz Card */}
					<div className="bg-neutral-50 rounded-[20px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] p-5 flex flex-col">
						<div className="flex flex-col gap-3.5 flex-1">
							<div className="flex flex-col items-center">
								<div className="text-center text-black text-base font-bold font-['Inter'] leading-6">
									Generate Quiz
								</div>
							</div>
							<div className="flex flex-col gap-3.5">
								<div className="flex flex-col gap-2.5">
									<div className="text-black/50 text-base font-normal font-['Inter'] leading-6">
										Jumlah Soal
									</div>
									<div className="px-5 py-2.5 bg-white rounded-[30px] border border-cyan-600 flex justify-between items-center">
										<div className="text-black/50 text-sm font-normal font-['Inter'] leading-5">
											Jumlah Soal hingga 15
										</div>
										<svg
											width="14"
											height="8"
											viewBox="0 0 14 8"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="rotate-180"
										>
											<path
												d="M13.9616 0.797508L6.98081 7.77832L0 0.797508L0.797625 -0.000117779L6.98081 6.18307L13.164 -0.000117779L13.9616 0.797508Z"
												fill="black"
												fillOpacity="0.5"
											/>
										</svg>
									</div>
								</div>
								<div className="flex flex-col gap-2.5">
									<div className="text-black/50 text-base font-normal font-['Inter'] leading-6">
										Tingkat Kesulitan
									</div>
									<div className="px-5 py-2.5 bg-white rounded-[30px] border border-cyan-600 flex justify-between items-center">
										<div className="text-black/50 text-sm font-normal font-['Inter'] leading-5">
											Tingkat kesulitan soal
										</div>
										<svg
											width="14"
											height="8"
											viewBox="0 0 14 8"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="rotate-180"
										>
											<path
												d="M13.9616 0.797508L6.98081 7.77832L0 0.797508L0.797625 -0.000117779L6.98081 6.18307L13.164 -0.000117779L13.9616 0.797508Z"
												fill="black"
												fillOpacity="0.5"
											/>
										</svg>
									</div>
								</div>
								<div className="flex flex-col gap-2.5">
									<div className="text-black/50 text-base font-normal font-['Inter'] leading-6">
										Tipe Soal
									</div>
									<div className="px-5 py-2.5 bg-white rounded-[30px] border border-cyan-600 flex justify-between items-center">
										<div className="text-black/50 text-sm font-normal font-['Inter'] leading-5">
											Tipe soal kamu
										</div>
										<svg
											width="14"
											height="8"
											viewBox="0 0 14 8"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="rotate-180"
										>
											<path
												d="M13.9616 0.797508L6.98081 7.77832L0 0.797508L0.797625 -0.000117779L6.98081 6.18307L13.164 -0.000117779L13.9616 0.797508Z"
												fill="black"
												fillOpacity="0.5"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
						<button
							type="button"
							className="w-full h-10 px-2.5 py-2.5 bg-cyan-600 rounded-lg text-white text-base font-semibold font-['Inter'] leading-6 mt-5"
						>
							Generate
						</button>
					</div>
				</div>
			</div>

			{/* Riwayat Quiz Section */}
			<div className="max-w-[1312px] mx-auto mt-14 px-4">
				<div className="w-56 px-2.5 py-5 bg-cyan-600 rounded-[10px] flex justify-center items-center mb-6">
					<div className="text-white text-base font-bold font-['Inter'] leading-6">
						Riwayat Quiz
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Quiz Card 1 - Belum Selesai */}
					<div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
						<div className="flex justify-between items-center">
							<div className="flex justify-between items-center flex-1">
								<div className="flex flex-col items-center gap-12">
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-black text-base font-normal font-['Inter'] leading-6">
											Total soal Quiz:
										</div>
										<div className="text-center text-cyan-700 text-xl font-bold font-['Inter'] leading-8">
											15
										</div>
									</div>
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-center text-black text-base font-normal font-['Inter'] leading-6">
											Tanggal:
										</div>
										<div className="text-black text-sm font-normal font-['Inter'] leading-5">
											29/09/2025
										</div>
									</div>
								</div>
								<div className="flex flex-col items-center gap-20">
									<div className="text-center text-red-500 text-base font-semibold font-['Inter'] leading-6">
										Belum selesai
									</div>
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-black text-base font-normal font-['Inter'] leading-6">
											Tingkat Kesulitan:
										</div>
										<div className="text-center text-red-500 text-base font-semibold font-['Inter'] leading-6">
											Susah
										</div>
									</div>
								</div>
							</div>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.39635 2.69187L17.7041 11.9996L8.39635 21.3074L7.33285 20.2439L15.5771 11.9996L7.33285 3.75537L8.39635 2.69187Z"
									fill="black"
									fillOpacity="0.5"
								/>
							</svg>
						</div>
					</div>

					{/* Quiz Card 2 - Selesai */}
					<div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
						<div className="flex justify-between items-center">
							<div className="flex justify-between items-center flex-1">
								<div className="flex flex-col items-center gap-12">
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-black text-base font-normal font-['Inter'] leading-6">
											Total soal Quiz:
										</div>
										<div className="text-center text-cyan-700 text-xl font-bold font-['Inter'] leading-8">
											15
										</div>
									</div>
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-center text-black text-base font-normal font-['Inter'] leading-6">
											Tanggal:
										</div>
										<div className="text-black text-sm font-normal font-['Inter'] leading-5">
											29/09/2025
										</div>
									</div>
								</div>
								<div className="flex flex-col justify-between items-center h-40">
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-center text-green-600 text-base font-normal font-['Inter'] leading-6">
											Selesai
										</div>
										<div className="text-center text-green-600 text-xl font-bold font-['Inter'] leading-8">
											100
										</div>
									</div>
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-black text-base font-normal font-['Inter'] leading-6">
											Tingkat Kesulitan:
										</div>
										<div className="text-center text-red-500 text-base font-semibold font-['Inter'] leading-6">
											Susah
										</div>
									</div>
								</div>
							</div>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.39733 2.69187L17.7051 11.9996L8.39733 21.3074L7.33383 20.2439L15.5781 11.9996L7.33383 3.75537L8.39733 2.69187Z"
									fill="black"
									fillOpacity="0.5"
								/>
							</svg>
						</div>
					</div>

					{/* Quiz Card 3 - Selesai */}
					<div className="bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-5">
						<div className="flex justify-between items-center">
							<div className="flex justify-between items-center flex-1">
								<div className="flex flex-col items-center gap-12">
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-black text-base font-normal font-['Inter'] leading-6">
											Total soal Quiz:
										</div>
										<div className="text-center text-cyan-700 text-xl font-bold font-['Inter'] leading-8">
											15
										</div>
									</div>
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-center text-black text-base font-normal font-['Inter'] leading-6">
											Tanggal:
										</div>
										<div className="text-black text-sm font-normal font-['Inter'] leading-5">
											29/09/2025
										</div>
									</div>
								</div>
								<div className="flex flex-col justify-between items-center h-40">
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-center text-green-600 text-base font-normal font-['Inter'] leading-6">
											Selesai
										</div>
										<div className="text-center text-green-600 text-xl font-bold font-['Inter'] leading-8">
											100
										</div>
									</div>
									<div className="flex flex-col items-center gap-2.5">
										<div className="text-black text-base font-normal font-['Inter'] leading-6">
											Tingkat Kesulitan:
										</div>
										<div className="text-center text-red-500 text-base font-semibold font-['Inter'] leading-6">
											Susah
										</div>
									</div>
								</div>
							</div>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.39733 2.69187L17.7051 11.9996L8.39733 21.3074L7.33383 20.2439L15.5781 11.9996L7.33383 3.75537L8.39733 2.69187Z"
									fill="black"
									fillOpacity="0.5"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
