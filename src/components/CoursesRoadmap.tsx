
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { LockIcon, UnlockIcon, GraduationCap, ExternalLink, Clock, Award } from "lucide-react";
import CuyCoins from "./CuyCoins";

export interface Course {
  id: string;
  title: string;
  description: string;
  status: "completed" | "available" | "locked";
  unlockCost?: number;
  progress?: number;
  topics?: string[];
  benefits?: string[];
  duration?: string;
  url?: string;
}

interface CoursesRoadmapProps {
  courses: Course[];
  onSelectCourse: (id: string) => void;
  className?: string;
}

const CoursesRoadmap: React.FC<CoursesRoadmapProps> = ({
  courses,
  onSelectCourse,
  className,
}) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  
  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };
  
  return (
    <div className={cn("w-full", className)}>
      <h3 className="font-medium text-gray-700 mb-3 text-center">Tu camino de aprendizaje 📚</h3>
      
      <div className="space-y-4">
        {courses.map((course, index) => {
          const isLocked = course.status === "locked";
          const isCompleted = course.status === "completed";
          const isAvailable = course.status === "available";
          const isExpanded = expandedCourse === course.id;
          
          return (
            <div
              key={course.id}
              className={cn(
                "relative rounded-lg border-2 transition-all",
                isLocked
                  ? "border-gray-300 bg-gray-50 text-gray-400"
                  : isCompleted
                  ? "border-green-500 bg-green-50"
                  : "border-bcp-blue bg-white"
              )}
            >
              <div 
                className="p-3"
                onClick={() => !isLocked && (toggleCourse(course.id))}
              >
                <div className="flex justify-between items-center">
                  <h4 className={cn("font-medium", isLocked ? "text-gray-500" : "text-gray-800")}>
                    {course.title}
                  </h4>
                  
                  {isLocked ? (
                    <div className="flex items-center">
                      <LockIcon className="w-4 h-4 mr-1 text-gray-400" />
                      <CuyCoins count={course.unlockCost || 0} size="sm" />
                    </div>
                  ) : isCompleted ? (
                    <GraduationCap className="w-5 h-5 text-green-500" />
                  ) : (
                    <UnlockIcon className="w-4 h-4 text-bcp-blue" />
                  )}
                </div>
                
                <p className="text-sm mt-1">
                  {isLocked ? "Desbloquea este curso con monedas Cuy" : course.description}
                </p>
                
                {!isLocked && course.progress !== undefined && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-bcp-orange rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-0.5 text-gray-500">
                      {course.progress}% completado
                    </div>
                  </div>
                )}
              </div>
              
              {isAvailable && isExpanded && (
                <div className="px-3 pb-3 border-t border-gray-200 mt-2 pt-2">
                  {course.topics && course.topics.length > 0 && (
                    <>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">¿Qué aprenderás? 🧠</h5>
                      <ul className="text-xs text-gray-600 space-y-1 mb-3 pl-4">
                        {course.topics.map((topic, i) => (
                          <li key={i} className="list-disc">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {course.benefits && course.benefits.length > 0 && (
                    <>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Beneficios ✨</h5>
                      <ul className="text-xs text-gray-600 space-y-1 mb-3 pl-4">
                        {course.benefits.map((benefit, i) => (
                          <li key={i} className="list-disc">
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  <div className="flex items-center justify-between mt-3 text-xs">
                    {course.duration && (
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </div>
                    )}
                    
                    {course.url && (
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectCourse(course.id);
                        }}
                        className="flex items-center text-bcp-blue font-medium hover:underline"
                      >
                        Iniciar curso <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {index < courses.length - 1 && !isLocked && (
                <div className="absolute bottom-0 left-1/2 w-0.5 h-3 bg-gray-300 transform -translate-x-1/2 translate-y-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesRoadmap;
