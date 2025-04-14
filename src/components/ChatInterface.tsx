import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import QuickReply from "./QuickReply";
import CuyAvatar from "./CuyAvatar";
import { Send, Paperclip, Mic, ArrowLeft, MoreVertical, ExternalLink } from "lucide-react";
import ChallengeCard, { Challenge } from "./ChallengeCard";
import CoursesRoadmap, { Course } from "./CoursesRoadmap";
import CuyCoins from "./CuyCoins";
import ProgressIndicator from "./ProgressIndicator";
import RiskIndicator from "./RiskIndicator";
import TestimonialCard from "./TestimonialCard";
import WhatsAppList from "./WhatsAppList";

interface ConversationSection {
  id: string;
  messages: ChatMessageProps[];
  quickReplies?: {
    label: string;
    value: string;
  }[];
  challenge?: Challenge;
  challenges?: Challenge[];
  courses?: Course[];
  component?: "progress" | "challenge" | "challenges" | "roadmap" | "reward" | "risk" | "testimonial";
  componentProps?: any;
}

const ChatInterface: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<ConversationSection[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [cuyCoins, setCuyCoins] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [userName, setUserName] = useState("Lizet Rojas Corman");
  const [businessType, setBusinessType] = useState("Negocio de elaboración y venta de vinos y destilados");
  const [businessName, setBusinessName] = useState("Bodega De Liz");
  const [businessLocation, setBusinessLocation] = useState("Barranca, Lima");
  const [correctInfo, setCorrectInfo] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium");
  const [verifyingPin, setVerifyingPin] = useState(false);
  const [expectedPin, setExpectedPin] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [waitingForReadyConfirmation, setWaitingForReadyConfirmation] = useState(false);
  const [damageAssessment, setDamageAssessment] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversationFlow: ConversationSection[] = [
    {
      id: "intro",
      messages: [
        {
          id: "intro-1",
          content: `¡Hola ${userName}! Soy Kututu, tu asesor virtual de BCP 👋`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "intro-2",
          content: "Estoy aquí para ayudarte a crear un plan de contingencia para tu negocio de vinos y destilados, y así estar preparado ante cualquier emergencia que pueda afectar tu emprendimiento.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "intro-3",
          content: "Si deseas conocer más sobre nuestras iniciativas para emprendedores, puedes visitar: https://www.viabcp.com",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "intro-4",
          content: `Según nuestros registros, tienes ${businessName}, un ${businessType} ubicado en ${businessLocation}. ¿Es correcta esta información?`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, es correcto", value: "correct" },
      ],
    },
    {
      id: "incorrect-business-info",
      messages: [
        {
          id: "incorrect-1",
          content: "Gracias por avisarme. Por favor, ¿a qué tipo de negocio te dedicas?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Negocio de vinos y destilados", value: "wine" },
      ],
    },
    {
      id: "incorrect-business-location",
      messages: [
        {
          id: "incorrect-location-1",
          content: "¿Y en qué distrito está ubicado tu negocio?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Barranca, Lima", value: "barranca" },
      ],
    },
    {
      id: "success-story",
      messages: [
        {
          id: "story-1",
          content: "¡Perfecto! Antes de comenzar, me gustaría compartir contigo la historia de María, una emprendedora como tú.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "testimonial",
      componentProps: {
        name: "María Sánchez",
        business: "Viñedos San Martín",
        location: "Ica",
        quote: "Gracias al plan de contingencia que armé con Kututu, pude proteger mi bodega y mis barricas durante el último sismo. ¡Ahora mi negocio está más seguro que nunca!",
        imageSrc: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      quickReplies: [
        { label: "Continuar", value: "continue" },
      ],
    },
    {
      id: "awareness",
      messages: [
        {
          id: "awareness-1",
          content: "¿Sabías que el 40% de las bodegas de vino no logra recuperarse tras un desastre natural? 😱",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "awareness-2",
          content: "¡Pero no te preocupes! Estoy aquí para ayudarte a preparar tu bodega y hacerla más resistente 💪",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "awareness-3",
          content: "¿Te animas a crear tu plan de contingencia?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "¡Claro que sí! 🚀", value: "ready" },
      ],
    },
    // ... [Previous sections remain the same but with single quickReplies]
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

    if (verifyingPin) {
      const enteredPin = currentMessage.trim();
      
      const newMessage: ChatMessageProps = {
        id: `user-${Date.now()}`,
        content: enteredPin,
        type: "sent",
        timestamp: new Date(),
        isPin: true,
      };

      setSections(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            messages: [...updated[updated.length - 1].messages, newMessage],
          };
        }
        return updated;
      });

      setCurrentMessage("");
      
      if (enteredPin === expectedPin) {
        setVerifyingPin(false);
        setTimeout(() => {
          setCurrentSectionIndex(27);
        }, 500);
      } else {
        setVerifyingPin(false);
        setTimeout(() => {
          setCurrentSectionIndex(26);
        }, 500);
      }
      return;
    }

    if (waitingForReadyConfirmation && currentMessage.toLowerCase().includes("listo")) {
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
        }
        return updated;
      });

      setCurrentMessage("");
      setWaitingForReadyConfirmation(false);
      
      setTimeout(() => {
        setCurrentSectionIndex(8);
      }, 500);
      return;
    }
    
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
    
    if (damageAssessment) {
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
      return;
    }
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

      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handleSelectChallenge = (challengeId: string) => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setExpectedPin(pin);
    setCurrentChallenge(challengeId);
    
    setTimeout(() => {
      setCurrentSectionIndex(23);
    }, 500);
  };

  const renderChallenges = (challenges: Challenge[]) => {
    const filteredChallenges = challenges.filter(
      challenge => challenge.businessType === businessType || challenge.businessType === "general"
    );

    return (
      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onClick={handleSelectChallenge}
          />
        ))}
      </div>
    );
  };

  const handleSelectCourse = (courseId: string) => {
    console.log("Curso seleccionado:", courseId);
  };

  const renderComponent = (component: string, props: any) => {
    switch (component) {
      case "progress":
        return (
          <div className="bg-white rounded-lg p-4 my-2 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Nivel de preparación
            </h4>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-whatsapp-green rounded-full transition-all duration-1000"
                style={{ width: `${props.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{props.level}</span>
              <span className="text-xs font-medium text-gray-700">{props.progress}%</span>
              <span className="text-xs text-gray-500">→ {props.nextLevel}</span>
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
      
      case "challenges":
        return props && renderChallenges(props);
      
      case "roadmap":
        return props && <CoursesRoadmap 
          courses={props} 
          onSelectCourse={handleSelectCourse}
          className="my-2" 
        />;
      
      case "reward":
        return (
          <div className="bg-gradient-to-br from-whatsapp-green to-green-400 rounded-lg p-4 my-2 text-white text-center">
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

  const renderChallengeLink = (challengeId: string) => {
    const fakeUrl = `https://app.contigoemprendedor.pe/desafios/${challengeId}`;
    
    return (
      <div className="bg-white rounded-lg p-4 my-2 shadow-sm border-l-4 border-whatsapp-green">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-800">Enlace al desafío</h4>
            <p className="text-sm text-gray-600">PIN de verificación: {expectedPin}</p>
          </div>
          <ExternalLink className="text-whatsapp-green w-5 h-5" />
        </div>
        <a 
          href="#" 
          className="block mt-2 text-whatsapp-green font-medium text-sm"
          onClick={(e) => {
            e.preventDefault();
            setTimeout(() => {
              setVerifyingPin(true);
              setCurrentSectionIndex(24);
            }, 1000);
          }}
        >
          {fakeUrl}
        </a>
      </div>
    );
  };

  if (!started) {
    return <WhatsAppList onStartChat={() => setStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-whatsapp-bg">
      <div className="bg-whatsapp-green text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <ArrowLeft className="w-5 h-5 mr-3" onClick={() => setStarted(false)} />
          <CuyAvatar />
          <div className="ml-2">
            <div className="font-medium">Kututu BCP</div>
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

      <div className="flex-1 overflow-y-auto p-4 bg-chat-pattern">
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
            
            {section.component === "challenges" && section.challenges && (
              renderComponent(section.component, section.challenges)
            )}
            
            {section.component === "roadmap" && section.courses && (
              renderComponent(section.component, section.courses)
            )}

            {sectionIndex === sections.length - 1 && 
             currentSectionIndex === 23 && 
             currentChallenge && (
              renderChallengeLink(currentChallenge)
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

      <div className="bg-gray-100 p-2 px-4 flex items-center border-t border-gray-200">
        <button className="text-gray-500 mr-2">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={
            verifyingPin 
              ? "Ingresa el PIN del desafío..." 
              : waitingForReadyConfirmation 
                ? "Escribe 'Estoy listo' cuando quieras continuar..." 
                : `Escribe un mensaje, ${userName}...`
          }
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-whatsapp-green bg-white text-gray-800"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        
        {currentMessage ? (
          <button
            className="ml-2 bg-whatsapp-green rounded-full p-2 text-white"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button className="ml-2 text-gray-500">
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
