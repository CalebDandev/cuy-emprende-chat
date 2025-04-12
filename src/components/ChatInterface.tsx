
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

interface ConversationSection {
  id: string;
  messages: ChatMessageProps[];
  quickReplies?: {
    label: string;
    value: string;
  }[];
  challenge?: Challenge;
  courses?: Course[];
  component?: "progress" | "challenge" | "roadmap" | "reward";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample conversation flow
  const conversationFlow: ConversationSection[] = [
    {
      id: "welcome",
      messages: [
        {
          id: "welcome-1",
          content: "¡Hola! Soy Cuy, tu asistente de Contigo Emprendedor BCP 👋",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "welcome-2",
          content: "¿Cómo te llamas?",
          type: "received",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "type-business",
      messages: [
        {
          id: "type-1",
          content: "¡Qué buenazo conocerte! ¿A qué tipo de negocio te dedicas?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Tienda / Bodega", value: "retail" },
        { label: "Restaurante", value: "restaurant" },
        { label: "Servicios", value: "services" },
        { label: "Manufactura", value: "manufacturing" },
        { label: "Otro", value: "other" },
      ],
    },
    {
      id: "risk-assessment",
      messages: [
        {
          id: "risk-1",
          content: "Gracias por la información. Ahora me gustaría hacerte algunas preguntas rápidas para evaluar cómo está preparado tu negocio ante emergencias.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "risk-2",
          content: "¿Tienes un plan de emergencia para tu negocio?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, completo", value: "yes-full" },
        { label: "Sí, parcial", value: "yes-partial" },
        { label: "No, pero lo estoy pensando", value: "no-planning" },
        { label: "No lo considero necesario", value: "no" },
      ],
    },
    {
      id: "digital-tools",
      messages: [
        {
          id: "digital-1",
          content: "¿Usas herramientas digitales para gestionar tu inventario o ventas?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Sí, todo digitalizado", value: "yes-full" },
        { label: "Parcialmente", value: "yes-partial" },
        { label: "No, uso papel", value: "no" },
      ],
    },
    {
      id: "evaluation-results",
      messages: [
        {
          id: "eval-1",
          content: "¡Gracias por tus respuestas! Basado en ellas, he preparado un diagnóstico rápido de tu preparación ante emergencias.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "eval-2",
          content: "Tu nivel de preparación actual es:",
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "progress",
      componentProps: {
        progress: 35,
        level: "Iniciando",
        nextLevel: "Preparado",
      },
    },
    {
      id: "first-challenge",
      messages: [
        {
          id: "challenge-1",
          content: "Para ayudarte a mejorar tu preparación, te propongo un desafío simple pero importante:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "challenge",
      challenge: {
        id: "challenge-inventory",
        title: "Crear inventario digital básico",
        description: "Registra tus 10 productos/servicios principales con foto, precio y cantidad disponible.",
        status: "not-started",
        reward: 25,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: "medium",
      },
    },
    {
      id: "accept-challenge",
      messages: [
        {
          id: "accept-1",
          content: "¿Te animas a completar este desafío?",
          type: "received",
          timestamp: new Date(),
          showAvatar: false,
        },
      ],
      quickReplies: [
        { label: "¡Claro que sí! 💪", value: "accept" },
        { label: "¿Cómo lo hago?", value: "how-to" },
        { label: "Ahora no puedo", value: "later" },
      ],
    },
    {
      id: "challenge-accepted",
      messages: [
        {
          id: "accepted-1",
          content: "¡Excelente decisión! Cuando completes este desafío, ganarás 25 Monedas Cuy que podrás usar para desbloquear cursos y recursos exclusivos.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "accepted-2",
          content: "Te enviaré recordatorios amigables para ayudarte a completarlo. ¿Puedo mostrarte qué podrás hacer con tus Monedas Cuy?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, muéstrame", value: "show-roadmap" },
        { label: "Después", value: "later" },
      ],
    },
    {
      id: "show-roadmap",
      messages: [
        {
          id: "roadmap-1",
          content: "¡Perfecto! Este es tu camino de aprendizaje. Podrás desbloquear cursos con las Monedas Cuy que vas ganando:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "roadmap",
      courses: [
        {
          id: "course-1",
          title: "Inventario Digital",
          description: "Aprende a digitalizar tu inventario de forma sencilla",
          status: "available",
          progress: 0,
        },
        {
          id: "course-2",
          title: "Plan de Crisis",
          description: "Crea tu plan de acción ante emergencias",
          status: "locked",
          unlockCost: 25,
        },
        {
          id: "course-3",
          title: "Ventas en Emergencias",
          description: "Estrategias para mantener ventas en crisis",
          status: "locked",
          unlockCost: 50,
        },
      ],
    },
    {
      id: "challenge-completed",
      messages: [
        {
          id: "completed-1",
          content: "¡FELICITACIONES! 🎉 Has completado tu primer desafío.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
          hasEmoji: true,
        },
        {
          id: "completed-2",
          content: "Has ganado:",
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "reward",
      componentProps: {
        coins: 25,
        achievement: "¡Primer desafío completado!",
      },
    },
    {
      id: "next-steps",
      messages: [
        {
          id: "next-1",
          content: "Ahora puedes usar tus Monedas Cuy para desbloquear el curso 'Plan de Crisis' o seguir con más desafíos para ganar más monedas.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "next-2",
          content: "¿Qué te gustaría hacer a continuación?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Desbloquear curso", value: "unlock-course" },
        { label: "Más desafíos", value: "more-challenges" },
        { label: "Ver mi progreso", value: "view-progress" },
      ],
    },
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
    
    // Simulate typing time
    setTimeout(() => {
      setSections(prev => [...prev, currentSection]);
      setLoading(false);
      scrollToBottom();
      
      // If this section gives a reward, update coins
      if (currentSection.component === "reward" && currentSection.componentProps?.coins) {
        setCuyCoins(prev => prev + currentSection.componentProps.coins);
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
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
      // Add this message to the current section
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          messages: [...updated[updated.length - 1].messages, newMessage],
        };
      } else {
        // If no sections yet, create one
        updated.push({
          id: "user-input",
          messages: [newMessage],
        });
      }
      return updated;
    });

    setCurrentMessage("");
    
    // Special handling for username section
    if (currentSectionIndex === 0) {
      setUserName(currentMessage);
    }
    
    // Move to the next section
    setTimeout(() => {
      setCurrentSectionIndex(prev => prev + 1);
    }, 500);
  };

  const handleQuickReply = (value: string) => {
    // Create a message from the selected quick reply
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
        // Add this quick reply as a sent message
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            messages: [...updated[updated.length - 1].messages, newMessage],
            quickReplies: undefined, // Remove quick replies after selection
          };
        }
        return updated;
      });

      // Move to the next section
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    // In a real app, this would navigate to the course details
    console.log("Selected course:", courseId);
  };

  const handleSelectChallenge = (challengeId: string) => {
    // In a real app, this would show challenge details
    console.log("Selected challenge:", challengeId);
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
                className="h-full bg-bcp-blue rounded-full transition-all duration-1000"
                style={{ width: `${props.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">{props.level}</span>
              <span className="text-xs font-medium">{props.progress}%</span>
              <span className="text-xs text-gray-500">→ {props.nextLevel}</span>
            </div>
          </div>
        );
      
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
      
      default:
        return null;
    }
  };

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <div className="bg-bcp-red text-white px-4 py-3 flex items-center justify-between shadow-md">
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

      {/* Chat Messages */}
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

      {/* Input Area */}
      <div className="bg-white p-2 px-4 flex items-center border-t">
        <button className="text-gray-500 mr-2">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={userName ? `Escribe un mensaje, ${userName}...` : "Escribe un mensaje..."}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-bcp-blue"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        
        {currentMessage ? (
          <button
            className="ml-2 bg-bcp-red rounded-full p-2 text-white"
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
