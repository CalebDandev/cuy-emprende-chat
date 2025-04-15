
import React from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import CuyAvatar from "../CuyAvatar";
import CuyCoins from "../CuyCoins";

interface ChatHeaderProps {
  onBack: () => void;
  cuyCoins: number;
  showReward: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack, cuyCoins, showReward }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-bcp-blue text-white">
      <div className="flex items-center gap-3">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <CuyAvatar status="online" />
          <div>
            <h2 className="font-medium">Kututu BCP</h2>
            <p className="text-xs opacity-90">Asesor virtual</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CuyCoins count={cuyCoins} showAnimation={showReward} />
        <button>
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
