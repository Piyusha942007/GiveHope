"use client";

import { useSearchParams } from "next/navigation";
import { DonationBox } from "@/components/features/DonationBox";
import { useDonation } from "@/context/DonationContext";

export default function DonatePageClient() {
  const { programs } = useDonation();
  const searchParams = useSearchParams();
  const programSlug = searchParams.get("program");
  
  const selectedProgram = programs.find((p) => p.slug === programSlug);

  return (
    <DonationBox 
      programName={selectedProgram?.title || (programSlug === "clean-water-initiative" ? "Clean Water Initiative" : undefined)} 
    />
  );
}
