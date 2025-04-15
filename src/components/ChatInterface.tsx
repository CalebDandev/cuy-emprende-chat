
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
