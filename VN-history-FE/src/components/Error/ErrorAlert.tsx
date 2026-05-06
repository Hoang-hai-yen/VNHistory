import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface ErrorAlertProps {
  title: string;
  message: string;
  onRetry?: () => void;
  dismissible?: boolean;
}

export default function ErrorAlert({
  title,
  message,
  onRetry,
  dismissible = true,
}: ErrorAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 relative">
        <div className="flex gap-4">
          <div className="shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">{title}</h3>
            <p className="text-sm text-red-700 mb-4">{message}</p>
            <div className="flex gap-3 flex-wrap">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Thử lại
                </button>
              )}
            </div>
          </div>
          {dismissible && (
            <button
              onClick={() => setIsVisible(false)}
              className="shrink-0 text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
