
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
          className="quick-reply-button"
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default QuickReply;
