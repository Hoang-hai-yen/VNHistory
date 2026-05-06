import { Package } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
}: EmptyStateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {icon || <Package className="h-12 w-12 text-gray-400" />}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
}
