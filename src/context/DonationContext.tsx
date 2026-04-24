"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Program, programs as initialPrograms } from "@/data/programs";
import { supabase } from "@/lib/supabase";

interface Donation {
  id: string;
  programSlug: string;
  donorName: string;
  amount: number;
  isAnonymous: boolean;
  timestamp: Date;
}

interface DonationContextType {
  programs: Program[];
  donations: Donation[];
  platformStats: {
    fundsChannelled: number;
    livesImpacted: number;
    verifiedNGOs: number;
    countriesReached: number;
  };
  donateToProgram: (slug: string, amount: number, donorName: string, isAnonymous: boolean) => void;
  donateToPlatform: (amount: number, donorName: string, isAnonymous: boolean) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

const MOCK_DONATIONS: Donation[] = [
  { id: "1", programSlug: "clean-water", donorName: "Sarah Jenkins", amount: 500, isAnonymous: false, timestamp: new Date("2024-04-23") },
  { id: "2", programSlug: "forest-restoration", donorName: "David Chen", amount: 150, isAnonymous: false, timestamp: new Date("2024-04-23") },
  { id: "3", programSlug: "education-for-all", donorName: "Elena Rodriguez", amount: 25, isAnonymous: true, timestamp: new Date("2024-04-24") },
];

export const DonationProvider = ({ children }: { children: React.ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [platformStats, setPlatformStats] = useState({
    fundsChannelled: 4200000,
    livesImpacted: 850000,
    verifiedNGOs: 200,
    countriesReached: 32,
  });

  // 1. Initial Data Fetch & Realtime Subscription
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Donations
      const { data: dbDonations } = await supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false });

      if (dbDonations) {
        setDonations(dbDonations.map((d) => ({
          id: d.id,
          programSlug: d.program_slug,
          donorName: d.donor_name,
          amount: Number(d.amount),
          isAnonymous: d.is_anonymous,
          timestamp: new Date(d.created_at),
        })));
      }

      // Fetch Program Overrides (Raised Amounts)
      const { data: overrides } = await supabase
        .from("program_overrides")
        .select("*");

      if (overrides) {
        setPrograms(prev => prev.map(p => {
          const override = overrides.find(o => o.program_slug === p.slug);
          return override ? { ...p, raised: p.raised + Number(override.total_raised) } : p;
        }));
        
        // Update total platform stats based on overrides
        const totalNewRaised = overrides.reduce((acc, curr) => acc + Number(curr.total_raised), 0);
        setPlatformStats(prev => ({
          ...prev,
          fundsChannelled: 4200000 + totalNewRaised // Baseline + new global donations
        }));
      }
    };

    fetchData();

    // 2. Realtime Subscriptions
    const donationsChannel = supabase
      .channel("global_donations")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "donations" }, (payload) => {
        const d = payload.new as { id: string; program_slug: string; donor_name: string; amount: number; is_anonymous: boolean; created_at: string };
        if (!d) return;
        
        const newDonation: Donation = {
          id: d.id,
          programSlug: d.program_slug,
          donorName: d.donor_name,
          amount: Number(d.amount),
          isAnonymous: d.is_anonymous,
          timestamp: new Date(d.created_at),
        };
        setDonations(prev => [newDonation, ...prev]);
      })
      .subscribe();

    const overridesChannel = supabase
      .channel("global_overrides")
      .on("postgres_changes", { event: "*", schema: "public", table: "program_overrides" }, (payload) => {
        const o = payload.new as { program_slug: string; total_raised: number };
        if (!o) return;
        
        setPrograms(prev => prev.map(p => {
          if (p.slug === o.program_slug) {
            // Find initial raised amount from data
            const initialP = initialPrograms.find(ip => ip.slug === p.slug);
            const baseRaised = initialP ? initialP.raised : 0;
            return { ...p, raised: baseRaised + Number(o.total_raised) };
          }
          return p;
        }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(donationsChannel);
      supabase.removeChannel(overridesChannel);
    };
  }, []);

  const donateToProgram = async (slug: string, amount: number, donorName: string, isAnonymous: boolean) => {
    // 1. Validate Credentials
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase credentials missing! Check your .env.local");
      return;
    }

    try {
      // 2. Push Donation
      const { error: donationError } = await supabase
        .from("donations")
        .insert({
          program_slug: slug,
          donor_name: isAnonymous ? "Anonymous" : donorName,
          amount,
          is_anonymous: isAnonymous,
        });

      if (donationError) {
        console.error("Supabase Error (Donation):", donationError.message);
        return;
      }

      // 3. Update Program Overrides
      const { data: existing, error: fetchError } = await supabase
        .from("program_overrides")
        .select("total_raised")
        .eq("program_slug", slug)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is "No rows found"
        console.error("Supabase Error (Fetch Override):", fetchError.message);
        return;
      }

      const currentTotal = existing ? Number(existing.total_raised) : 0;
      
      const { error: upsertError } = await supabase
        .from("program_overrides")
        .upsert({
          program_slug: slug,
          total_raised: currentTotal + amount,
          updated_at: new Date().toISOString()
        });

      if (upsertError) {
        console.error("Supabase Error (Upsert):", upsertError.message);
      }
    } catch (err) {
      console.error("Network Error: Failed to reach Supabase. Check your internet connection or Adblocker.", err);
    }
  };

  const donateToPlatform = async (amount: number, donorName: string, isAnonymous: boolean) => {
    await donateToProgram("general", amount, donorName, isAnonymous);
  };

  return (
    <DonationContext.Provider
      value={{ programs, donations, platformStats, donateToProgram, donateToPlatform }}
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
