
import { useState, useEffect } from "react";
import { ChatMessageProps } from "@/components/ChatMessage";
import { Course } from "@/components/CoursesRoadmap";

export interface ConversationSection {
  id: string;
  messages: ChatMessageProps[];
  quickReplies?: {
    label: string;
    value: string;
  }[];
  challenge?: any;
  challenges?: any[];
  courses?: Course[];
  component?: "progress" | "challenge" | "challenges" | "roadmap" | "reward" | "risk" | "testimonial";
  componentProps?: any;
}

export const useChat = () => {
  const [started, setStarted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<ConversationSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [cuyCoins, setCuyCoins] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [userName] = useState("Lizet Rojas Corman");
  const [businessType] = useState("Negocio de elaboración y venta de vinos y destilados");
  const [businessName] = useState("Bodega De Liz");
  const [businessLocation] = useState("Barranca, Lima");
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium");
  const [verifyingPin, setVerifyingPin] = useState(false);
  const [expectedPin, setExpectedPin] = useState("");
  const [currentCourse, setCurrentCourse] = useState("");
  const [waitingForReadyConfirmation, setWaitingForReadyConfirmation] = useState(false);
  const [damageAssessment, setDamageAssessment] = useState(false);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    if (verifyingPin) {
      handlePinVerification(message);
      return;
    }

    if (waitingForReadyConfirmation && message.toLowerCase().includes("listo")) {
      handleReadyConfirmation(message);
      return;
    }
    
    const newMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      content: message,
      type: "sent",
      timestamp: new Date(),
    };

    updateSectionsWithMessage(newMessage);
    setCurrentMessage("");
    
    if (damageAssessment) {
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handlePinVerification = (pin: string) => {
    const newMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      content: pin,
      type: "sent",
      timestamp: new Date(),
      isPin: true,
    };

    updateSectionsWithMessage(newMessage);
    setCurrentMessage("");
    
    if (pin.trim() === expectedPin) {
      setVerifyingPin(false);
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    } else {
      setVerifyingPin(false);
      handleIncorrectPin();
    }
  };

  const handleReadyConfirmation = (message: string) => {
    const newMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      content: message,
      type: "sent",
      timestamp: new Date(),
    };

    updateSectionsWithMessage(newMessage);
    setCurrentMessage("");
    setWaitingForReadyConfirmation(false);
    
    setTimeout(() => {
      setCurrentSectionIndex(prev => prev + 1);
    }, 500);
  };

  const updateSectionsWithMessage = (message: ChatMessageProps) => {
    setSections(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          messages: [...updated[updated.length - 1].messages, message],
        };
      } else {
        updated.push({
          id: "user-input",
          messages: [message],
        });
      }
      return updated;
    });
  };

  const handleIncorrectPin = () => {
    setTimeout(() => {
      const incorrectPinSection: ConversationSection = {
        id: `incorrect-pin-${Date.now()}`,
        messages: [
          {
            id: `incorrect-pin-msg-${Date.now()}`,
            content: "Lo siento, el PIN ingresado es incorrecto. Por favor, intenta nuevamente.",
            type: "received",
            timestamp: new Date(),
            showAvatar: true,
          }
        ],
        quickReplies: [
          { label: "Intentar nuevamente", value: "retry" }
        ]
      };
      setSections(prev => [...prev, incorrectPinSection]);
    }, 500);
  };

  const handleQuickReply = (value: string) => {
    const quickReplyOption = sections[sections.length - 1].quickReplies?.find(
      option => option.value === value
    );

    if (!quickReplyOption) return;

    const newMessage: ChatMessageProps = {
      id: `quick-reply-${Date.now()}`,
      content: quickReplyOption.label,
      type: "sent",
      timestamp: new Date(),
    };

    setSections(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          messages: [...updated[updated.length - 1].messages, newMessage],
          quickReplies: undefined,
        };
      }
      return updated;
    });

    if (value === "end" && currentSectionIndex === conversationFlow.length - 1) {
      setTimeout(() => {
        setStarted(false);
        setSections([]);
        setCurrentSectionIndex(0);
      }, 1000);
      return;
    }
    
    if (value === "roof-damage" || value === "protected") {
      setDamageAssessment(true);
    }

    if (value === "start-course") {
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 2000);
      return;
    }

    setTimeout(() => {
      setCurrentSectionIndex(prev => prev + 1);
    }, 500);
  };

  const handleSelectCourse = (courseId: string) => {
    setCurrentCourse(courseId);
    
    const selectedCourse = conversationFlow.find(section => 
      section.component === "roadmap")?.componentProps.find(
        (c: Course) => c.id === courseId
      );
    
    if (selectedCourse) {
      const courseSection: ConversationSection = {
        id: `selected-course-${Date.now()}`,
        messages: [
          {
            id: `course-msg-1-${Date.now()}`,
            content: `Has seleccionado el curso: "${selectedCourse.title}" 📚`,
            type: "received",
            timestamp: new Date(),
            showAvatar: true,
          },
          {
            id: `course-msg-2-${Date.now()}`,
            content: "¡Vamos a comenzar con el aprendizaje! Este curso te ayudará a desarrollar habilidades clave para la gestión de riesgos en tu bodega.",
            type: "received",
            timestamp: new Date(),
          }
        ],
        quickReplies: [
          { label: "Comenzar curso", value: "start-course" }
        ]
      };
      
      setSections(prev => [...prev, courseSection]);
    }
  };

  return {
    started,
    setStarted,
    currentMessage,
    setCurrentMessage,
    loading,
    sections,
    setSections,
    currentSectionIndex,
    setCurrentSectionIndex,
    cuyCoins,
    showReward,
    riskLevel,
    handleSendMessage,
    handleQuickReply,
    handleSelectCourse,
  };
};

