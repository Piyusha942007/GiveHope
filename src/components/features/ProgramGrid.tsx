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
      {displayedPrograms.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};
