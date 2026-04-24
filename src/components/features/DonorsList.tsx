"use client";

import React from "react";
import { useDonation } from "@/context/DonationContext";

interface DonorsListProps {
  programSlug: string;
}

export const DonorsList = ({ programSlug }: DonorsListProps) => {
  const { donations } = useDonation();
  const filteredDonations = donations.filter((d) => d.programSlug === programSlug);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Recent Donors</h3>
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {filteredDonations.length} total
        </span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {donation.donorName[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{donation.donorName}</p>
                  <p className="text-xs text-gray-400 font-medium">
                    {new Date(donation.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900">${donation.amount}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Verified</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400 font-medium">No donations yet. Be the first!</p>
          </div>
        )}
      </div>

      {/* Trust Signal & Mail-in Link */}
      <div className="pt-4 border-t border-border">
        <div className="rounded-xl bg-muted/50 p-4 text-center">
          <p className="text-sm text-gray-600 mb-2 font-medium">Don&apos;t see your name in the list?</p>
          <a 
            href="mailto:hello@givehope.org?subject=Missing Donation Entry"
            className="text-sm font-bold text-primary hover:underline flex items-center justify-center gap-1.5"
          >
            Click here to notify us 
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
};
