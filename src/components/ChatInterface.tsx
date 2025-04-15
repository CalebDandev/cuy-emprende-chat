import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import QuickReply from "./QuickReply";
import CuyAvatar from "./CuyAvatar";
import { Send, Paperclip, Mic, ArrowLeft, MoreVertical, ExternalLink, AlertTriangle, Umbrella, CloudRain, LifeBuoy } from "lucide-react";
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
  challenge?: any;
  challenges?: any[];
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
  const [currentCourse, setCurrentCourse] = useState("");
  const [waitingForReadyConfirmation, setWaitingForReadyConfirmation] = useState(false);
  const [damageAssessment, setDamageAssessment] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversationFlow: ConversationSection[] = [
    {
      id: "welcome-1",
      messages: [
        {
          id: "welcome-msg-1",
          content: `¡Hola! Soy Kututu, tu asistente virtual del BCP. 👋`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "welcome-msg-2",
          content: `Estoy aquí para ayudarte a proteger tu negocio ante posibles desastres naturales. 🛡️`,
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "welcome-msg-3",
          content: `¿Te gustaría evaluar el nivel de riesgo de tu negocio y descubrir cómo estar mejor preparado?`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "¡Empecemos!", value: "start" },
        { label: "Más información", value: "info" },
      ],
    },
    {
      id: "info-1",
      messages: [
        {
          id: "info-msg-1",
          content: `Con esta herramienta podrás:`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "info-msg-2",
          content: `• Identificar los riesgos específicos que enfrenta tu negocio. 🔍\n• Conocer las medidas preventivas que puedes implementar. 🛠️\n• Acceder a recursos y herramientas útiles para la gestión de riesgos. 📚`,
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "info-msg-3",
          content: `¡Comencemos a proteger tu negocio hoy mismo!`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "¡Empecemos!", value: "start" },
      ],
    },
    {
      id: "data-confirmation-1",
      messages: [
        {
          id: "data-msg-1",
          content: `Para empezar, por favor, verifica que la siguiente información de tu negocio sea correcta:`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "data-msg-2",
          content: `• Nombre: ${userName}\n• Tipo de negocio: ${businessType}\n• Nombre del negocio: ${businessName}\n• Ubicación: ${businessLocation}`,
          type: "received",
          timestamp: new Date(),
          isPin: true,
        },
      ],
      quickReplies: [
        { label: "Sí, es correcto", value: "correct-info" },
        { label: "No, debo corregir", value: "incorrect-info" },
      ],
    },
    {
      id: "risk-assessment-1",
      messages: [
        {
          id: "risk-msg-1",
          content: `De acuerdo a la información proporcionada, hemos identificado que tu negocio tiene un nivel de riesgo ${riskLevel}.`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "risk-msg-2",
          content: `Esto significa que tu negocio podría verse afectado por desastres naturales como lluvias intensas 🌧️, deslizamientos ⛰️ o inundaciones 🌊.`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "risk",
      componentProps: {
        level: riskLevel,
        message: `Te recomendamos tomar medidas preventivas para proteger tu negocio y evitar pérdidas económicas.`,
      },
      quickReplies: [
        { label: "Ver medidas preventivas", value: "preventive-measures" },
        { label: "No estoy de acuerdo", value: "disagree" },
      ],
    },
    {
      id: "preventive-measures-1",
      messages: [
        {
          id: "measures-msg-1",
          content: `Para ayudarte a proteger tu negocio, te brindamos las siguientes recomendaciones:`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "roadmap",
      componentProps: [
        {
          id: "course-1",
          title: "Elabora un plan de contingencia",
          description: "Aprende a crear un plan para enfrentar emergencias y proteger tu negocio.",
          status: "available",
          progress: 75,
          topics: [
            "Identificación de riesgos",
            "Establecimiento de prioridades",
            "Asignación de recursos",
          ],
          benefits: [
            "Reducción de pérdidas económicas",
            "Continuidad del negocio",
            "Protección de empleados y clientes",
          ],
          duration: "2 horas",
          url: "https://www.google.com",
        },
        {
          id: "course-2",
          title: "Asegura tu negocio contra desastres",
          description: "Descubre los seguros que te ayudarán a proteger tu patrimonio en caso de emergencias.",
          status: "available",
          unlockCost: 50,
          topics: [
            "Tipos de seguros",
            "Coberturas",
            "Costos",
          ],
          benefits: [
            "Protección financiera",
            "Tranquilidad",
            "Recuperación rápida",
          ],
          duration: "1.5 horas",
          url: "https://www.youtube.com",
        },
        {
          id: "course-3",
          title: "Invierte en infraestructura resiliente",
          description: "Conoce las mejoras que puedes realizar en tu local para hacerlo más resistente a los desastres.",
          status: "locked",
          unlockCost: 75,
          topics: [
            "Reforzamiento estructural",
            "Sistemas de alerta temprana",
            "Ubicación segura",
          ],
          benefits: [
            "Mayor seguridad",
            "Menor riesgo de daños",
            "Aumento del valor del inmueble",
          ],
          duration: "3 horas",
          url: "https://www.facebook.com",
        },
      ],
      quickReplies: [
        { label: "Quiero saber más", value: "more-info" },
        { label: "Ya estoy preparado", value: "ready" },
      ],
    },
    {
      id: "ready-confirmation-1",
      messages: [
        {
          id: "ready-msg-1",
          content: `¡Excelente! Me alegra saber que estás preparado. Para confirmar que has tomado las medidas necesarias, necesito que ingreses el código de seguridad que te enviamos por SMS.`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "ready-msg-2",
          content: `Por favor, ingresa el código de 4 dígitos:`,
          type: "received",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "damage-assessment-1",
      messages: [
        {
          id: "damage-msg-1",
          content: `Lamentablemente, hemos detectado que tu negocio ha sido afectado por las recientes lluvias. 🌧️`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "damage-msg-2",
          content: `¿Te gustaría que te ayudemos a evaluar los daños y acceder a los recursos disponibles?`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, necesito ayuda", value: "need-help" },
        { label: "No, gracias", value: "no-help" },
      ],
    },
    {
      id: "reward-1",
      messages: [
        {
          id: "reward-msg-1",
          content: `¡Felicitaciones! 🎉 Has completado el proceso de evaluación de riesgos y has tomado medidas para proteger tu negocio.`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "reward",
      componentProps: {
        achievement: "¡Negocio resiliente!",
        coins: 100,
      },
      quickReplies: [
        { label: "Ver mi puntaje", value: "view-score" },
        { label: "Compartir", value: "share" },
      ],
    },
    {
      id: "testimonial-1",
      messages: [
        {
          id: "testimonial-msg-1",
          content: `Nos encanta saber que estás protegiendo tu negocio. ¿Te gustaría compartir tu experiencia con otros emprendedores?`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "testimonial",
      componentProps: {
        name: "Lizet Rojas Corman",
        business: "Bodega De Liz",
        location: "Barranca, Lima",
        quote: "Gracias a Kututu, ahora me siento más segura y preparada para enfrentar cualquier emergencia.",
        imageSrc: "https://images.unsplash.com/photo-1552058544-f2b08422aa96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      },
      quickReplies: [
        { label: "Compartir mi experiencia", value: "share-experience" },
        { label: "No, gracias", value: "no-share" },
      ],
    },
    {
      id: "final-1",
      messages: [
        {
          id: "final-msg-1",
          content: `¡Gracias por confiar en Kututu! 😊`,
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "final-msg-2",
          content: `Esperamos que esta herramienta te sea de gran utilidad para proteger tu negocio. ¡Hasta la próxima!`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Volver a empezar", value: "restart" },
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
    const section = conversationFlow[currentSectionIndex];
    if (section) {
      setSections(prev => [...prev, section]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (waitingForReadyConfirmation) {
      if (currentMessage === expectedPin) {
        setSections(prev => [...prev, {
          id: `pin-confirmation-${Date.now()}`,
          messages: [
            {
              id: `pin-msg-1-${Date.now()}`,
              content: `¡Código correcto! Gracias por confirmar tu identidad.`,
              type: "received",
              timestamp: new Date(),
              showAvatar: true,
            },
          ],
        }]);
        setCuyCoins(prev => prev + 50);
        setShowReward(true);
        setTimeout(() => {
          setShowReward(false);
        }, 3000);
        setCurrentSectionIndex(conversationFlow.findIndex(section => section.id === "reward-1"));
        setWaitingForReadyConfirmation(false);
      } else {
        setSections(prev => [...prev, {
          id: `pin-error-${Date.now()}`,
          messages: [
            {
              id: `pin-msg-1-${Date.now()}`,
              content: `Código incorrecto. Por favor, inténtalo de nuevo.`,
              type: "received",
              timestamp: new Date(),
              showAvatar: true,
            },
          ],
        }]);
      }
      setCurrentMessage("");
      return;
    }

    setSections(prev => [...prev, {
      id: `user-msg-${Date.now()}`,
      messages: [
        {
          id: `user-msg-1-${Date.now()}`,
          content: currentMessage,
          type: "sent",
          timestamp: new Date(),
        },
      ],
    }]);
    setCurrentMessage("");
  };

  const handleQuickReply = (value: string) => {
    setSections(prev => [...prev, {
      id: `quick-reply-${Date.now()}`,
      messages: [
        {
          id: `quick-reply-msg-1-${Date.now()}`,
          content: conversationFlow[currentSectionIndex].quickReplies?.find(reply => reply.value === value)?.label || value,
          type: "sent",
          timestamp: new Date(),
        },
      ],
    }]);

    if (value === "start") {
      setCurrentSectionIndex(conversationFlow.findIndex(section => section.id === "data-confirmation-1"));
    } else if (value === "info") {
      setCurrentSectionIndex(conversationFlow.findIndex(section => section.id === "info-1"));
    } else if (value === "correct-info") {
      setCurrentSectionIndex(conversationFlow.findIndex(section => section.id === "risk-assessment-1"));
    } else if (value === "incorrect-info") {
      // TODO: Implement logic to correct info
    } else if (value === "preventive-measures") {
      setCurrentSectionIndex(conversationFlow.findIndex(section => section.id === "preventive-measures-1"));
    } else if (value === "more-info") {
      // TODO: Implement logic to show more info
    } else if (value === "ready") {
      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      setExpectedPin(pin);
      setWaitingForReadyConfirmation(true);
      setSections(prev => [...prev, {
        id: `pin-request-${Date.now()}`,
        messages: [
          {
            id: `pin-msg-1-${Date.now()}`,
            content: `Te hemos enviado un código de seguridad por SMS. Por favor, ingresa el código para confirmar que estás preparado.`,
            type: "received",
            timestamp: new Date(),
            showAvatar: true,
          },
        ],
      }]);
    } else if (value === "need-help") {
      // TODO: Implement logic to help with damage assessment
    } else if (value === "no-help") {
      // TODO: Implement logic to continue without help
    } else if (value === "view-score") {
      // TODO: Implement logic to view score
    } else if (value === "share") {
      // TODO: Implement logic to share
    } else if (value === "share-experience") {
      // TODO: Implement logic to share experience
    } else if (value === "no-share") {
      // TODO: Implement logic to continue without sharing
    } else if (value === "restart") {
      setCurrentSectionIndex(0);
      setSections([]);
    } else if (value === "start-course") {
      window.open(currentCourse, "_blank");
    } else if (value === "back") {
      setCurrentSectionIndex(conversationFlow.findIndex(section => section.id === "preventive-measures-1"));
    }
  };

  const handleSelectCourse = (courseId: string) => {
    setCurrentCourse(courseId);
    
    // Add a message about the selected course
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
            content: selectedCourse.description || "Descripción del curso no disponible.",
            type: "received",
            timestamp: new Date(),
          }
        ],
        quickReplies: [
          { label: "Comenzar curso", value: "start-course" },
          { label: "Volver atrás", value: "back" }
        ]
      };

      setSections(prev => [...prev, courseSection]);
    }
  };

  const handleStartChat = () => {
    setStarted(true);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {!started ? (
        <WhatsAppList onStartChat={handleStartChat} />
      ) : (
        <>
          {/* Chat header */}
          <div className="bg-whatsapp-green text-white p-3 flex items-center shadow-md">
            <button onClick={() => setStarted(false)} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <CuyAvatar className="w-9 h-9" />
            <div className="ml-3 flex-1">
              <h2 className="font-semibold">Kututu BCP</h2>
              <p className="text-xs opacity-90">Asistente virtual</p>
            </div>
            <button>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto p-4 bg-chat-background bg-opacity-30">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="mb-4">
                {section.messages.map((message, messageIndex) => (
                  <ChatMessage
                    key={message.id}
                    id={message.id}
                    content={message.content}
                    type={message.type}
                    timestamp={message.timestamp}
                    hasEmoji={message.hasEmoji}
                    hasImage={message.hasImage}
                    showAvatar={message.showAvatar}
                    isTyping={message.isTyping}
                    isPin={message.isPin}
                  />
                ))}

                {section.component === "progress" && section.componentProps && (
                  <div className="my-4 mx-auto max-w-xs">
                    <ProgressIndicator 
                      steps={section.componentProps.steps} 
                      currentStep={section.componentProps.currentStep} 
                      labels={section.componentProps.labels} 
                    />
                  </div>
                )}

                {section.component === "risk" && section.componentProps && (
                  <div className="my-4 mx-auto">
                    <RiskIndicator 
                      level={section.componentProps.level} 
                      message={section.componentProps.message} 
                    />
                  </div>
                )}

                {section.component === "reward" && section.componentProps && (
                  <div className="my-4 flex justify-center">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center max-w-xs">
                      <h4 className="font-medium text-yellow-800">{section.componentProps.achievement}</h4>
                      <div className="flex justify-center items-center my-2">
                        <CuyCoins count={section.componentProps.coins} size="lg" />
                      </div>
                      <p className="text-sm text-yellow-700">¡Felicidades! Has ganado puntos de resiliencia</p>
                    </div>
                  </div>
                )}

                {section.component === "testimonial" && section.componentProps && (
                  <div className="my-4">
                    <TestimonialCard 
                      name={section.componentProps.name}
                      business={section.componentProps.business}
                      location={section.componentProps.location}
                      quote={section.componentProps.quote}
                      imageSrc={section.componentProps.imageSrc}
                    />
                  </div>
                )}

                {section.component === "roadmap" && section.componentProps && (
                  <div className="my-4">
                    <CoursesRoadmap 
                      courses={section.componentProps} 
                      onSelectCourse={handleSelectCourse} 
                    />
                  </div>
                )}

                {sectionIndex === sections.length - 1 && section.quickReplies && (
                  <div className="mt-2">
                    <QuickReply
                      options={section.quickReplies}
                      onSelect={handleQuickReply}
                      className="flex flex-wrap justify-center"
                    />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <ChatMessage
                id={`typing-${Date.now()}`}
                content=""
                type="received"
                timestamp={new Date()}
                isTyping={true}
              />
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-white p-2 flex items-center border-t border-gray-200">
            <button className="p-2 text-gray-500">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            {currentMessage ? (
              <button className="p-2 text-whatsapp-green" onClick={handleSendMessage}>
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="p-2 text-gray-500">
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Cuy coins display */}
          <div className={cn(
            "fixed top-4 right-4 transition-all duration-300 transform",
            showReward ? "scale-125" : "scale-100"
          )}>
            <CuyCoins count={cuyCoins} size="md" />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInterface;
