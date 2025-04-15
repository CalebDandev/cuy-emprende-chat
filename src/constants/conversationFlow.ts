import { ConversationSection } from "@/hooks/useChat";

export const conversationFlow: ConversationSection[] = [
  {
    id: "intro",
    messages: [
      {
        id: "intro-1",
        content: `¡Hola Lizet Rojas Corman! Soy Kututu, tu asesor virtual de BCP 👋`,
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "intro-2",
        content: "Estoy aquí para ayudarte a crear un plan de contingencia para tu negocio de vinos y destilados, y así estar preparado ante cualquier emergencia que pueda afectar tu emprendimiento. 🛡️",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "intro-3",
        content: "Para empezar, verifico que tengo la siguiente información de tu negocio:",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "intro-4",
        content: `Tienes Bodega De Liz, un Negocio de elaboración y venta de vinos y destilados ubicado en Barranca, Lima. ¿Es correcta esta información? ✅`,
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, es correcto", value: "correct" },
    ],
  },
  {
    id: "points-explanation",
    messages: [
      {
        id: "points-1",
        content: "¡Excelente! Antes de comenzar, déjame explicarte sobre los puntos de resiliencia 🌟",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "points-2",
        content: "Los puntos de resiliencia son una recompensa que ganarás por tomar acciones para proteger tu negocio. Con ellos podrás:",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "points-3",
        content: "✨ Desbloquear asesorías personalizadas\n🎓 Acceder a cursos premium\n💎 Obtener beneficios exclusivos del BCP\n🛡️ Conseguir escudos de explorador",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Entendido, continuar", value: "continue" },
    ],
  },
  {
    id: "success-story",
    messages: [
      {
        id: "story-1",
        content: "Ahora, me gustaría compartir contigo la historia de María, una emprendedora como tú que logró proteger su negocio. 📖",
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
      imageSrc: "https://randomuser.me/api/portraits/women/42.jpg",
      rewardPoints: 15
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
      },
      {
        id: "awareness-3",
        content: "¿Te animas a crear tu perfil de riesgo?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "¡Claro que sí! 🚀", value: "ready" },
    ],
  },
  {
    id: "risk-assessment-questions",
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
    id: "risk-assessment-questions-2",
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
    id: "risk-assessment-questions-3",
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
    id: "risk-assessment-questions-4",
    messages: [
      {
        id: "insurance-1",
        content: "Gracias por la información. 📊",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "insurance-2",
        content: "¿Tienes algún seguro que cubra a tu negocio en caso de emergencias?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, tengo seguro completo", value: "full-insurance" },
      { label: "Solo seguro básico", value: "basic-insurance" },
      { label: "No tengo seguros", value: "no-insurance" },
    ],
  },
  {
    id: "risk-assessment-questions-5",
    messages: [
      {
        id: "backup-1",
        content: "Entendido. Continúo evaluando tu nivel de preparación. 🧮",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "backup-2",
        content: "¿Tienes copias de seguridad de la información importante de tu negocio (recetas, clientes, proveedores)?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, en digital y físico", value: "full-backup" },
      { label: "Solo copias físicas", value: "physical-backup" },
      { label: "No tengo copias", value: "no-backup" },
    ],
  },
  {
    id: "risk-assessment-questions-6",
    messages: [
      {
        id: "plan-1",
        content: "Vamos avanzando bien. 👍",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "plan-2",
        content: "¿Has establecido un plan de evacuación y puntos de encuentro con tu equipo en caso de emergencia?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, está implementado", value: "implemented" },
      { label: "Lo tengo pensado pero no formalizado", value: "planned" },
      { label: "No he pensado en eso", value: "none" },
    ],
  },
  {
    id: "risk-assessment-questions-7",
    messages: [
      {
        id: "supply-1",
        content: "Una pregunta más para completar tu evaluación. 📋",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "supply-2",
        content: "¿Cuentas con proveedores alternativos en caso de que tus proveedores habituales se vean afectados por una emergencia?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, tengo opciones identificadas", value: "alternatives" },
      { label: "Solo para algunos insumos", value: "partial" },
      { label: "No, dependo de mis proveedores actuales", value: "dependent" },
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
        content: "Estoy evaluando tu perfil de riesgo actual para Bodega De Liz...",
        type: "received",
        timestamp: new Date(),
      },
    ],
    component: "risk",
    componentProps: {
      level: "medium",
      message: "Tu bodega tiene un nivel medio de vulnerabilidad. ¡Felicitaciones! Ahora perteneces al escudo Explorador Novato 🛡️",
      rewardPoints: 25,
      showMoreUrl: "#"
    },
    quickReplies: [
      { label: "Ver medidas rápidas recomendadas", value: "see-plan" },
    ],
  },
  {
    id: "contingency-plan",
    messages: [
      {
        id: "plan-1",
        content: "He creado recomendaciones específicas para Bodega De Liz: 📋",
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
      {
        id: "courses-3",
        content: "Al completar los cursos, irás subiendo de nivel y obtendrás nuevos escudos de explorador. 🛡️",
        type: "received",
        timestamp: new Date(),
      },
    ],
    component: "roadmap",
    componentProps: [
      {
        id: "course-1",
        title: "Conoce los procesos claves de tu negocio",
        description: "Fundamentos básicos para identificar y asegurar los procesos críticos de tu bodega",
        status: "available",
        progress: 0,
        topics: [
          "Identificación de procesos críticos en tu bodega",
          "Cómo priorizar actividades en caso de emergencia",
          "Evaluación de impacto en la cadena de valor"
        ],
        benefits: [
          "Minimizar interrupciones en tu operación",
          "Proteger tus activos más valiosos",
          "Recuperar rápidamente la operatividad"
        ],
        duration: "45 minutos",
        url: "#curso-1"
      },
      {
        id: "course-2",
        title: "Protege lo más importante",
        description: "Aprende a proteger tus productos y equipos especializados",
        status: "locked",
        unlockCost: 50
      },
      {
        id: "course-3",
        title: "Crea un fondo de emergencia",
        description: "Estrategias financieras para asegurar la continuidad de tu bodega",
        status: "locked",
        unlockCost: 75
      },
      {
        id: "course-4",
        title: "Digitaliza tu información importante",
        description: "Respaldo digital seguro para tus datos críticos",
        status: "locked",
        unlockCost: 40
      },
      {
        id: "course-5",
        title: "Prepara un plan de comunicación en emergencias",
        description: "Mantén informados a clientes, proveedores y colaboradores",
        status: "locked",
        unlockCost: 60
      },
      {
        id: "course-6",
        title: "Planifica cómo continuar operando y reabastecerte",
        description: "Estrategias para la recuperación rápida post-emergencia",
        status: "locked",
        unlockCost: 80
      }
    ],
    quickReplies: [
      { label: "Comenzar primer curso", value: "start-course" },
    ],
  },
  {
    id: "course-completion",
    messages: [
      {
        id: "completion-1",
        content: "¡Felicidades, Lizet! 🎉 Has completado exitosamente el curso 'Conoce los procesos claves de tu negocio'.",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "completion-2",
        content: "Has ganado 30 puntos de resiliencia que ya fueron acreditados a tu cuenta.",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "completion-3",
        content: "¿Te gustaría continuar con el siguiente módulo: 'Protege lo más importante'?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    component: "reward",
    componentProps: {
      achievement: "¡Curso completado!",
      coins: 30
    },
    quickReplies: [
      { label: "En otro momento", value: "later" },
    ],
  },
  {
    id: "emergency-alert",
    messages: [
      {
        id: "alert-1",
        content: "⚠️ ALERTA DE EMERGENCIA ⚠️",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "alert-2",
        content: "Lizet, el SENAMHI ha emitido una alerta de lluvias intensas para la zona de Barranca en las próximas 48 horas. Se esperan precipitaciones de hasta 30mm. 🌧️",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "alert-3",
        content: "Más detalles en: https://www.senamhi.gob.pe/alertas",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "alert-4",
        content: "Recuerda: tu seguridad y la de tu equipo es lo primero. Aplica lo aprendido: asegura documentos y verifica sistemas de drenaje. 🛡️",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Gracias por el aviso", value: "thanks-alert" },
    ],
  },
  {
    id: "emergency-followup",
    messages: [
      {
        id: "followup-1",
        content: "Lizet, han pasado 24 horas desde la alerta. ¿Cómo estás? ¿Todo bien con tu familia y equipo? 🙏",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
    ],
    quickReplies: [
      { label: "Estamos todos bien, gracias", value: "all-good" },
    ],
  },
  {
    id: "damage-assessment",
    messages: [
      {
        id: "assessment-1",
        content: "Necesito evaluar los posibles daños. Por favor, responde estas preguntas:",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "assessment-2",
        content: "1. ¿Hay filtraciones en el techo o paredes?\n2. ¿Los sistemas de drenaje funcionaron correctamente?\n3. ¿Las barricas y botellas están a salvo?\n4. ¿Hay señales de humedad en el área de almacenamiento?\n5. ¿Los equipos eléctricos están funcionando normalmente?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Solo filtraciones menores en el techo", value: "minor-damage" },
    ],
  },
  {
    id: "community-support",
    messages: [
      {
        id: "support-1",
        content: "Entiendo. Los daños son menores, pero otros emprendedores de Barranca han sufrido pérdidas significativas. 💔",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "support-2",
        content: "¿Te gustaría conectar con ellos para brindar apoyo? Juntos somos más fuertes. 🤝",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, quiero ayudar", value: "help-others" },
    ],
  },
  {
    id: "damage-details",
    messages: [
      {
        id: "details-1",
        content: "Entiendo. Las filtraciones pueden dañar tanto la estructura como tu producto. 📋",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "details-2",
        content: "¿Pudiste proteger tus barricas y botellas del agua?",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Sí, las cubrí a tiempo", value: "protected" },
    ],
  },
  {
    id: "final-assessment",
    messages: [
      {
        id: "final-1",
        content: "¡Excelente trabajo aplicando lo aprendido! 👍",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "final-2",
        content: "Basado en tu información, el daño es principalmente estructural pero has logrado proteger tu producto. Te recomendaría:",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "final-3",
        content: "1️⃣ Contactar a un técnico para revisar y reparar las filtraciones\n2️⃣ Verificar si hay humedad en las paredes\n3️⃣ Instalar un deshumidificador temporalmente",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "final-4",
        content: "Te estamos conectando con un voluntario de BCP que te brindará asesoría sobre cómo gestionar la reparación. Te contactará en las próximas 2 horas. 🤝",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Gracias por la ayuda", value: "thanks-help" },
    ],
  },
  {
    id: "market-info",
    messages: [
      {
        id: "market-1",
        content: "¡Con gusto, Lizet! 💪",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "market-2",
        content: "Si en el futuro tuvieras pérdidas significativas en tus productos, recuerda que puedes acceder al Mercado Solidario de BCP, donde podrás recibir apoyo para recuperar tu inventario.",
        type: "received",
        timestamp: new Date(),
      },
      {
        id: "market-3",
        content: "Para más información, visita: www.mercadosolidariobcp.pe",
        type: "received",
        timestamp: new Date(),
      },
    ],
    quickReplies: [
      { label: "Finalizar conversación", value: "end" },
    ],
  },
  {
    id: "closing",
    messages: [
      {
        id: "closing-1",
        content: "Ha sido un gusto asistirte, Lizet. 😊 Estoy aquí para apoyarte en el camino hacia un negocio más resiliente.",
        type: "received",
        timestamp: new Date(),
        showAvatar: true,
      },
      {
        id: "closing-2",
        content: "Recuerda que puedes volver a consultarme cuando lo necesites para revisar tu plan de contingencia o acceder a nuevos cursos.",
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
