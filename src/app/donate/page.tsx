import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { LiveDonationTicker } from "@/components/features/LiveDonationTicker";
import DonatePageClient from "./DonatePageClient";

export default function DonatePage() {
  return (
    <Section className="flex-1 bg-muted/30 pt-24 pb-12 md:py-20 relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-200/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <Container className="relative z-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          
          {/* Left Column - Impact & Trust */}
          <div className="lg:col-span-7 py-6">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full">Secure Giving</span>
            <Heading level={1} className="mb-6 text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              You are about to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-500">change a life.</span>
            </Heading>
            <p className="text-gray-600 font-medium text-lg md:text-xl mb-12 leading-relaxed max-w-xl">
              Join a global community supporting sustainable, positive change. Your contribution directly funds vital services for those who need them most.
            </p>

            <div className="space-y-10 max-w-lg">
              {[
                { title: "100% Direct Impact", desc: "Every single cent goes directly to the field. Zero hidden fees." },
                { title: "Radical Transparency", desc: "Receive real-time updates showing exactly how you helped." },
                { title: "Verified NGO", desc: "We focus on long-term infrastructure and empowering communities." },
              ].map((item) => (
                <div key={item.title} className="flex gap-6 items-start group">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - The Form */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
             <div className="relative z-10">
               <Suspense fallback={<div className="h-96 rounded-2xl bg-white shadow-xl animate-pulse" />}>
                 <DonatePageClient />
               </Suspense>
             </div>
             
             {/* Trust Badges under form */}
             <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale">
              <div className="flex gap-4 font-bold text-[10px] text-gray-400 uppercase tracking-widest items-center">
                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Secure SSL</span>
                <span>•</span>
                <span>Verified 501(c)(3)</span>
              </div>
            </div>
          </div>

        </div>
      </Container>

      <LiveDonationTicker />
    </Section>
  );
}
