
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
  const [verifyingPin, setVerifyingPin] = useState(false);
  const [expectedPin, setExpectedPin] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [waitingForReadyConfirmation, setWaitingForReadyConfirmation] = useState(false);
  const [damageAssessment, setDamageAssessment] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Conversation flow
  const conversationFlow: ConversationSection[] = [
    {
      id: "intro",
      messages: [
        {
          id: "intro-1",
          content: `¡Hola ${userName}! Soy Cuy, el asistente virtual de Contigo Emprendedor BCP 👋`,
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
          content: `Según nuestros registros, tienes un ${businessType} ubicado en ${businessLocation}. ¿Es correcta esta información?`,
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
      id: "plan-explanation",
      messages: [
        {
          id: "explanation-1",
          content: "Un plan de contingencia es una estrategia que te ayuda a prepararte para situaciones de emergencia y minimizar su impacto en tu negocio.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "explanation-2",
          content: "Incluye la identificación de riesgos específicos para tu tipo de negocio, protocolos de acción ante emergencias, resguardo de información crítica, y estrategias para mantener operaciones básicas durante una crisis.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "explanation-3",
          content: "¡Lo mejor es que te guiaré paso a paso con desafíos simples que podrás completar gradualmente!",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "explanation-4",
          content: "¿Te gustaría empezar ahora?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "¡Vamos a empezar! 💪", value: "start-now" },
        { label: "Ahora no puedo", value: "later" },
      ],
    },
    {
      id: "waiting-for-ready",
      messages: [
        {
          id: "waiting-1",
          content: "Entiendo que ahora no puedas. Cuando estés listo, solo escribe \"Estoy listo\" y continuaremos con tu plan de contingencia.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
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
      id: "backup-data",
      messages: [
        {
          id: "backup-1",
          content: "¿Con qué frecuencia respaldas la información importante de tu negocio (ventas, clientes, inventario)?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Diariamente", value: "daily" },
        { label: "Semanalmente", value: "weekly" },
        { label: "Ocasionalmente", value: "occasionally" },
        { label: "Nunca", value: "never" },
      ],
    },
    {
      id: "equipment-protection",
      messages: [
        {
          id: "equipment-1",
          content: "¿Tienes medidas para proteger equipos e infraestructura crítica en caso de emergencias (elevadores, protección contra agua, etc.)?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Sí, completas", value: "yes-full" },
        { label: "Algunas medidas", value: "partial" },
        { label: "No tengo medidas", value: "no" },
      ],
    },
    {
      id: "recovery-plan",
      messages: [
        {
          id: "recovery-1",
          content: "¿Has pensado en cómo seguirías operando si tu local sufre daños graves?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Tengo plan alternativo", value: "yes-full" },
        { label: "Lo he considerado", value: "partial" },
        { label: "No he pensado en ello", value: "no" },
      ],
    },
    {
      id: "evaluation-results",
      messages: [
        {
          id: "eval-1",
          content: "¡Gracias por tus respuestas! Basado en ellas, he preparado un diagnóstico de tu preparación ante emergencias.",
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
      id: "challenges",
      messages: [
        {
          id: "challenges-1",
          content: "Para ayudarte a mejorar tu preparación, te propongo estos desafíos importantes:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      component: "challenges",
      challenges: [
        // Restaurante desafíos
        {
          id: "restaurant-inventory",
          title: "Inventario digital de insumos críticos",
          description: "Registra tus 10 insumos/productos más importantes incluyendo proveedor, cantidad mínima requerida y alternativas.",
          status: "not-started",
          reward: 25,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Restaurante",
        },
        {
          id: "restaurant-emergency-kit",
          title: "Kit de emergencia para restaurante",
          description: "Prepara un kit con extintor, botiquín, linternas, radio y protocolos básicos de evacuación para clientes.",
          status: "not-started",
          reward: 20,
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          priority: "medium",
          businessType: "Restaurante",
        },
        {
          id: "restaurant-contacts",
          title: "Red de emergencia gastronómica",
          description: "Crea una lista de contactos incluyendo: proveedores alternos, técnicos para equipos de refrigeración y socios potenciales para uso compartido de cocina.",
          status: "not-started",
          reward: 15,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Restaurante",
        },
        
        // Retail desafíos
        {
          id: "retail-inventory",
          title: "Inventario digital prioritario",
          description: "Registra tus 20 productos de mayor rotación y margen con fotos, cantidad y ubicación de almacenamiento alternativo.",
          status: "not-started",
          reward: 25,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Tienda / Bodega",
        },
        {
          id: "retail-emergency-kit",
          title: "Kit de protección de mercadería",
          description: "Prepara plásticos impermeables, estantes elevados y un plan de evacuación rápida para productos de alto valor.",
          status: "not-started",
          reward: 20,
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          priority: "medium",
          businessType: "Tienda / Bodega",
        },
        {
          id: "retail-contacts",
          title: "Red de distribución alternativa",
          description: "Crea una lista de contactos incluyendo: proveedores mayoristas alternos, transportistas locales y puntos de venta móviles posibles.",
          status: "not-started",
          reward: 15,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Tienda / Bodega",
        },
        
        // Servicios desafíos
        {
          id: "services-digital-backup",
          title: "Sistema de respaldo en la nube",
          description: "Implementa un sistema de backup automático para todos tus archivos de clientes y documentos importantes.",
          status: "not-started",
          reward: 25,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Servicios",
        },
        {
          id: "services-remote-setup",
          title: "Configuración para trabajo remoto",
          description: "Establece un sistema que permita a tu equipo trabajar desde cualquier ubicación con acceso seguro a sistemas críticos.",
          status: "not-started",
          reward: 20,
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          priority: "medium",
          businessType: "Servicios",
        },
        {
          id: "services-contacts",
          title: "Red de soporte técnico",
          description: "Crea una lista de técnicos y especialistas que puedan restablecer tus sistemas críticos en menos de 24 horas.",
          status: "not-started",
          reward: 15,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Servicios",
        },
        
        // Manufactura desafíos
        {
          id: "manufacturing-equipment",
          title: "Protección de maquinaria crítica",
          description: "Implementa protecciones físicas contra agua y sistemas de elevación para tus máquinas más importantes.",
          status: "not-started",
          reward: 25,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Manufactura",
        },
        {
          id: "manufacturing-materials",
          title: "Almacenamiento seguro de materiales",
          description: "Organiza un sistema de almacenamiento elevado y protegido para tus materias primas más valiosas o difíciles de reponer.",
          status: "not-started",
          reward: 20,
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          priority: "medium",
          businessType: "Manufactura",
        },
        {
          id: "manufacturing-contacts",
          title: "Red de proveedores alternativos",
          description: "Establece relación con al menos dos proveedores alternativos para cada materia prima crítica en tu producción.",
          status: "not-started",
          reward: 15,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "Manufactura",
        },
        
        // General desafíos (para cualquier tipo)
        {
          id: "emergency-contacts",
          title: "Lista de contactos de emergencia",
          description: "Registra 5 contactos clave: proveedor principal, servicio técnico, emergencias médicas, bomberos y un contacto alternativo.",
          status: "not-started",
          reward: 15,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: "high",
          businessType: "general",
        },
      ],
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
        { label: "¡Empezar primer desafío! 💪", value: "start-first" },
        { label: "¿Cómo lo hago?", value: "how-to" },
        { label: "Ahora no puedo", value: "later" },
      ],
    },
    {
      id: "how-to-challenges",
      messages: [
        {
          id: "how-to-1",
          content: "¡Es muy sencillo! Para cada desafío te enviaré un enlace a una página donde podrás completarlo paso a paso.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "how-to-2",
          content: "Al terminar cada desafío, la página te dará un PIN que deberás enviarme para verificar que lo has completado y recibir tus Monedas Cuy.",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "how-to-3",
          content: "¿Listo para comenzar con tu primer desafío?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "¡Vamos! 🚀", value: "start-first" },
        { label: "Más tarde", value: "later" },
      ],
    },
    {
      id: "start-challenge",
      messages: [
        {
          id: "start-1",
          content: "¡Excelente elección! Aquí tienes el enlace para tu primer desafío:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "start-2",
          content: "Haz clic en el enlace para comenzar:",
          type: "received",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "verify-challenge",
      messages: [
        {
          id: "verify-1",
          content: "¿Ya completaste el desafío? Si es así, por favor ingresa el PIN que recibiste al finalizar:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
    },
    {
      id: "incorrect-pin",
      messages: [
        {
          id: "incorrect-pin-1",
          content: "Ese PIN no parece ser correcto. Por favor, revisa el código e inténtalo nuevamente, o completa el desafío si aún no lo has hecho.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
    },
    {
      id: "challenge-completed",
      messages: [
        {
          id: "completed-1",
          content: "¡FELICITACIONES! 🎉 Has completado correctamente el desafío.",
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
        achievement: "¡Desafío completado!",
      },
    },
    {
      id: "weather-alert",
      messages: [
        {
          id: "weather-1",
          content: "🚨 ALERTA: Se pronostica lluvia intensa en Lima Norte para las próximas 48 horas, con acumulación de hasta 35mm de agua. Se esperan posibles inundaciones en zonas bajas.",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "weather-2",
          content: "¿Necesitas consejos específicos sobre cómo proteger tu restaurante ante esta situación?",
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
      id: "contingency-plan-restaurant",
      messages: [
        {
          id: "contingency-restaurant-1",
          content: "PLAN DE CONTINGENCIA PARA TU RESTAURANTE - LLUVIAS INTENSAS:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "contingency-restaurant-2",
          content: "1️⃣ INMEDIATO: Eleva todos los alimentos perecibles al menos 50cm del suelo y usa contenedores herméticos",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-3",
          content: "2️⃣ INMEDIATO: Desconecta equipos eléctricos de cocina en zonas de riesgo y protégelos con plástico impermeable",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-4",
          content: "3️⃣ PRÓXIMAS 24H: Prepara un menú reducido que requiera menos ingredientes y equipos para operar",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-5",
          content: "4️⃣ PRÓXIMAS 24H: Reubica objetos valiosos (POS, documentos, dinero) a zonas altas y secas",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "contingency-restaurant-6",
          content: "5️⃣ EMERGENCIA: Ten listo el contacto de Indeci (115) y Bomberos (116) en caso de inundación grave",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Gracias por la información", value: "thanks" },
        { label: "¿Algo más que deba hacer?", value: "more-info" },
      ],
    },
    {
      id: "more-contingency-info",
      messages: [
        {
          id: "more-info-1",
          content: "Consejos adicionales para tu restaurante:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "more-info-2",
          content: "• Mantén sacos de arena o barreras improvisadas para desviar agua de la entrada principal",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "more-info-3",
          content: "• Comunica a tus proveedores la situación para anticipar posibles retrasos en entregas",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "more-info-4",
          content: "• Si operas con gas, verifica que los balones estén bien elevados y asegurados",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "more-info-5",
          content: "• Informa a tus clientes por redes sociales sobre posibles cambios en horario o servicio",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "more-info-6",
          content: "Te enviaré actualizaciones sobre la situación. ¿Hay algo específico que te preocupe?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Estoy preocupado por...", value: "concerns" },
        { label: "No, gracias", value: "thanks" },
      ],
    },
    {
      id: "after-disaster",
      messages: [
        {
          id: "after-1",
          content: "Hola Caleb, soy Cuy. Han pasado 48 horas desde la alerta por lluvias intensas. ¿Cómo estás? ¿Tu restaurante está bien?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Todo está bien", value: "all-good" },
        { label: "Tenemos algunos daños", value: "some-damage" },
        { label: "Sufrimos daños graves", value: "serious-damage" },
      ],
    },
    {
      id: "damage-assessment",
      messages: [
        {
          id: "damage-1",
          content: "Lamento escuchar eso. Para poder ayudarte mejor, necesito evaluar el impacto. ¿Podrías responder algunas preguntas rápidas?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Sí, adelante", value: "start-assessment" },
        { label: "Ahora no puedo", value: "later" },
      ],
    },
    {
      id: "damage-questions-1",
      messages: [
        {
          id: "damage-q1",
          content: "¿Qué áreas de tu restaurante se han visto afectadas?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Cocina", value: "kitchen" },
        { label: "Área de comensales", value: "dining-area" },
        { label: "Almacén", value: "storage" },
        { label: "Todo el local", value: "all" },
      ],
    },
    {
      id: "damage-questions-2",
      messages: [
        {
          id: "damage-q2",
          content: "¿Qué tipo de daños has sufrido principalmente?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Inundación", value: "flood" },
        { label: "Daños eléctricos", value: "electrical" },
        { label: "Daños estructurales", value: "structural" },
        { label: "Pérdida de inventario", value: "inventory" },
      ],
    },
    {
      id: "damage-questions-3",
      messages: [
        {
          id: "damage-q3",
          content: "¿Puedes estimar cuándo podrías reabrir tu negocio?",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
      ],
      quickReplies: [
        { label: "Ya estamos operando", value: "now" },
        { label: "En 1-2 días", value: "soon" },
        { label: "En 1-2 semanas", value: "week" },
        { label: "No lo sé aún", value: "unknown" },
      ],
    },
    {
      id: "damage-recovery-plan",
      messages: [
        {
          id: "recovery-plan-1",
          content: "Gracias por compartir esta información. Basado en tu situación, he preparado algunas recomendaciones para ayudarte a recuperarte lo antes posible:",
          type: "received",
          timestamp: new Date(),
          showAvatar: true,
        },
        {
          id: "recovery-plan-2",
          content: "1️⃣ Contacta a tu seguro inmediatamente y documenta todos los daños con fotos",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "recovery-plan-3",
          content: "2️⃣ Utiliza el programa BCP Impulso Restaurantes para acceder a financiamiento rápido para reparaciones",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "recovery-plan-4",
          content: "3️⃣ Considera implementar un menú simplificado temporal mientras recuperas toda tu capacidad",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "recovery-plan-5",
          content: "4️⃣ Comunícate con los contactos de emergencia que preparamos en tu plan de contingencia",
          type: "received",
          timestamp: new Date(),
        },
        {
          id: "recovery-plan-6",
          content: "¿Te gustaría que programemos una consulta gratuita con un especialista en recuperación de negocios del programa Contigo Emprendedor?",
          type: "received",
          timestamp: new Date(),
        },
      ],
      quickReplies: [
        { label: "Sí, me interesa", value: "yes-specialist" },
        { label: "Lo pensaré", value: "maybe-later" },
        { label: "No por ahora", value: "no-thanks" },
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

    // Si estamos esperando un PIN para verificar un desafío
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
      
      // Verificar el PIN
      if (enteredPin === expectedPin) {
        // PIN correcto
        setVerifyingPin(false);
        setTimeout(() => {
          setCurrentSectionIndex(27); // Índice de challenge-completed
        }, 500);
      } else {
        // PIN incorrecto
        setVerifyingPin(false);
        setTimeout(() => {
          setCurrentSectionIndex(26); // Índice de incorrect-pin
        }, 500);
      }
      return;
    }

    // Si estamos esperando la confirmación de "Estoy listo"
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
      
      // Continuar con el flujo
      setTimeout(() => {
        setCurrentSectionIndex(8); // Índice de staff-info
      }, 500);
      return;
    }
    
    // Mensaje normal
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
    
    // Avanzar a la siguiente sección si estamos en damage assessment
    if (damageAssessment) {
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
      return;
    }
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
        if (value === "retail") setBusinessType("Tienda / Bodega");
        else if (value === "restaurant") setBusinessType("Restaurante");
        else if (value === "services") setBusinessType("Servicios");
        else if (value === "manufacturing") setBusinessType("Manufactura");
        else setBusinessType("Otro");
        
        setTimeout(() => {
          setCurrentSectionIndex(2); // Ir a preguntar por la ubicación
        }, 500);
        return;
      }

      // Manejar la ubicación del negocio en caso de información incorrecta
      if (currentSectionIndex === 2 && !correctInfo) {
        if (value === "lima-center") setBusinessLocation("Lima Centro");
        else if (value === "lima-north") setBusinessLocation("Lima Norte");
        else if (value === "lima-south") setBusinessLocation("Lima Sur");
        else if (value === "lima-east") setBusinessLocation("Lima Este");
        else if (value === "callao") setBusinessLocation("Callao");
        else setBusinessLocation("Otra región");
        
        setTimeout(() => {
          setCurrentSectionIndex(3); // Ir a la historia de éxito
        }, 500);
        return;
      }

      // Manejar la explicación del plan
      if (currentSectionIndex === 4) {
        if (value === "more-info") {
          setTimeout(() => {
            setCurrentSectionIndex(5); // Ir a la explicación del plan
          }, 500);
          return;
        } else if (value === "later") {
          setWaitingForReadyConfirmation(true);
          setTimeout(() => {
            setCurrentSectionIndex(6); // Esperar a que esté listo
          }, 500);
          return;
        }
      }

      // Después de la explicación del plan
      if (currentSectionIndex === 5) {
        if (value === "later") {
          setWaitingForReadyConfirmation(true);
          setTimeout(() => {
            setCurrentSectionIndex(6); // Esperar a que esté listo
          }, 500);
          return;
        }
      }

      // Para los desafíos
      if (currentSectionIndex === 17) {
        if (value === "start-first") {
          // Generar un PIN aleatorio de 6 dígitos
          const pin = Math.floor(100000 + Math.random() * 900000).toString();
          setExpectedPin(pin);
          setCurrentChallenge("restaurant-inventory"); // El ID del primer desafío
          
          setTimeout(() => {
            setCurrentSectionIndex(23); // Ir a start-challenge
          }, 500);
          return;
        } else if (value === "how-to") {
          setTimeout(() => {
            setCurrentSectionIndex(18); // Ir a la explicación de cómo completar los desafíos
          }, 500);
          return;
        } else if (value === "later") {
          setWaitingForReadyConfirmation(true);
          setTimeout(() => {
            setCurrentSectionIndex(6); // Esperar a que esté listo
          }, 500);
          return;
        }
      }

      // Desde la explicación de cómo completar desafíos
      if (currentSectionIndex === 18) {
        if (value === "start-first") {
          // Generar un PIN aleatorio de 6 dígitos
          const pin = Math.floor(100000 + Math.random() * 900000).toString();
          setExpectedPin(pin);
          setCurrentChallenge("restaurant-inventory"); // El ID del primer desafío
          
          setTimeout(() => {
            setCurrentSectionIndex(23); // Ir a start-challenge
          }, 500);
          return;
        } else if (value === "later") {
          setWaitingForReadyConfirmation(true);
          setTimeout(() => {
            setCurrentSectionIndex(6); // Esperar a que esté listo
          }, 500);
          return;
        }
      }

      // Después de mostrar el enlace del desafío
      if (currentSectionIndex === 23) {
        // Aquí simulamos que el usuario ha visitado el enlace y ahora debe verificar
        setVerifyingPin(true);
        setTimeout(() => {
          setCurrentSectionIndex(24); // Ir a verify-challenge
        }, 500);
        return;
      }

      // Después de incorrecto PIN
      if (currentSectionIndex === 26) {
        setVerifyingPin(true);
        setTimeout(() => {
          setCurrentSectionIndex(24); // Volver a verify-challenge
        }, 500);
        return;
      }

      // Lógica especial para el plan de contingencia según el tipo de negocio
      if (currentSectionIndex === 28 && value === "yes-advice") {
        // Para este demo, siempre vamos al plan de restaurante
        setTimeout(() => {
          setCurrentSectionIndex(29); // índice de contingency-plan-restaurant
        }, 500);
        return;
      }

      // Más información sobre el plan de contingencia
      if (currentSectionIndex === 29 && value === "more-info") {
        setTimeout(() => {
          setCurrentSectionIndex(30); // índice de more-contingency-info
        }, 500);
        return;
      }

      // Después del desastre
      if (currentSectionIndex === 31 && (value === "some-damage" || value === "serious-damage")) {
        setDamageAssessment(true);
        setTimeout(() => {
          setCurrentSectionIndex(32); // índice de damage-assessment
        }, 500);
        return;
      }

      // Comenzar evaluación de daños
      if (currentSectionIndex === 32 && value === "start-assessment") {
        setTimeout(() => {
          setCurrentSectionIndex(33); // Primera pregunta de daños
        }, 500);
        return;
      }

      // Avanzar a la siguiente sección (comportamiento normal)
      setTimeout(() => {
        setCurrentSectionIndex(prev => prev + 1);
      }, 500);
    }
  };

  const handleSelectChallenge = (challengeId: string) => {
    // Generar un PIN aleatorio de 6 dígitos
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setExpectedPin(pin);
    setCurrentChallenge(challengeId);
    
    setTimeout(() => {
      setCurrentSectionIndex(23); // Ir a start-challenge
    }, 500);
  };

  const renderChallenges = (challenges: Challenge[]) => {
    // Filtrar desafíos específicos para el tipo de negocio actual o los generales
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
    // En una app real, esto navegaría a los detalles del curso
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
    // En una app real, esto sería un enlace a la página del desafío
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
            // Simulamos que el usuario completa el desafío
            setTimeout(() => {
              setVerifyingPin(true);
              setCurrentSectionIndex(24); // Ir a verify-challenge
            }, 1000);
          }}
        >
          {fakeUrl}
        </a>
      </div>
    );
  };

  if (!started) {
    return <WelcomeScreen onStart={() => setStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-full bg-whatsapp-bg">
      {/* Header */}
      <div className="bg-whatsapp-green text-white px-4 py-3 flex items-center justify-between shadow-md">
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

            {/* Mostrar enlace de desafío */}
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

      {/* Input Area */}
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
