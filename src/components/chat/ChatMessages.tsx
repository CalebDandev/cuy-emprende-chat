
import React from "react";
import ChatMessage, { ChatMessageProps } from "../ChatMessage";
import QuickReply from "../QuickReply";
import { ConversationSection } from "@/hooks/useChat";
import RiskIndicator from "../RiskIndicator";
import TestimonialCard from "../TestimonialCard";
import CoursesRoadmap from "../CoursesRoadmap";

interface ChatMessagesProps {
  sections: ConversationSection[];
  onQuickReply: (value: string) => void;
  onSelectCourse: (courseId: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  sections,
  onQuickReply,
  onSelectCourse,
  messagesEndRef,
}) => {
  const renderComponent = (component: string, props: any) => {
    switch (component) {
      case "risk":
        return <RiskIndicator {...props} />;
      case "testimonial":
        return <TestimonialCard {...props} />;
      case "roadmap":
        return <CoursesRoadmap courses={props} onSelectCourse={onSelectCourse} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="space-y-4">
          {section.messages.map((message: ChatMessageProps) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          {section.component && renderComponent(section.component, section.componentProps)}
          {section.quickReplies && (
            <QuickReply options={section.quickReplies} onSelect={onQuickReply} />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
