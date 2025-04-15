
import React from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
}) => {
  return (
    <div className="flex items-center gap-2 p-4 border-t border-gray-200">
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        placeholder="Escribe un mensaje..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-bcp-blue"
      />
      <button
        onClick={handleSendMessage}
        className="p-2 text-white bg-bcp-blue rounded-full hover:bg-bcp-blue-dark transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;
