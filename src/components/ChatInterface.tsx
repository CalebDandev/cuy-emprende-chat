
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
          content: `Según nuestros registros, tienes ${businessName}, un ${businessType} ubicado en ${businessLocation}. ¿Es correcta esta información? ✅`,
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, es correcto", value: "correct" },
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
    {
      id: "question-employees",
      messages: [
        {
          id: "employees-1",
          content: "¡Excelente decisión! 👏 Para crear un plan efectivo, necesito hacerte algunas preguntas sobre tu negocio.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "employees-2",
          content: "¿Cuántos empleados trabajan contigo en Bodega De Liz?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Solo yo", value: "solo" },
        { label: "2-5 empleados", value: "small" },
        { label: "6-10 empleados", value: "medium" },
        { label: "Más de 10", value: "large" },
      ],
    },
    {
      id: "question-risk-assessment",
      messages: [
        {
          id: "risk-1",
          content: "¡Entendido! 📝 Ahora, sobre los riesgos que podrían afectar tu negocio...",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "risk-2",
          content: "¿Cuál consideras que es el mayor riesgo para tu bodega de vinos?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sismos o terremotos", value: "earthquake" },
        { label: "Inundaciones", value: "flood" },
        { label: "Incendios", value: "fire" },
        { label: "Cortes de energía", value: "power" },
      ],
    },
    {
      id: "question-equipment",
      messages: [
        {
          id: "equipment-1",
          content: "Es importante estar preparado para esos eventos. 🔍",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "equipment-2",
          content: "¿Cuentas con algún equipo o sistema para mitigar daños en caso de emergencia?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, tengo extintores y botiquín", value: "basic" },
        { label: "Solo tengo lo básico", value: "very-basic" },
        { label: "No tengo nada aún", value: "none" },
      ],
    },
    {
      id: "risk-evaluation",
      messages: [
        {
          id: "evaluation-1",
          content: "Gracias por toda la información, Lizet. ⚙️",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "evaluation-2",
          content: "Estoy evaluando el nivel de riesgo actual de tu bodega...",
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "risk",
      componentProps: {
        level: "medium",
        message: "Tu bodega tiene un nivel medio de vulnerabilidad. Con algunas medidas adicionales, podrías reducir significativamente los riesgos."
      },
      quickReplies: [
        { label: "Ver mi plan de contingencia", value: "see-plan" },
      ],
    },
    {
      id: "contingency-plan",
      messages: [
        {
          id: "plan-1",
          content: "He creado un plan de contingencia específico para Bodega De Liz: 📋",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "plan-2",
          content: "1️⃣ **Protección de barricas**: Instala soportes antisísmicos para tus barricas y estanterías, reduciendo el riesgo de caídas.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "plan-3",
          content: "2️⃣ **Sistema de respaldo energético**: Adquiere un generador para mantener la temperatura controlada en caso de cortes de energía.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "plan-4",
          content: "3️⃣ **Plan de evacuación**: Establece y practica con tu equipo rutas de evacuación seguras, designando zonas de encuentro.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "plan-5",
          content: "4️⃣ **Digitalización de registros**: Mantén copias digitales de tus fórmulas, procesos y registros de inventario en la nube.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "plan-6",
          content: "¿Te gustaría conocer los cursos disponibles para implementar mejor este plan? 🎓",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Ver cursos recomendados", value: "courses" },
      ],
    },
    {
      id: "courses-roadmap",
      messages: [
        {
          id: "courses-1",
          content: "¡Excelente decisión! La formación continua fortalecerá tu negocio. 📚",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "courses-2",
          content: "Aquí tienes una ruta de aprendizaje personalizada para Bodega De Liz:",
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "roadmap",
      componentProps: [
        {
          id: "course-1",
          title: "Gestión de riesgos para bodegas",
          description: "Fundamentos básicos para identificar y mitigar riesgos en tu bodega",
          status: "available",
          progress: 0
        },
        {
          id: "course-2",
          title: "Protección de activos vitivinícolas",
          description: "Aprende a proteger tus productos y equipos especializados",
          status: "locked",
          unlockCost: 50
        },
        {
          id: "course-3",
          title: "Plan de continuidad de negocio",
          description: "Estrategias avanzadas para mantener el negocio operativo tras emergencias",
          status: "locked",
          unlockCost: 75
        }
      ],
      quickReplies: [
        { label: "Conocer desafíos disponibles", value: "challenges" },
      ],
    },
    {
      id: "challenges-intro",
      messages: [
        {
          id: "challenges-1",
          content: "Además de los cursos, tenemos desafíos prácticos que te ayudarán a preparar mejor tu negocio. 🏆",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "challenges-2",
          content: "Al completarlos, ganarás Soles de Resiliencia que podrás canjear por beneficios como:",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "challenges-3",
          content: "• Descuentos en seguros para tu negocio 💰\n• Acceso a cursos premium 🔓\n• Asesorías personalizadas con expertos 👨‍💼\n• Herramientas digitales para tu negocio 🛠️",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "challenges-4",
          content: "Estos son los desafíos disponibles para ti:",
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "challenges",
      componentProps: [
        {
          id: "challenge-1",
          title: "Plan de evacuación",
          description: "Crea y documenta un plan de evacuación para tu bodega con rutas señalizadas",
          status: "not-started",
          reward: 25,
          dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
          priority: "high",
          businessType: "Negocio de elaboración y venta de vinos y destilados"
        },
        {
          id: "challenge-2",
          title: "Inventario asegurado",
          description: "Registra tu inventario completo y comparte copia en la nube",
          status: "not-started",
          reward: 15,
          priority: "medium",
          businessType: "Negocio de elaboración y venta de vinos y destilados"
        },
        {
          id: "challenge-3",
          title: "Soportes antisísmicos",
          description: "Instala soportes para tus barricas y estanterías y comparte fotos",
          status: "not-started",
          reward: 30,
          priority: "high",
          businessType: "Negocio de elaboración y venta de vinos y destilados"
        }
      ],
      quickReplies: [
        { label: "¡Gracias por la información!", value: "thanks" },
      ],
    },
    {
      id: "closing",
      messages: [
        {
          id: "closing-1",
          content: "¡Con gusto, Lizet! 😊 Estoy aquí para apoyarte en el camino hacia un negocio más resiliente.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "closing-2",
          content: "Recuerda que puedes volver a consultarme cuando lo necesites para revisar tu plan de contingencia o acceder a nuevos desafíos y cursos.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "closing-3",
          content: "¡Te deseo mucho éxito con Bodega De Liz! 🍷",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Finalizar conversación", value: "end" },
      ],
    }
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
          setCurrentSectionIndex(currentSectionIndex + 1);
        }, 500);
      } else {
        setVerifyingPin(false);
        setTimeout(() => {
          // Handle incorrect PIN
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
        setCurrentSectionIndex(currentSectionIndex + 1);
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
        setCurrentSectionIndex(currentSectionIndex + 1);
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

      // If the user selects "end" in the closing section, go back to WhatsApp list
      if (value === "end" && currentSectionIndex === conversationFlow.length - 1) {
        setTimeout(() => {
          setStarted(false);
          setSections([]);
          setCurrentSectionIndex(0);
        }, 1000);
        return;
      }

      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handleSelectChallenge = (challengeId: string) => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setExpectedPin(pin);
    setCurrentChallenge(challengeId);
    
    // Add a message about the selected challenge
    const selectedChallenge = conversationFlow.find(section => 
      section.component === "challenges")?.componentProps.find(
        (c: Challenge) => c.id === challengeId
      );
    
    if (selectedChallenge) {
      const challengeSection: ConversationSection = {
        id: `selected-challenge-${Date.now()}`,
        messages: [
          {
            id: `challenge-msg-1-${Date.now()}`,
            content: `Has seleccionado el desafío: "${selectedChallenge.title}" 🎯`,
            type: "received",
            timestamp: new Date(),
            showAvatar: true,
          },
          {
            id: `challenge-msg-2-${Date.now()}`,
            content: "Puedes acceder a los detalles completos a través de este enlace:",
            type: "received",
            timestamp: new Date(),
          }
        ],
        quickReplies: [
          { label: "Ver más desafíos", value: "more-challenges" }
        ]
      };
      
      setSections(prev => [...prev, challengeSection]);
      
      setTimeout(() => {
        const linkSection: ConversationSection = {
          id: `challenge-link-${Date.now()}`,
          messages: [],
          component: "challenge",
          challenge: selectedChallenge,
        };
        
        setSections(prev => [...prev, linkSection]);
      }, 500);
    }
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
    const courseSection: ConversationSection = {
      id: `selected-course-${Date.now()}`,
      messages: [
        {
          id: `course-msg-${Date.now()}`,
          content: "¡Gran elección! Este curso te ayudará a desarrollar habilidades clave para la gestión de riesgos en tu negocio. 📚",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        }
      ],
      quickReplies: [
        { label: "Volver a cursos", value: "back-to-courses" }
      ]
    };
    
    setSections(prev => [...prev, courseSection]);
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
              // Show a message asking for the PIN
              const pinSection: ConversationSection = {
                id: `pin-request-${Date.now()}`,
                messages: [
                  {
                    id: `pin-msg-${Date.now()}`,
                    content: "Por favor, ingresa el PIN de verificación para confirmar que has completado el desafío:",
                    type: "received",
                    timestamp: new Date(),
                    showAvatar: true,
                  }
                ]
              };
              setSections(prev => [...prev, pinSection]);
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
             section.component === "challenge" && 
             section.challenge && (
              renderChallengeLink(section.challenge.id)
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
