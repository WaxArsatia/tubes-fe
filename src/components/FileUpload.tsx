import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface FileUploadProps {
  readonly onFileSelect?: (file: File) => void;
}

function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const pdfFile = files.find((file) => file.type === "application/pdf");

      if (pdfFile && onFileSelect) {
        onFileSelect(pdfFile);
      }
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDragging(true);
    },
    [],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file?.type === "application/pdf") {
        onFileSelect?.(file);
      }
    },
    [onFileSelect],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <button
      type="button"
      className={`flex w-full max-w-4xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 sm:px-8 py-12 sm:py-16 transition-all duration-200 ${
        isDragging
          ? "border-cyan-600 bg-cyan-50 shadow-xl scale-105"
          : "border-gray-300 bg-gray-50 hover:border-cyan-500 hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      aria-label="Upload PDF file by clicking or dragging and dropping"
    >
      <div className="flex max-w-lg flex-col items-center gap-6 sm:gap-8">
        {/* PDF Icon */}
        <svg
          className="h-12 sm:h-16 w-10 sm:w-12"
          viewBox="0 0 49 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M30.625 0H6.125C2.74375 0 0 2.7 0 6.03V53.97C0 57.3 2.74375 60 6.125 60H42.875C46.2562 60 49 57.3 49 53.97V18.09L30.625 0Z"
            fill="#E74C3C"
          />
          <path d="M30.625 0V18.09H49L30.625 0Z" fill="#C0392B" />
        </svg>

        {/* Text */}
        <div className="space-y-2 text-center">
          <p className="text-lg sm:text-xl font-bold text-gray-900 px-4">
            Seret & Lepaskan File Anda atau klik untuk mengunggah
          </p>
          <p className="text-sm sm:text-base text-gray-600">Format: PDF</p>
        </div>

        {/* Upload Button Visual */}
        <div className="flex h-11 sm:h-12 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 sm:px-6 py-2.5 sm:py-3 shadow-sm hover:bg-cyan-700 transition-colors">
          <Upload className="size-4 sm:size-5 text-white" />
          <span className="text-sm sm:text-base font-semibold text-white">
            Unggah File
          </span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileInput}
          aria-label="Select PDF file"
        />
      </div>
    </button>
  );
}

export default FileUpload;
