
import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import CuyCoins from "./CuyCoins";

interface RiskIndicatorProps {
  level: "low" | "medium" | "high";
  message?: string;
  className?: string;
  rewardPoints?: number;
  showMoreUrl?: string;
}

const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  level,
  message,
  className,
  rewardPoints,
  showMoreUrl
}) => {
  const riskConfig = {
    low: {
      color: "bg-green-100 border-green-500 text-green-700",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      indicator: "🟢",
      text: "Riesgo bajo. ¡Tu negocio está bien encaminado!",
      profile: "Bodega con buena preparación"
    },
    medium: {
      color: "bg-yellow-100 border-yellow-500 text-yellow-700",
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      indicator: "🟡",
      text: "Riesgo medio. ¡Aún estás a tiempo de mejorar tu plan!",
      profile: "Bodega en desarrollo de resiliencia"
    },
    high: {
      color: "bg-red-100 border-red-500 text-red-700",
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      indicator: "🔴",
      text: "Riesgo alto. ¡Necesitas actuar pronto!",
      profile: "Bodega vulnerable ante emergencias"
    },
  };

  const displayMessage = message || riskConfig[level].text;

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4",
        riskConfig[level].color,
        className
      )}
    >
      <div className="flex items-start">
        <div className="mr-3">{riskConfig[level].icon}</div>
        <div className="flex-1">
          <div className="font-medium text-sm">Perfil de riesgo: {riskConfig[level].profile} {riskConfig[level].indicator}</div>
          <p className="text-sm mt-1">{displayMessage}</p>
          
          {rewardPoints && (
            <div className="mt-3 flex items-center">
              <span className="text-xs mr-2">¡Has ganado:</span>
              <CuyCoins count={rewardPoints} size="sm" showAnimation />
            </div>
          )}
          
          <div className="mt-3 text-sm">
            <p>Estos puntos te servirán para:</p>
            <ul className="mt-1 list-disc pl-5 text-xs space-y-1">
              <li>Desbloquear asesorías personalizadas para tu plan de contingencia</li>
              <li>Obtener beneficios exclusivos del BCP</li>
              <li>Acceder a contenido premium para emprendedores</li>
            </ul>
          </div>
          
          {showMoreUrl && (
            <div className="mt-3">
              <a href="#" className="text-xs flex items-center text-bcp-blue font-medium hover:underline">
                Ver más beneficios <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskIndicator;
