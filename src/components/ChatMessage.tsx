
import React from "react";
import { cn } from "@/lib/utils";
import CuyAvatar from "./CuyAvatar";

export interface ChatMessageProps {
  id: string;
  content: string;
  type: "received" | "sent";
  timestamp: Date;
  hasEmoji?: boolean;
  hasImage?: string;
  showAvatar?: boolean;
  isTyping?: boolean;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  type,
  timestamp,
  hasEmoji,
  hasImage,
  showAvatar = false,
  isTyping = false,
  className,
}) => {
  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex w-full mb-2",
        type === "sent" ? "justify-end" : "justify-start",
        className
      )}
    >
      {type === "received" && showAvatar && (
        <div className="mr-2 flex-shrink-0 self-end mb-1">
          <CuyAvatar size="sm" />
        </div>
      )}

      <div
        className={cn(
          "chat-bubble",
          type === "received" ? "chat-bubble-received" : "chat-bubble-sent",
          isTyping && "min-w-[4rem]"
        )}
      >
        {isTyping ? (
          <div className="flex space-x-1 py-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        ) : (
          <>
            {hasImage && (
              <div className="mb-1 rounded overflow-hidden">
                <img
                  src={hasImage}
                  alt="Message attachment"
                  className="max-w-full h-auto"
                />
              </div>
            )}
            <div className={cn(hasEmoji && "text-2xl")}>
              {content}
            </div>
            <div className="text-[10px] text-gray-300 text-right -mb-1 mt-1">
              {formattedTime}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
