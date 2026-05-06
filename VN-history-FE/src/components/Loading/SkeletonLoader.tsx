interface SkeletonLoaderProps {
  count?: number;
  variant?: "card" | "list" | "article";
}

export default function SkeletonLoader({
  count = 3,
  variant = "card",
}: SkeletonLoaderProps) {
  const getSkeletonClass = () => {
    switch (variant) {
      case "card":
        return "h-64 rounded-lg";
      case "list":
        return "h-20 rounded-md";
      case "article":
        return "h-96 rounded-lg";
      default:
        return "h-64 rounded-lg";
    }
  };

  return (
    <div
      className={
        variant === "list"
          ? "space-y-3"
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${getSkeletonClass()} bg-linear-to-r from-gray-200 to-gray-100 animate-pulse`}
        />
      ))}
    </div>
  );
}
