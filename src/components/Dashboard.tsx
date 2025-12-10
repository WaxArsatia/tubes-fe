import { History } from "lucide-react";
import { useState } from "react";
import { useCurrentUser } from "@/data/auth";
import FileUpload from "./FileUpload";
import HistoryCard from "./HistoryCard";

// Mock data - replace with actual API call
const mockHistory = [
  { id: 1, fileName: "Pepeng.pdf", date: "15 Oktober 2025" },
  { id: 2, fileName: "Pepeng.pdf", date: "15 Oktober 2025" },
  { id: 3, fileName: "Pepeng.pdf", date: "15 Oktober 2025" },
  { id: 4, fileName: "Pepeng.pdf", date: "15 Oktober 2025" },
];

function Dashboard() {
  const { data: user } = useCurrentUser();
  const [hasHistory] = useState(true); // Toggle this to test different states

  const handleFileSelect = (file: File) => {
    console.log("Selected file:", file.name);
    // Implement file upload logic here
  };

  return (
    <div className="min-h-screen pt-16 bg-linear-to-b from-gray-50 to-white">
      <div className="px-4 py-8 mx-auto sm:px-6 lg:px-8 sm:py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="flex flex-col items-center gap-4 pt-8 mb-12 text-center sm:gap-6 sm:pt-16 sm:mb-20">
          <h1 className="px-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Bantu Pahami Materi dengan Ringkasan Otomatis
          </h1>
          <p className="max-w-3xl px-4 text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
            Cukup unggah dokumen Anda. AI kami akan memberikan ringkasan yang
            akurat, cepat, dan mudah dibaca
          </p>
        </section>

        {/* File Upload Section */}
        <section className="flex justify-center mb-20">
          <FileUpload onFileSelect={handleFileSelect} />
        </section>

        {/* History Section */}
        {user && (
          <section className="mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-2 px-0 py-2 mb-6 sm:mb-8">
              <History className="text-cyan-600 size-5 sm:size-6" />
              <h2 className="text-lg font-bold text-center text-gray-900 sm:text-xl">
                History terkini
              </h2>
            </div>

            {hasHistory ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
                {mockHistory.map((item) => (
                  <HistoryCard
                    key={item.id}
                    fileName={item.fileName}
                    date={item.date}
                    onPreview={() => console.log("Preview", item.fileName)}
                    onDownload={() => console.log("Download", item.fileName)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <svg
                  className="size-24 sm:size-32"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="64" cy="64" r="48" fill="#E5E7EB" />
                  <path
                    d="M64 40V88M40 64H88"
                    stroke="#9CA3AF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="px-4 text-lg font-semibold text-center text-gray-600 sm:text-xl">
                  Belum ada file yang kamu rangkum
                </p>
              </div>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className="mb-16 space-y-16 sm:mb-20 sm:space-y-20">
          {/* Feature 1: From Pages to Points */}
          <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-6">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Dari Ratusan Halaman ke Poin-Poin Penting
            </h2>
            <p className="max-w-2xl text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
              Lupakan membaca dokumen panjang berjam-jam. AI kami mengekstrak
              informasi krusial dalam hitungan detik, menghemat waktu Anda
              hingga 80%.
            </p>
          </div>

          {/* Feature 2: AI Chat */}
          <div className="flex flex-col items-center justify-center gap-8 px-4 sm:gap-12 lg:flex-row lg:gap-16 xl:gap-24">
            <div className="max-w-xl space-y-3 text-center lg:max-w-2xl sm:space-y-4 lg:text-left">
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                Tanya Apa Saja, AI Siap Menjawab
              </h3>
              <p className="text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                Masih ada yang kurang jelas? Gunakan fitur chat untuk berdiskusi
                dengan AI. Dapatkan penjelasan mendalam, contoh, atau
                klarifikasi tentang isi dokumen Anda.
              </p>
            </div>
            <div className="rounded-full shadow-lg size-48 sm:size-56 md:size-64 shrink-0 bg-linear-to-br from-cyan-100 to-cyan-300 lg:size-72 xl:size-80" />
          </div>

          {/* Feature 3: Quiz Generator */}
          <div className="flex flex-col items-center justify-center gap-8 px-4 sm:gap-12 lg:flex-row-reverse lg:gap-16 xl:gap-24">
            <div className="max-w-xl space-y-3 text-center lg:max-w-2xl sm:space-y-4 lg:text-left">
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                Level Up Belajarmu dengan Generate Quiz!
              </h3>
              <p className="text-base font-medium leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                Bikin belajar makin seru dengan kuis otomatis yang diambil
                langsung dari materi. Pilih tingkat kesulitan easy, medium, atau
                hard dan buat hingga 15 pertanyaan yang siap tantang
                kemampuanmu. Cepat, relevan, dan bikin belajar jadi next level!
              </p>
            </div>
            <div className="rounded-full shadow-lg size-48 sm:size-56 md:size-64 shrink-0 bg-linear-to-br from-amber-100 to-amber-300 lg:size-72 xl:size-80" />
          </div>
        </section>

        {/* Features List */}
        <section className="px-4 mb-16 space-y-10 sm:mb-20 sm:space-y-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl lg:text-4xl">
            Fitur-fitur kami
          </h2>

          {/* Features Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            <div className="flex gap-4 p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center rounded-full size-12 shrink-0 bg-cyan-600">
                <svg
                  className="text-white size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Ringkasan Tanpa Ribet
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  Upload file Anda dan dapatkan ringkasan dalam hitungan detik
                  dengan format yang Anda inginkan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center rounded-full size-12 shrink-0 bg-cyan-600">
                <svg
                  className="text-white size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Antarmuka Intuitif
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  Desain kami yang intuitif memberikan ringkasan langsung tanpa
                  perlu belajar cara pakainya.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center rounded-full size-12 shrink-0 bg-cyan-600">
                <svg
                  className="text-white size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Insight menggunakan AI
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  AI kami siap membantu kamu memahami informasi dalam sekejap.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center rounded-full size-12 shrink-0 bg-cyan-600">
                <svg
                  className="text-white size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Akses di Semua Perangkat
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  Layanan dapat diakses dengan lancar di perangkat apa pun,
                  sehingga Anda bisa belajar kapan saja.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center rounded-full size-12 shrink-0 bg-cyan-600">
                <svg
                  className="text-white size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Kuis Otomatis
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  AI menghasilkan kuis hingga 15 soal dengan tingkat kesulitan
                  beragam, membantu Anda belajar lebih cepat dan menilai
                  pemahaman secara instan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center rounded-full size-12 shrink-0 bg-cyan-600">
                <svg
                  className="text-white size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Aman & Privat
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  Data Anda tetap terlindungi sepenuhnya berkat sistem keamanan
                  yang menjaga kerahasiaan dokumen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
