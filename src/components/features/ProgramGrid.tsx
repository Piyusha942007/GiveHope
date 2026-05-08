import React from "react";
import { Program } from "@/data/programs";
import { ProgramCard } from "./ProgramCard";

interface ProgramGridProps {
  programs: Program[];
  limit?: number;
}

export const ProgramGrid = ({ programs, limit }: ProgramGridProps) => {
  const displayedPrograms = limit ? programs.slice(0, limit) : programs;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
      {displayedPrograms.map((program, i) => (
        <div 
          key={program.id} 
          className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <ProgramCard program={program} />
        </div>
      ))}
    </div>
  );
};
