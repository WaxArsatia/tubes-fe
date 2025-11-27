import { createFileRoute } from "@tanstack/react-router";
import pdfIcon from "../images/pdficon.png";

export const Route = createFileRoute("/historyAtas")({
  component: HistoryAtas,
});

function HistoryAtas() {
    const files = Array(10).fill({
        name: "Pepeng.pdf",
        date: "15 Oktober 2025",
    });


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-1">Riwayat Rangkuman</h1>
            <p className="text-gray-600 mb-6">Lihat semua rangkuman yang sudah kamu buat sebelumnya</p>


            <h2 className="text-lg font-semibold mb-3">Total riwayat file:</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-11">
                {files.map((file, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-40">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={pdfIcon} alt="PDF Icon" className="w-8" />
                            <div>
                                <p className="font-bold text-sm">{file.name}</p>
                                <p className="text-gray-500 text-xs">{file.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-1/2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">Preview</button>
                            <button className="w-1/2 py-1 bg-cyan-700 text-white rounded-md text-sm hover:bg-cyan-800">Download</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}