"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Program } from "@/data/programs";
import { Button } from "@/components/ui/Button";
import { Share2 } from "lucide-react";
import { useDonation } from "@/context/DonationContext";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program: initialProgram }: ProgramCardProps) => {
  const { donations, programs } = useDonation();
  const program = programs.find(p => p.id === initialProgram.id) || initialProgram;
  const progress = Math.min(Math.round((program.raised / program.goal) * 100), 100);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!program.video) return;

    let timer: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start playing after 2s delay if still visible (ONLY for touch devices where hover isn't possible)
            if (window.matchMedia("(pointer: coarse)").matches) {
              timer = setTimeout(() => {
                if (videoRef.current && entry.isIntersecting) {
                  videoRef.current.play().catch(() => {});
                  setIsPlaying(true);
                }
              }, 1000);
            }
          } else {
            // Stop playing and clear timer when scrolling away
            clearTimeout(timer);
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of card is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [program.video]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // If not visible (via observer), we'd already be paused. 
    // But for desktop hover, we want it to keep playing if it was auto-playing or just let the observer handle it.
    // However, the user said "as they scroll the page the video stops", so we prioritize observer for scroll.
    // For hover, let's keep it simple: hover starts it immediately.
  };

  const showVideo = isPlaying || isHovered;

  return (
    <div 
      ref={containerRef}
      className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-gray-200"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-gray-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Static Image */}
        <img
          src={program.image}
          alt={program.title}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            showVideo ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Video */}
        {program.video && (
          <video
            ref={videoRef}
            src={program.video}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              showVideo ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Play indicator */}
        {program.video && (
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${showVideo ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </div>
          </div>
        )}

        <div className="absolute top-4 right-4 flex gap-2">
          <div className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-800 backdrop-blur-sm shadow-sm">
            {program.category}
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const shareData = {
                title: `GiveHope: ${program.title}`,
                text: `I'm supporting the "${program.title}" initiative on GiveHope. Every contribution creates a real, verified impact. Join me in making a difference! 🌍✨`,
                url: `${window.location.origin}/programs/${program.slug}`,
              };

              if (navigator.share) {
                navigator.share(shareData).catch(() => {});
              } else {
                navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert("Link copied to clipboard!");
              }
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-sm transition-colors hover:text-primary backdrop-blur-sm border-none cursor-pointer"
            title="Share this program"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
        
        {/* Recent Donation Mock */}
        {(() => {
          const lastDonation = donations.find(d => d.programSlug === program.slug);
          
          if (lastDonation) {
            return (
              <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-gray-800 backdrop-blur-md shadow-sm flex items-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {lastDonation.donorName} donated ${lastDonation.amount}
              </div>
            );
          }

          const names = ["Sarah J.", "Chen W.", "Elena R.", "Marcus T.", "Priyanka K.", "David L.", "Aisha M.", "Siddharth B."];
          const amounts = [10, 25, 50, 100, 250];
          const randomName = names[Math.floor((program.id.charCodeAt(0) + program.id.length) % names.length)];
          const randomAmount = amounts[Math.floor((program.id.charCodeAt(0) + program.id.length) % amounts.length)];
          return (
            <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-gray-800 backdrop-blur-md shadow-sm flex items-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {randomName} donated ${randomAmount}
            </div>
          );
        })()}
      </div>

      <div className="p-6 md:p-8">
        <h3 className="mb-1 text-xl font-black text-gray-900 leading-tight">
          <Link href={`/programs/${program.slug}`} className="hover:underline decoration-gray-300 underline-offset-4">
            {program.title}
          </Link>
        </h3>
        
        {/* Urgency / High Impact Tag */}
        <div className="mb-4 flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 w-fit px-2 py-0.5 rounded-md">
          <span>🔥</span> High impact
        </div>
        
        <p className="mb-6 line-clamp-2 text-sm text-gray-500 leading-relaxed font-medium">
          {program.description}
        </p>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold text-gray-900">${program.raised.toLocaleString()} <span className="font-medium text-gray-500">raised</span></span>
            <span className="font-bold text-gray-400">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Link href={`/donate?program=${program.slug}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full font-bold shadow-md hover:shadow-green-500/25">
              Donate Now
            </Button>
          </Link>
          <Link href={`/programs/${program.slug}`} className="flex-1">
            <Button variant="ghost" size="sm" className="w-full font-bold text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
