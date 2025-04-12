
import React from "react";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

interface CuyCoinsProps {
  count: number;
  size?: "sm" | "md" | "lg";
  showAnimation?: boolean;
  className?: string;
}

const CuyCoins: React.FC<CuyCoinsProps> = ({
  count,
  size = "md",
  showAnimation = false,
  className,
}) => {
  const sizeClasses = {
    sm: "h-5 text-xs",
    md: "h-7 text-sm",
    lg: "h-9 text-base",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center bg-gradient-to-r from-bcp-orange to-yellow-500 text-white rounded-full px-2 font-medium",
        sizeClasses[size],
        showAnimation && "animate-bounce-small",
        className
      )}
    >
      <Coins className="mr-1 w-4 h-4" />
      <span>{count}</span>
    </div>
  );
};

export default CuyCoins;
