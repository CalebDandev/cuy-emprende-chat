
import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface RiskIndicatorProps {
  level: "low" | "medium" | "high";
  message?: string;
  className?: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  level,
  message,
  className,
}) => {
  const riskConfig = {
    low: {
      color: "bg-green-100 border-green-500 text-green-700",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      indicator: "🟢",
      text: "Riesgo bajo. ¡Tu negocio está bien encaminado!",
    },
    medium: {
      color: "bg-yellow-100 border-yellow-500 text-yellow-700",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      indicator: "🟡",
      text: "Riesgo medio. ¡Aún estás a tiempo de mejorar tu plan!",
    },
    high: {
      color: "bg-red-100 border-red-500 text-red-700",
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      indicator: "🔴",
      text: "Riesgo alto. ¡Necesitas actuar pronto!",
    },
  };

  const displayMessage = message || riskConfig[level].text;

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4 flex items-center",
        riskConfig[level].color,
        className
      )}
    >
      <div className="mr-3">{riskConfig[level].icon}</div>
      <div>
        <div className="font-medium text-sm">Nivel de riesgo: {riskConfig[level].indicator}</div>
        <p className="text-sm">{displayMessage}</p>
      </div>
    </div>
  );
};

export default RiskIndicator;
