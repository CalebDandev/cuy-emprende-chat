
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
  const [userName, setUserName] = useState("Caleb"); // Default name
  const [businessType, setBusinessType] = useState("Restaurante"); // Default business type
  const [businessLocation, setBusinessLocation] = useState("Lima Norte"); // Default location
  const [correctInfo, setCorrectInfo] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Conversación ampliada con los nuevos flujos
  const conversationFlow: ConversationSection[] = [
    {
      id: "intro",
      messages: [
        {
          id: "intro-1",
          content: "¡Hola Caleb! Soy Cuy, el asistente virtual de Contigo Emprendedor BCP 👋",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "intro-2",
          content: "Estoy aquí para ayudarte a crear un plan de contingencia para tu negocio y así estar preparado ante cualquier emergencia o desastre que pueda afectar tu emprendimiento.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "intro-3",
          content: "Si deseas conocer más sobre la iniciativa Contigo Emprendedor o nuestro Mercado Solidario BCP, puedes visitar: https://www.viabcp.com/contigoemprendedor",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "intro-4",
          content: "Según nuestros registros, tienes un Restaurante ubicado en Lima Norte. ¿Es correcta esta información?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, es correcto", value: "correct" },
        { label: "No, es incorrecta", value: "incorrect" },
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
        { label: "Tienda / Bodega", value: "retail" },
        { label: "Restaurante", value: "restaurant" },
        { label: "Servicios", value: "services" },
        { label: "Manufactura", value: "manufacturing" },
        { label: "Otro", value: "other" },
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
        { label: "Lima Centro", value: "lima-center" },
        { label: "Lima Norte", value: "lima-north" },
        { label: "Lima Sur", value: "lima-south" },
        { label: "Lima Este", value: "lima-east" },
        { label: "Callao", value: "callao" },
        { label: "Otra región", value: "other-region" },
      ],
    },
    {
      id: "success-story",
      messages: [
        {
          id: "story-1",
          content: "¡Perfecto! Antes de comenzar, me gustaría compartir contigo la historia de Carmen, una emprendedora como tú.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "testimonial",
      componentProps: {
        name: "Carmen Rodríguez",
        business: "Restaurante 'El Buen Sabor'",
        location: "Villa El Salvador",
        quote: "Gracias al plan de contingencia que armé con Cuy, pude recuperar mi negocio en solo 2 semanas después de las inundaciones. ¡Ahora tengo todo respaldado y mi negocio está más seguro que nunca!",
        imageSrc: "https://randomuser.me/api/portraits/women/42.jpg"
      },
    },
    {
      id: "awareness",
      messages: [
        {
          id: "awareness-1",
          content: "¿Sabías que el 40% de los negocios no logra recuperarse tras un desastre natural? 😱",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "awareness-2",
          content: "¡Pero no te preocupes! Estoy aquí para ayudarte a preparar tu negocio y hacerlo más resistente 💪",
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
        { label: "¿En qué consiste?", value: "more-info" },
        { label: "Ahora no puedo", value: "later" },
      ],
    },
    {
      id: "staff-info",
      messages: [
        {
          id: "staff-1",
          content: "Genial, vamos a entender mejor tu negocio. ¿Tienes trabajadores o gestionas todo tú solo?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Solo yo", value: "solo" },
        { label: "1-3 trabajadores", value: "small-team" },
        { label: "4-10 trabajadores", value: "medium-team" },
        { label: "Más de 10", value: "large-team" },
      ],
    },
    {
      id: "insurance-info",
      messages: [
        {
          id: "insurance-1",
          content: "¿Cuentas con algún seguro o respaldo financiero para tu negocio?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Sí, tengo seguro", value: "has-insurance" },
        { label: "Solo ahorros", value: "savings-only" },
        { label: "No tengo respaldo", value: "no-backup" },
        { label: "No estoy seguro", value: "not-sure" },
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
      id: "emergency-contacts",
      messages: [
        {
          id: "emergency-1",
          content: "¿Tienes una lista actualizada de contactos de emergencia (proveedores clave, servicios de emergencia, etc.)?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Sí, completa", value: "yes-full" },
        { label: "Algunos contactos", value: "partial" },
        { label: "No tengo lista", value: "no" },
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
          content: "Tu nivel de riesgo actual es:",
          type: "received",
          timestamp: new Date(),
        },
      ],
      component: "risk",
      componentProps: {
        level: "medium",
        message: "Riesgo medio. ¡Aún estás a tiempo de mejorar tu plan!",
      },
    },
    {
      id: "progress-indicator",
      messages: [
        {
          id: "progress-1",
          content: "Tu nivel de preparación actual es:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
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
      id: "second-challenge",
      messages: [
        {
          id: "second-challenge-1",
          content: "También te recomiendo este importante reto:",
          type: "received",
          timestamp: new Date(),
          showAvatar: false,
        },
      ],
      component: "challenge",
      challenge: {
        id: "emergency-contacts",
        title: "Lista de contactos de emergencia",
        description: "Registra 5 contactos clave: proveedor principal, servicio técnico, emergencias médicas, bomberos y un contacto alternativo.",
        status: "not-started",
        reward: 15,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        priority: "high",
      },
    },
    {
      id: "third-challenge",
      messages: [
        {
          id: "third-challenge-1",
          content: "Y finalmente, para complementar tu plan básico:",
          type: "received",
          timestamp: new Date(),
          showAvatar: false,
        },
      ],
      component: "challenge",
      challenge: {
        id: "emergency-kit",
        title: "Armar mochila de emergencia",
        description: "Prepara una mochila con linterna, botiquín básico, agua, radio a pilas y documentos importantes.",
        status: "not-started",
        reward: 20,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        priority: "medium",
      },
    },
    {
      id: "accept-challenge",
      messages: [
        {
          id: "accept-1",
          content: "¿Te animas a completar estos desafíos? Recuerda que ganarás Monedas Cuy por cada uno que completes.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
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
          content: "¡Excelente decisión! Cuando completes estos desafíos, ganarás Monedas Cuy que podrás usar para desbloquear cursos y recursos exclusivos.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "accepted-2",
          content: "Te enviaré recordatorios amigables para ayudarte a completarlos. ¿Puedo mostrarte qué podrás hacer con tus Monedas Cuy?",
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
          title: "Contactos de Emergencia",
          description: "Organiza tus contactos clave para momentos críticos",
          status: "locked",
          unlockCost: 15,
        },
        {
          id: "course-4",
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
      id: "weather-alert",
      messages: [
        {
          id: "weather-1",
          content: "🚨 ALERTA: Se pronostica lluvia intensa en tu zona para esta semana. Te recomiendo revisar tu inventario y protegerlo adecuadamente.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "weather-2",
          content: "¿Necesitas consejos sobre cómo proteger tu negocio?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, por favor", value: "yes-advice" },
        { label: "Ya estoy preparado", value: "already-prepared" },
        { label: "No aplica a mi negocio", value: "not-applicable" },
      ],
    },
    {
      id: "contingency-plan-retail",
      messages: [
        {
          id: "contingency-retail-1",
          content: "PLAN DE CONTINGENCIA PARA TIENDA/BODEGA:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "contingency-retail-2",
          content: "1️⃣ Eleva tus productos al menos 30cm del suelo usando estantes o pallets",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-retail-3",
          content: "2️⃣ Protege con plástico impermeable los productos sensibles al agua",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-retail-4",
          content: "3️⃣ Asegura tu sistema de cobro y respaldo digital en un lugar alto y seco",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-retail-5",
          content: "4️⃣ Ten a la mano el contacto de tus proveedores principales para reponer inventario rápidamente",
          type: "received",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "contingency-plan-restaurant",
      messages: [
        {
          id: "contingency-restaurant-1",
          content: "PLAN DE CONTINGENCIA PARA RESTAURANTE:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "contingency-restaurant-2",
          content: "1️⃣ Almacena los alimentos perecibles en contenedores herméticos y elevados",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-3",
          content: "2️⃣ Verifica las instalaciones eléctricas y protege equipos de cocina",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-4",
          content: "3️⃣ Prepara un menú alternativo que requiera menos ingredientes frescos",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-5",
          content: "4️⃣ Asegura un sistema alternativo para calentar alimentos en caso de corte eléctrico",
          type: "received",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "contingency-plan-services",
      messages: [
        {
          id: "contingency-services-1",
          content: "PLAN DE CONTINGENCIA PARA SERVICIOS:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "contingency-services-2",
          content: "1️⃣ Respalda todos tus archivos y documentos digitales en la nube",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-services-3",
          content: "2️⃣ Prepara un sistema para trabajar remotamente si no puedes acceder a tu local",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-services-4",
          content: "3️⃣ Ten un banco de baterías o generador para mantener tus equipos funcionando",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-services-5",
          content: "4️⃣ Comunica a tus clientes por anticipado posibles retrasos o cambios en la entrega",
          type: "received",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "contingency-plan-manufacturing",
      messages: [
        {
          id: "contingency-manufacturing-1",
          content: "PLAN DE CONTINGENCIA PARA MANUFACTURA:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "contingency-manufacturing-2",
          content: "1️⃣ Protege tu maquinaria con cubiertas impermeables y elévala si es posible",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-manufacturing-3",
          content: "2️⃣ Almacena materias primas en contenedores sellados y en altura",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-manufacturing-4",
          content: "3️⃣ Identifica proveedores alternativos para tus insumos principales",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-manufacturing-5",
          content: "4️⃣ Adelanta producción de productos clave si se acerca la temporada de lluvias",
          type: "received",
          timestamp: new Date(),
        },
      ],
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
      
      // Si esta sección da una recompensa, actualizar monedas
      if (currentSection.component === "reward" && currentSection.componentProps?.coins) {
        setCuyCoins(prev => prev + currentSection.componentProps.coins);
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
      }

      // Si esta sección establece el nivel de riesgo
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
      // Añadir este mensaje a la sección actual
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          messages: [...updated[updated.length - 1].messages, newMessage],
        };
      } else {
        // Si no hay secciones aún, crear una
        updated.push({
          id: "user-input",
          messages: [newMessage],
        });
      }
      return updated;
    });

    setCurrentMessage("");
    
    // Avanzar a la siguiente sección
    setTimeout(() => {
      setCurrentSectionIndex(prev => prev + 1);
    }, 500);
  };

  const handleQuickReply = (value: string) => {
    // Crear un mensaje a partir de la respuesta rápida seleccionada
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
        // Añadir esta respuesta rápida como un mensaje enviado
        const updated = [...prev];
        if (updated.length > 0) {
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            messages: [...updated[updated.length - 1].messages, newMessage],
            quickReplies: undefined, // Eliminar las respuestas rápidas después de la selección
          };
        }
        return updated;
      });

      // Manejar la confirmación de información del negocio
      if (currentSectionIndex === 0) {
        if (value === "correct") {
          setCorrectInfo(true);
          // Si es correcta, avanzamos al paso de la historia de éxito
          setTimeout(() => {
            setCurrentSectionIndex(3);
          }, 500);
          return;
        } else if (value === "incorrect") {
          setCorrectInfo(false);
          // Si es incorrecta, avanzamos al paso para corregir el tipo de negocio
          setTimeout(() => {
            setCurrentSectionIndex(1);
          }, 500);
          return;
        }
      }

      // Manejar el tipo de negocio en caso de información incorrecta
      if (currentSectionIndex === 1 && !correctInfo) {
        setBusinessType(quickReplyOption.label);
      }

      // Manejar la ubicación del negocio en caso de información incorrecta
      if (currentSectionIndex === 2 && !correctInfo) {
        setBusinessLocation(quickReplyOption.label);
      }

      // Lógica especial para el plan de contingencia según el tipo de negocio
      if (currentSectionIndex === 20 && value === "yes-advice") {
        // Ajustar el índice de la siguiente sección basado en el tipo de negocio
        if (businessType === "Tienda / Bodega") {
          setTimeout(() => {
            setCurrentSectionIndex(21); // índice de contingency-plan-retail
          }, 500);
          return;
        } else if (businessType === "Restaurante") {
          setTimeout(() => {
            setCurrentSectionIndex(22); // índice de contingency-plan-restaurant
          }, 500);
          return;
        } else if (businessType === "Servicios") {
          setTimeout(() => {
            setCurrentSectionIndex(23); // índice de contingency-plan-services
          }, 500);
          return;
        } else if (businessType === "Manufactura") {
          setTimeout(() => {
            setCurrentSectionIndex(24); // índice de contingency-plan-manufacturing
          }, 500);
          return;
        }
      }

      // Avanzar a la siguiente sección (comportamiento normal)
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    // En una app real, esto navegaría a los detalles del curso
    console.log("Curso seleccionado:", courseId);
  };

  const handleSelectChallenge = (challengeId: string) => {
    // En una app real, esto mostraría los detalles del desafío
    console.log("Desafío seleccionado:", challengeId);
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

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-whatsapp-bg">
      {/* Header */}
      <div className="bg-whatsapp-header text-white px-4 py-3 flex items-center justify-between shadow-md">
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
      <div className="bg-whatsapp-input-bg p-2 px-4 flex items-center border-t border-gray-300">
        <button className="text-gray-600 mr-2">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder={userName ? `Escribe un mensaje, ${userName}...` : "Escribe un mensaje..."}
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
          <button className="ml-2 text-gray-600">
            <Mic className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
