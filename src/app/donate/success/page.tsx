"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { MessageCircle, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const amount = searchParams.get("amount") || "25";
  const program = searchParams.get("program") || "GiveHope";
  const donor = searchParams.get("donor") || "Kind Soul";

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Impact calculation logic (mock)
  const getImpact = (amt: string) => {
    const val = parseInt(amt);
    if (val < 25) return `provide clean water for a child for 2 weeks.`;
    if (val < 50) return `plant 5 native trees in a reforestation zone.`;
    if (val < 100) return `supply school materials for 3 underprivileged students.`;
    return `fund a community health workshop for 20 people.`;
  };

  return (
    <div className="mx-auto max-w-2xl text-center py-12">
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-primary animate-in zoom-in duration-700">
        <svg
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <Heading level={1} className="mb-4">You&apos;re a Hero, {donor}!</Heading>
      <p className="mb-8 text-lg text-gray-600">
        Thank you for your generous gift of <span className="font-bold text-primary">${amount}</span> to <span className="font-bold">{program}</span>.
      </p>

      <div className="rounded-2xl bg-primary/5 p-8 border border-primary/10 mb-10 text-left relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">The Impact of Your Gift</p>
          <p className="text-xl font-medium text-gray-800">
            Your ${amount} will {getImpact(amount)}
          </p>
        </div>
        {/* Subtle background icon */}
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Heart className="w-40 h-40 fill-primary text-primary" />
        </div>
      </div>

      <div className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Multiply your impact</p>
        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">Did you know that donors who share their impact inspire an average of 2 more people to give? Be the catalyst for more hope.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              name: "WhatsApp",
              icon: <MessageCircle className="w-6 h-6" />,
              color: "hover:bg-green-500 hover:text-white border-green-200 text-green-700",
              getHref: (origin: string) => `https://wa.me/?text=${encodeURIComponent(`I just made a meaningful contribution to support "${program}" on GiveHope. It feels incredible to see the direct impact. Join me in creating real, verified change: ${origin}`)}`
            },
            {
              name: "LinkedIn",
              icon: <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
              color: "hover:bg-blue-600 hover:text-white border-blue-200 text-blue-700",
              getHref: (origin: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(origin)}`
            },
            {
              name: "X",
              icon: <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
              color: "hover:bg-black hover:text-white border-gray-300 text-gray-700",
              getHref: (origin: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I'm proud to support ${program} with a donation via @GiveHope. Their transparency shows exactly where the money goes. Join me!`)}&url=${encodeURIComponent(origin)}`
            }
          ].map((platform) => (
            <button
              key={platform.name}
              onClick={() => {
                const origin = typeof window !== 'undefined' ? window.location.origin : 'https://givehope-iota.vercel.app';
                window.open(platform.getHref(origin), '_blank', 'noopener,noreferrer');
              }}
              title={`Share on ${platform.name}`}
              className="bg-transparent border-none p-0 cursor-pointer"
            >
              <Button variant="outline" size="icon" className={`bg-white transition-all duration-300 rounded-full shadow-sm ${platform.color}`}>
                {platform.icon}
              </Button>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/programs" className="w-full sm:w-auto">
          <Button className="w-full">Explore More Programs</Button>
        </Link>
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="ghost" className="w-full text-gray-500">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default function DonationSuccessPage() {
  return (
    <Section className="flex-1 flex items-center py-12">
      <Container>
        <Suspense fallback={<div className="text-center">Loading confirmation...</div>}>
          <SuccessContent />
        </Suspense>
      </Container>
    </Section>
  );
}
