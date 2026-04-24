"use client";

import React, { createContext, useContext, useState } from "react";
import { Program, programs as initialPrograms } from "@/data/programs";

interface DonationContextType {
  programs: Program[];
  platformStats: {
    fundsChannelled: number;
    livesImpacted: number;
    verifiedNGOs: number;
    countriesReached: number;
  };
  donateToProgram: (slug: string, amount: number) => void;
  donateToPlatform: (amount: number) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider = ({ children }: { children: React.ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [platformStats, setPlatformStats] = useState({
    fundsChannelled: 4200000,
    livesImpacted: 850000,
    verifiedNGOs: 200,
    countriesReached: 32,
  });

  const donateToProgram = (slug: string, amount: number) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.slug === slug ? { ...p, raised: p.raised + amount } : p
      )
    );
    // Also update platform total
    setPlatformStats((prev) => ({
      ...prev,
      fundsChannelled: prev.fundsChannelled + amount,
    }));
  };

  const donateToPlatform = (amount: number) => {
    setPlatformStats((prev) => ({
      ...prev,
      fundsChannelled: prev.fundsChannelled + amount,
    }));
  };

  return (
    <DonationContext.Provider
      value={{ programs, platformStats, donateToProgram, donateToPlatform }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};
