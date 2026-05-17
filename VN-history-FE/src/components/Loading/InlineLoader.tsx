interface InlineLoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function InlineLoader({
  size = "md",
  message,
}: InlineLoaderProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4 border-2";
      case "lg":
        return "w-8 h-8 border-2";
      default:
        return "w-6 h-6 border-2";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${getSizeClass()} border-[#8B1A1A]/20 border-t-[#8B1A1A] rounded-full animate-spin`}
      />
      {message && <span className="text-sm text-[#6b6b6b]">{message}</span>}
    </div>
  );
}
