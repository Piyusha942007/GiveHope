"use client";

import React from "react";
import Link from "next/link";
import { useDonation } from "@/context/DonationContext";

export const LiveDonationTicker = () => {
  const { donations } = useDonation();
  
  // Get latest 3 donations
  const recentDonations = donations.slice(0, 3);

  const formatTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full py-16 bg-white border-t border-border mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gray-50/50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Subtle accent background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative z-10">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Live Impact Feed</h4>
              </div>

              <div className="space-y-5">
                {recentDonations.length > 0 ? (
                  recentDonations.map((d) => (
                    <div key={d.id} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-700">
                      <div className="h-8 w-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                        {d.donorName[0].toUpperCase()}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-base">
                        <span className="font-bold text-gray-900 tracking-tight">{d.donorName}</span>
                        <span className="text-gray-400 font-medium">contributed</span>
                        <span className="font-black text-primary">${d.amount}</span>
                        <span className="hidden md:inline text-gray-200">•</span>
                        <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">{formatTimeAgo(d.timestamp)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3 text-gray-400 italic text-sm">
                    <div className="h-2 w-2 rounded-full bg-gray-200 animate-pulse" />
                    Waiting for the next hero...
                  </div>
                )}
              </div>
            </div>

            <Link href="/programs" className="shrink-0 group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary hover:border-primary/20 transition-all duration-300">
              View all donors
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
