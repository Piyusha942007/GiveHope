"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useDonation } from "@/context/DonationContext";
import { programs as staticPrograms } from "@/data/programs";

export const FloatingCard = () => {
  const { programs: contextPrograms } = useDonation();
  const allPrograms = contextPrograms.length > 0 ? contextPrograms : staticPrograms;
  const program = allPrograms.find(p => p.slug === "clean-water-initiative") || staticPrograms[1] || allPrograms[0];
  const progress = Math.min(Math.round((program.raised / program.goal) * 100), 100);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300); // Slightly longer delay for impact
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative w-full max-w-[280px] sm:max-w-[320px] transition-all duration-[1800ms] ${
        mounted ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-32 scale-50 blur-sm"
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="animate-float rounded-2xl border border-white/20 bg-white/90 backdrop-blur-md p-5 shadow-2xl shadow-black/20 card-hover cursor-pointer">
        <h4 className="mb-2 text-base font-bold text-gray-900 leading-tight">{program.title}</h4>
        <div className="mb-4 flex items-center gap-1.5 text-[11px] text-green-700 font-bold uppercase tracking-wider bg-green-50 w-fit px-2 py-0.5 rounded-sm">
          <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </div>

        <div className="mb-1.5 flex items-end justify-between text-sm">
          <span className="font-black text-gray-900">${program.raised.toLocaleString()} <span className="text-gray-500 font-normal text-xs">raised</span></span>
          <span className="text-gray-500 font-bold text-xs">{progress}%</span>
        </div>
        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full bg-primary transition-all duration-[2500ms] delay-500 ease-out" 
            style={{ width: mounted ? `${progress}%` : '0%' }} 
          />
        </div>

        <Link href={`/programs/${program.slug}`} className="block w-full">
          <Button className="w-full text-sm h-10 shadow-md shadow-green-500/20" size="sm">
            Donate Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
