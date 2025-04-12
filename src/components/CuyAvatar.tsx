
import React from "react";
import { cn } from "@/lib/utils";

interface CuyAvatarProps {
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline";
  className?: string;
}

const CuyAvatar: React.FC<CuyAvatarProps> = ({
  size = "md",
  status = "online",
  className,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("relative rounded-full", className)}>
      <div className={cn("rounded-full overflow-hidden", sizeClasses[size])}>
        <div className="bg-bcp-orange w-full h-full flex items-center justify-center text-white font-bold">
          {/* This would be an actual Cuy image in a real implementation */}
          Cuy
        </div>
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            {
              "bg-whatsapp-green": status === "online",
              "bg-gray-400": status === "offline",
            },
            size === "sm" ? "w-2 h-2" : "w-3 h-3"
          )}
        />
      )}
    </div>
  );
};

export default CuyAvatar;
