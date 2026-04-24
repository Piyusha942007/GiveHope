"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProgramGrid } from "@/components/features/ProgramGrid";
import { useDonation } from "@/context/DonationContext";

export default function ProgramsPage() {
  const { programs } = useDonation();
  const [activeFilter, setActiveFilter] = useState("All");
  
  const categories = ["All", "Education", "Health", "Environment"];
  const filteredPrograms = activeFilter === "All" 
    ? programs 
    : programs.filter(p => p.category === activeFilter);

  return (
    <>
      <Section className="relative bg-muted/30 py-16 md:py-24 overflow-hidden border-b border-border">
        {/* Background Decorative Blurs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-200/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">Explore Causes</span>
            <Heading level={1} className="mb-6 text-5xl md:text-6xl font-black tracking-tight">
              Our <span className="text-primary">Programs</span>
            </Heading>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              Every initiative we undertake is designed for long-term sustainability and community-led growth. Find a cause that speaks to you.
            </p>
          </div>
        </Container>
      </Section>
 
      <Section className="pt-16 pb-24">
        <Container>
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="text-xl">🔥</span> {filteredPrograms.length} Active {filteredPrograms.length === 1 ? "Program" : "Programs"} Running
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    activeFilter === category 
                      ? "bg-gray-900 text-white shadow-md" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <ProgramGrid programs={filteredPrograms} />
        </Container>
      </Section>
    </>
  );
}
