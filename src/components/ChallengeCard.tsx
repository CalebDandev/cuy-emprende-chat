
import React from "react";
import { cn } from "@/lib/utils";
import CuyCoins from "./CuyCoins";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "not-started";
  reward: number;
  dueDate?: Date;
  priority: "high" | "medium" | "low";
}

interface ChallengeCardProps {
  challenge: Challenge;
  onClick?: (id: string) => void;
  className?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onClick,
  className,
}) => {
  const priorityClasses = {
    high: "border-l-4 border-red-500",
    medium: "border-l-4 border-yellow-500",
    low: "border-l-4 border-green-500",
  };

  const statusIcons = {
    completed: <CheckCircle className="text-green-500 w-5 h-5" />,
    "in-progress": <Clock className="text-blue-500 w-5 h-5" />,
    "not-started": <AlertCircle className="text-gray-400 w-5 h-5" />,
  };

  const statusText = {
    completed: "Completado",
    "in-progress": "En progreso",
    "not-started": "Por iniciar",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm p-4 mb-3",
        priorityClasses[challenge.priority],
        challenge.status === "completed" && "bg-green-50",
        className
      )}
      onClick={() => onClick?.(challenge.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">{challenge.title}</h3>
        <CuyCoins count={challenge.reward} size="sm" />
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          {statusIcons[challenge.status]}
          <span className="ml-1">{statusText[challenge.status]}</span>
        </div>
        
        {challenge.dueDate && (
          <div className="text-xs text-gray-500">
            Vence: {challenge.dueDate.toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
