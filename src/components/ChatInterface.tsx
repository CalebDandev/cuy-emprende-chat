
import React, { useRef } from "react";
import WhatsAppList from "./WhatsAppList";
import { useChat } from "@/hooks/useChat";
import ChatHeader from "./chat/ChatHeader";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";

const ChatInterface: React.FC = () => {
  const {
    started,
    setStarted,
    currentMessage,
    setCurrentMessage,
    sections,
    cuyCoins,
    showReward,
    handleSendMessage,
    handleQuickReply,
    handleSelectCourse,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleBackToList = () => {
    setStarted(false);
  };

  if (!started) {
    return <WhatsAppList onStartChat={() => setStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        onBack={handleBackToList}
        cuyCoins={cuyCoins}
        showReward={showReward}
      />
      <ChatMessages
        sections={sections}
        onQuickReply={handleQuickReply}
        onSelectCourse={handleSelectCourse}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={() => handleSendMessage(currentMessage)}
      />
    </div>
  );
};

export default ChatInterface;
