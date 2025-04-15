
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  labels?: string[];
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  labels,
  className,
}) => {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex items-center justify-between">
            {Array.from({ length: steps }).map((_, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <div className="flex-1 h-1 bg-gray-200 mx-1">
                      <div
                        className={cn(
                          "h-full bg-bcp-blue transition-all",
                          isCompleted ? "w-full" : "w-0"
                        )}
                      ></div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-full flex items-center justify-center w-6 h-6 text-xs font-medium border-2",
                      isCompleted
                        ? "bg-bcp-blue border-bcp-blue text-white"
                        : isCurrent
                        ? "bg-white border-bcp-blue text-bcp-blue"
                        : "bg-white border-gray-300 text-gray-400"
                    )}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {labels && (
          <div className="flex justify-between mt-1">
            {labels.map((label, index) => (
              <span
                key={index}
                className={cn(
                  "text-xs",
                  index < currentStep
                    ? "text-bcp-blue"
                    : index === currentStep
                    ? "text-bcp-blue font-medium"
                    : "text-gray-400"
                )}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;
