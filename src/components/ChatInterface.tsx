import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import QuickReply from "./QuickReply";
import CuyAvatar from "./CuyAvatar";
import { Send, Paperclip, Mic, ArrowLeft, MoreVertical } from "lucide-react";
import ChallengeCard, { Challenge } from "./ChallengeCard";
import CoursesRoadmap, { Course } from "./CoursesRoadmap";
import CuyCoins from "./CuyCoins";
import ProgressIndicator from "./ProgressIndicator";
import RiskIndicator from "./RiskIndicator";
import TestimonialCard from "./TestimonialCard";

interface ConversationSection {
  id: string;
  messages: ChatMessageProps[];
  quickReplies?: {
    label: string;
    value: string;
  }[];
  challenge?: Challenge;
  courses?: Course[];
  component?: "progress" | "challenge" | "roadmap" | "reward" | "risk" | "testimonial";
  componentProps?: any;
}

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-bcp-red to-bcp-orange text-white px-8 py-12">
      <div className="w-20 h-20 rounded-full bg-white mb-6 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-bcp-orange flex items-center justify-center text-white font-bold text-xl">
          Cuy
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-2 text-center">
        Contigo Emprendedor BCP
      </h1>
      
      <p className="text-center mb-8 opacity-90">
        Tu asistente para prepararte ante cualquier emergencia 
        y fortalecer tu negocio
      </p>
      
      <button 
        onClick={onStart}
        className="bg-white text-bcp-red font-medium rounded-full px-8 py-3 shadow-lg hover:bg-gray-100 transition-colors"
      >
        Comenzar ahora
      </button>

      <p className="mt-8 text-sm opacity-80 text-center">
        Un programa gratuito del Banco de Crédito del Perú
        para fortalecer emprendedores
      </p>
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<ConversationSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [cuyCoins, setCuyCoins] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [userName, setUserName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversationFlow: ConversationSection[] = [
    // ... keep existing conversation flow
  ];

  useEffect(() => {
    if (started && currentSectionIndex < conversationFlow.length) {
      displayCurrentSection();
    }
  }, [currentSectionIndex, started]);

  useEffect(() => {
    scrollToBottom();
  }, [sections]);

  const displayCurrentSection = () => {
    const currentSection = conversationFlow[currentSectionIndex];
    setLoading(true);
    
    setTimeout(() => {
      setSections(prev => [...prev, currentSection]);
      setLoading(false);
      scrollToBottom();
      
      if (currentSection.component === "reward" && currentSection.componentProps?.coins) {
        setCuyCoins(prev => prev + currentSection.componentProps.coins);
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
      }

      if (currentSection.component === "risk" && currentSection.componentProps?.level) {
        setRiskLevel(currentSection.componentProps.level);
      }
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      content: currentMessage,
      type: "sent",
      timestamp: new Date(),
    };

    setSections(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          messages: [...updated[updated.length - 1].messages, newMessage],
        };
      } else {
        updated.push({
          id: "user-input",
          messages: [newMessage],
        });
      }
      return updated;
    });

    setCurrentMessage("");
    
    if (currentSectionIndex === 0) {
      setUserName(currentMessage);
    }
    
    setTimeout(() => {
      setCurrentSectionIndex(prev => prev + 1);
    }, 500);
  };

  const handleQuickReply = (value: string) => {
    const quickReplyOption = sections[sections.length - 1].quickReplies?.find(
      option => option.value === value
    );

    if (quickReplyOption) {
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

      if (currentSectionIndex === 1 && value !== "other") {
        setBusinessType(quickReplyOption.label);
      }

      if (currentSectionIndex === 2) {
        setBusinessLocation(quickReplyOption.label);
      }

      if (currentSectionIndex === 14 && value === "yes-advice") {
        if (businessType === "Tienda / Bodega") {
          setTimeout(() => {
            setCurrentSectionIndex(15);
          }, 500);
          return;
        } else if (businessType === "Restaurante") {
          setTimeout(() => {
            setCurrentSectionIndex(16);
          }, 500);
          return;
        } else if (businessType === "Servicios") {
          setTimeout(() => {
            setCurrentSectionIndex(17);
          }, 500);
          return;
        } else if (businessType === "Manufactura") {
          setTimeout(() => {
            setCurrentSectionIndex(18);
          }, 500);
          return;
        }
      }

      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    console.log("Curso seleccionado:", courseId);
  };

  const handleSelectChallenge = (challengeId: string) => {
    console.log("Desafío seleccionado:", challengeId);
  };

  const renderComponent = (component: string, props: any) => {
    switch (component) {
      case "progress":
        return (
          <div className="bg-[#1f2c38] rounded-lg p-4 my-2 shadow-sm">
            <h4 className="text-sm font-medium text-gray-200 mb-2">
              Nivel de preparación
            </h4>
            <div className="w-full h-3 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-bcp-blue rounded-full transition-all duration-1000"
                style={{ width: `${props.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">{props.level}</span>
              <span className="text-xs font-medium text-gray-300">{props.progress}%</span>
              <span className="text-xs text-gray-400">→ {props.nextLevel}</span>
            </div>
          </div>
        );
      
      case "risk":
        return <RiskIndicator 
          level={props.level} 
          message={props.message}
          className="my-2"
        />;
      
      case "challenge":
        return props && <ChallengeCard 
          challenge={props} 
          onClick={handleSelectChallenge}
          className="my-2"
        />;
      
      case "roadmap":
        return props && <CoursesRoadmap 
          courses={props} 
          onSelectCourse={handleSelectCourse}
          className="my-2" 
        />;
      
      case "reward":
        return (
          <div className="bg-gradient-to-br from-bcp-orange to-yellow-500 rounded-lg p-4 my-2 text-white text-center">
            <h4 className="font-medium mb-3">{props.achievement}</h4>
            <div className="inline-flex items-center justify-center bg-white rounded-full px-4 py-2 shadow-lg">
              <CuyCoins count={props.coins} showAnimation size="lg" />
            </div>
            <p className="mt-2 text-sm">¡Monedas Cuy añadidas a tu cuenta!</p>
          </div>
        );

      case "testimonial":
        return props && <TestimonialCard 
          name={props.name}
          business={props.business}
          location={props.location}
          quote={props.quote}
          imageSrc={props.imageSrc}
          className="my-2"
        />;
      
      default:
        return null;
    }
  };

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-whatsapp-background">
      <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <ArrowLeft className="w-5 h-5 mr-3" />
          <CuyAvatar />
          <div className="ml-2">
            <div className="font-medium">Cuy - Contigo Emprendedor</div>
            <div className="text-xs opacity-80">
              {loading ? "escribiendo..." : "en línea"}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {cuyCoins > 0 && (
            <div className={cn(
              "transition-all duration-300",
              showReward && "scale-125"
            )}>
              <CuyCoins count={cuyCoins} />
            </div>
          )}
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 whatsapp-chat">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-4">
            {section.messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}

            {section.component && section.componentProps && (
              renderComponent(section.component, section.componentProps)
            )}
            
            {section.component === "challenge" && section.challenge && (
              renderComponent(section.component, section.challenge)
            )}
            
            {section.component === "roadmap" && section.courses && (
              renderComponent(section.component, section.courses)
            )}

            {section.quickReplies && (
              <QuickReply
                options={section.quickReplies}
                onSelect={handleQuickReply}
                className="mt-1"
              />
            )}
          </div>
        ))}

        {loading && (
          <ChatMessage
            id="typing"
            content=""
            type="received"
            timestamp={new Date()}
            isTyping={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-[#F0F0F0] p-2 px-4 flex items-center border-t border-gray-300">
        <button className="text-gray-600 mr-2">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={userName ? `Escribe un mensaje, ${userName}...` : "Escribe un mensaje..."}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none bg-white text-black"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        
        {currentMessage ? (
          <button
            className="ml-2 bg-[#00a884] rounded-full p-2 text-white"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button className="ml-2 text-gray-600">
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
