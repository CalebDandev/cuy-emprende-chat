import React from "react";
import { cn } from "@/lib/utils";

interface QuickReplyProps {
  label?: string;
  options?: {
    label: string;
    value: string;
  }[];
  onClick?: () => void;
  onSelect?: (value: string) => void;
  className?: string;
}

const QuickReply: React.FC<QuickReplyProps> = ({
  label,
  options,
  onClick,
  onSelect,
  className,
}) => {
  if (label && onClick) {
    return (
      <button
        className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium"
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  
  return (
    <div className={cn("flex flex-wrap gap-2 py-2", className)}>
      {options?.map((option) => (
        <button
          key={option.value}
          className="bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium"
          onClick={() => onSelect?.(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReply;
