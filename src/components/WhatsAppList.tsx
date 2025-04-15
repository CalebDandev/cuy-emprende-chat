
import React from "react";
import { cn } from "@/lib/utils";
import CuyAvatar from "./CuyAvatar";

interface WhatsAppListProps {
  onStartChat: () => void;
}

const WhatsAppList: React.FC<WhatsAppListProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* WhatsApp-style header */}
      <div className="bg-whatsapp-green text-white px-4 py-3">
        <h1 className="text-lg font-medium">WhatsApp</h1>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {/* Kututu chat item */}
        <div 
          onClick={onStartChat}
          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
        >
          <CuyAvatar className="w-12 h-12" />
          <div className="ml-3 flex-1">
            <div className="flex justify-between items-baseline">
              <h2 className="font-medium text-gray-900">Kututu BCP</h2>
              <span className="text-sm text-gray-500">12:30</span>
            </div>
            <p className="text-sm text-gray-500 truncate">
              Toca para iniciar la conversación...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppList;
