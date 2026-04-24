"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/Typewriter";
import { FloatingCard } from "./FloatingCard";

export const HeroSection = () => {
  return (
    <Section className="relative bg-muted/30 overflow-hidden" spaced={false}>
      <Container className="py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-primary border border-green-100/50 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Empowering Lives Today
            </div>

            <h1 className="mb-8 text-4xl font-black tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-[1.05]">
              Where every<br />
              <span className="text-gray-900">
                drop builds
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400 italic inline-block min-h-[1.2em]">
                <Typewriter
                  words={["hope.", "change.", "futures.", "lives."]}
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseDuration={1000}
                />
              </span>
            </h1>

            <p className="mx-auto lg:mx-0 mb-12 max-w-xl text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              GiveHope is the world&apos;s most trusted frictionless giving platform. We ensure your donation goes directly to verified causes with 100% transparency.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link href="/donate" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg px-10 h-14 shadow-xl shadow-green-500/30">
                  Start donating
                </Button>
              </Link>
              <Link href="/programs" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full text-lg px-10 h-14 bg-white/50 backdrop-blur-sm border-gray-200">
                  View Programs
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — High Impact Image with Card Overlay */}
          <div className="relative group mt-12 lg:mt-0">
            {/* Main Image */}
            <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white">
              <img 
                src="/images/hero-impact.png" 
                alt="Impactful humanitarian mission" 
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlaid Card (Subscript style) */}
            <div className="absolute -bottom-14 -right-6 sm:-right-14 z-20 animate-in slide-in-from-right-8 fade-in duration-1000 delay-300 fill-mode-both">
              <div className="transform transition-transform duration-500 hover:scale-[1.02]">
                <FloatingCard />
              </div>
            </div>

            {/* Decorative blurs behind the image */}
            <div className="absolute -z-10 -top-10 -right-10 h-64 w-64 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute -z-10 -bottom-10 -left-10 h-64 w-64 bg-green-200/20 rounded-full blur-[80px] animate-pulse delay-700" />
          </div>
        </div>
      </Container>

      {/* Background blurs — Global Mesh */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-green-100/40 blur-[120px] opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px] opacity-60" />

      {/* Background blurs — More sophisticated */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-green-100/40 blur-[120px] opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px] opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-green-50/30 blur-[100px] opacity-40" />
    </Section>
  );
};
