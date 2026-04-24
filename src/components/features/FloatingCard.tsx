"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { programs } from "@/data/programs";

export const FloatingCard = () => {
  const program = programs[0]; // Featured program
  const progress = Math.min(Math.round((program.raised / program.goal) * 100), 100);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] animate-float">
      <div className="rounded-2xl border border-white/20 bg-white/90 backdrop-blur-md p-5 shadow-2xl shadow-black/20 card-hover cursor-pointer">
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
            className="h-full bg-primary transition-all duration-1500 ease-out" 
            style={{ width: mounted ? `${progress}%` : '0%' }} 
          />
        </div>

        <Link href={`/donate?program=${program.slug}`} className="block w-full">
          <Button className="w-full text-sm h-10 shadow-md shadow-green-500/20" size="sm">
            Donate Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
