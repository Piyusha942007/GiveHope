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
    
    if (programName) {
      const program = programs.find(p => p.title === programName);
      if (program) {
        donateToProgram(program.slug, currentAmount);
      }
    } else {
      donateToPlatform(currentAmount);
    }

    // Redirect to success page
    const successUrl = `/donate/success?amount=${currentAmount}&program=${encodeURIComponent(programName || "General Fund")}`;
    router.push(successUrl);
  };

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-lg border border-border card-hover">
      <h3 className="mb-6 text-xl font-bold text-gray-900">
        {programName ? `Support ${programName}` : "Support our mission"}
      </h3>
      
      <div className="space-y-8">
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">Select Amount</label>
          <AmountSelector
            amounts={amounts}
            selectedAmount={selectedAmount}
            onSelect={handleSelect}
            onCustomChange={handleCustomChange}
            customAmount={customAmount}
          />
        </div>
        
        <div className="space-y-4">
          <Button
            className="w-full"
            size="lg"
            onClick={handleDonate}
            isLoading={status === "loading"}
            disabled={currentAmount <= 0}
          >
            Donate ${currentAmount > 0 ? currentAmount : ""} Now
          </Button>
          <p className="text-center text-xs text-gray-500">
            Secure simulation. No real funds will be processed.
          </p>
        </div>
      </div>
    </div>
  );
};
