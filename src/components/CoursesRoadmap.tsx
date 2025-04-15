
import React from "react";
import { cn } from "@/lib/utils";
import { LockIcon, UnlockIcon, GraduationCap } from "lucide-react";
import CuyCoins from "./CuyCoins";

export interface Course {
  id: string;
  title: string;
  description: string;
  status: "completed" | "available" | "locked";
  unlockCost?: number;
  progress?: number;
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
  return (
    <div className={cn("w-full", className)}>
      <h3 className="font-medium text-gray-700 mb-3 text-center">Tu camino de aprendizaje</h3>
      
      <div className="space-y-3">
        {courses.map((course, index) => {
          const isLocked = course.status === "locked";
          const isCompleted = course.status === "completed";
          
          return (
            <div
              key={course.id}
              className={cn(
                "relative rounded-lg p-3 border-2 transition-all",
                isLocked
                  ? "border-gray-300 bg-gray-50 text-gray-400"
                  : isCompleted
                  ? "border-green-500 bg-green-50"
                  : "border-bcp-blue bg-white"
              )}
              onClick={() => !isLocked && onSelectCourse(course.id)}
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
