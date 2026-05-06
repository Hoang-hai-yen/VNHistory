interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({
  message = "Đang tải dữ liệu...",
}: PageLoaderProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-[#8B1A1A]/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-[#8B1A1A] animate-spin" />
        </div>
        <p className="text-sm text-[#6b6b6b] font-medium tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );
}
