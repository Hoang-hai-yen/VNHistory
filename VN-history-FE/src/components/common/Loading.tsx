import type { ReactNode } from "react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  children?: ReactNode;
}

export default function Loading({
  message = "Đang tải dữ liệu...",
  fullScreen = true,
  children,
}: LoadingProps) {
  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[#0f0a04]/70 backdrop-blur-sm"
    : "flex items-center justify-center py-10";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-[#8B1A1A]/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-[#8B1A1A] animate-spin" />
        </div>
        <p className="text-sm text-[#f5efe4] font-medium tracking-wide">
          {message}
        </p>
        {children ? (
          <div className="mt-2 text-xs text-[#e0dbd0]/70 max-w-sm">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
