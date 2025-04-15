
import React from "react";
import { cn } from "@/lib/utils";

interface QuickReplyProps {
  options: {
    label: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
  className?: string;
}

const QuickReply: React.FC<QuickReplyProps> = ({
  options,
  onSelect,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2 py-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium"
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReply;
