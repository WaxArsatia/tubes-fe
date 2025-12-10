import { MoreVertical } from "lucide-react";

interface HistoryCardProps {
  readonly fileName: string;
  readonly date: string;
  readonly onPreview?: () => void;
  readonly onDownload?: () => void;
}

function HistoryCard({
  fileName,
  date,
  onPreview,
  onDownload,
}: HistoryCardProps) {
  return (
    <div className="flex w-full flex-col gap-5 sm:gap-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-lg hover:border-cyan-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PDF Icon */}
            <svg
              className="h-10 sm:h-12 w-8 sm:w-10 shrink-0"
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
            <p className="wrap-break-word text-sm sm:text-base font-bold text-gray-900 line-clamp-2">
              {fileName}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">{date}</p>
        </div>
        <button
          type="button"
          className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-1"
          aria-label="More options"
        >
          <MoreVertical className="size-4 sm:size-5 text-gray-600" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onPreview}
          className="flex h-10 sm:h-11 flex-1 items-center justify-center rounded-lg bg-gray-100 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
        >
          Preview
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="flex h-10 sm:h-11 flex-1 items-center justify-center rounded-lg bg-cyan-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-cyan-700 active:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-1 shadow-sm hover:shadow-md"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;
