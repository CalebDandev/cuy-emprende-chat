
import React from "react";
import { cn } from "@/lib/utils";
import { Quote, ExternalLink } from "lucide-react";
import CuyCoins from "./CuyCoins";

interface TestimonialCardProps {
  name: string;
  business: string;
  location: string;
  quote: string;
  imageSrc: string;
  rewardPoints?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  business,
  location,
  quote,
  imageSrc,
  rewardPoints,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm p-4 border border-gray-200",
        className
      )}
    >
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-xs text-gray-600">{business}</p>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="absolute top-0 left-0 w-5 h-5 text-gray-300 opacity-50" />
        <p className="pl-6 text-sm text-gray-700 italic">
          {quote}
        </p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="bg-bcp-orange bg-opacity-10 text-bcp-orange text-xs px-2 py-1 rounded-full">
          Historia de éxito
        </div>
        <div className="flex items-center gap-2">
          {rewardPoints && (
            <div className="flex items-center text-xs text-gray-600">
              <span>Ver historia completa y gana</span>
              <CuyCoins count={rewardPoints} size="sm" className="ml-1" />
            </div>
          )}
          <a href="#" className="text-bcp-blue flex items-center text-xs font-medium hover:underline">
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
