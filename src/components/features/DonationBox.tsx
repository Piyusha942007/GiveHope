"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AmountSelector } from "./AmountSelector";
import { Button } from "@/components/ui/Button";
import { useDonation } from "@/context/DonationContext";

interface DonationBoxProps {
  programName?: string;
}

export const DonationBox = ({ programName }: DonationBoxProps) => {
  const router = useRouter();
  const { programs, donateToProgram, donateToPlatform } = useDonation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const amounts = [10, 25, 50, 100, 250, 500];

  const handleSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const currentAmount = selectedAmount || Number(customAmount) || 0;

  const handleDonate = async () => {
    if (currentAmount <= 0) return;
    
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const finalName = donorName.trim() || "Anonymous Donor";

    if (programName) {
      const program = programs.find(p => p.title === programName);
      if (program) {
        donateToProgram(program.slug, currentAmount, finalName, isAnonymous);
      }
    } else {
      donateToPlatform(currentAmount, finalName, isAnonymous);
    }

    // Redirect to success page
    const successUrl = `/donate/success?amount=${currentAmount}&program=${encodeURIComponent(programName || "General Fund")}&donor=${encodeURIComponent(isAnonymous ? "Anonymous" : finalName)}`;
    router.push(successUrl);
  };

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-border">
      <h3 className="mb-6 text-xl font-bold text-gray-900">
        {programName ? `Support ${programName}` : "Support our mission"}
      </h3>
      
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            disabled={isAnonymous}
            className="w-full rounded-xl border border-border px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        {/* Anonymous Toggle */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors peer-checked:bg-primary" />
            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Donate anonymously</span>
        </label>

        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-gray-400">Select Amount</label>
          <AmountSelector
            amounts={amounts}
            selectedAmount={selectedAmount}
            onSelect={handleSelect}
            onCustomChange={handleCustomChange}
            customAmount={customAmount}
          />
        </div>
        
        <div className="space-y-4 pt-2">
          <Button
            className="w-full h-14 text-lg rounded-xl"
            onClick={handleDonate}
            isLoading={status === "loading"}
            disabled={currentAmount <= 0}
          >
            Donate ${currentAmount > 0 ? currentAmount : ""} Now
          </Button>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Secure 256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
