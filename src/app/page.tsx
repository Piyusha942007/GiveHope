"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ProgramGrid } from "@/components/features/ProgramGrid";
import { FloatingCard } from "@/components/features/FloatingCard";
import { HeroSection } from "@/components/features/HeroSection";
import { useDonation } from "@/context/DonationContext";
import { CircleDollarSign, Globe, Handshake, MapPin, Search, CreditCard, TrendingUp } from "lucide-react";

export default function Home() {
  const { programs, platformStats } = useDonation();

  return (
    <>
      {/* Hero Section — BFH-style split layout */}
      <HeroSection />
 
      {/* Impact Stats — Premium Cards */}
      <Section className="bg-white relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Funds Channelled", value: `$${(platformStats.fundsChannelled / 1000000).toFixed(1)}M`, icon: <CircleDollarSign className="w-8 h-8 text-primary" /> },
              { label: "Lives Impacted", value: `${(platformStats.livesImpacted / 1000).toFixed(0)}k+`, icon: <Globe className="w-8 h-8 text-primary" /> },
              { label: "Verified NGOs", value: `${platformStats.verifiedNGOs}`, icon: <Handshake className="w-8 h-8 text-primary" /> },
              { label: "Countries Reached", value: platformStats.countriesReached, icon: <MapPin className="w-8 h-8 text-primary" /> },
            ].map((stat) => (
              <div key={stat.label} className="group relative rounded-2xl border border-border bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-black text-gray-900 mb-1 group-hover:text-primary transition-colors">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                <div className="absolute top-0 right-0 h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it Works */}
      <Section className="bg-muted/30">
        <Container>
          <div className="text-center mx-auto max-w-3xl mb-12">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-primary">Simple & Secure</span>
            <Heading level={2} className="mb-6">Make an impact in 3 simple steps</Heading>
            {/* Trust Line */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-bold text-gray-500">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> No login required</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Secure payments</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Verified NGOs only</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 relative mb-12">
            {/* Desktop Connectors */}
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-gray-200 -translate-y-1/2 z-0" />

            {[
              { step: "01", title: "Choose a Program", desc: "Browse our list of verified NGOs and select a cause that resonates with you.", icon: <Search className="w-6 h-6" /> },
              { step: "02", title: "Make a Donation", desc: "Use our secure, frictionless widget to donate any amount in seconds.", icon: <CreditCard className="w-6 h-6" /> },
              { step: "03", title: "Track Your Impact", desc: "Receive real-time updates and impact reports directly from the field.", icon: <TrendingUp className="w-6 h-6" /> },
            ].map((item, i) => (
              <div 
                key={item.step} 
                className="relative z-10 bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-border transition-all duration-500 group hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-gray-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary/40">{item.step}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
            <Link href="/donate">
              <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-green-500/20">
                Start Donating
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Featured Programs */}
      <Section id="programs">
        <Container>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Active Causes</span>
              <Heading level={2} className="mb-4">Make an Impact Today</Heading>
              <p className="text-gray-600 text-lg">
                These urgent programs need your support right now. Every dollar counts.
              </p>
            </div>
            <Link href="/programs">
              <Button variant="ghost" className="transition-transform hover:translate-x-1 font-bold">
                Browse All Programs →
              </Button>
            </Link>
          </div>
          
          <ProgramGrid programs={programs} limit={3} />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-muted/50">
        <Container>
          <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Testimonials</span>
            <Heading level={2} className="mb-4">What Our Donors Say</Heading>
            <p className="text-gray-600">
              Join a global community of over 12,000 donors who trust GiveHope to deliver impact where it&apos;s needed most.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                name: "David Chen",
                location: "Singapore",
                quote: "The transparency at GiveHope is unmatched. I love receiving the impact reports and seeing exactly how my contribution helps.",
                avatar: "https://i.pravatar.cc/150?u=david"
              },
              {
                name: "Elena Rodriguez",
                location: "Madrid, Spain",
                quote: "Supporting the Clean Water Initiative was so easy. The donation flow is frictionless, and the cause is vital.",
                avatar: "https://i.pravatar.cc/150?u=elena"
              },
              {
                name: "Marcus Thorne",
                location: "London, UK",
                quote: "I&apos;ve been a recurring donor for 2 years now. GiveHope makes me feel connected to the communities they serve.",
                avatar: "https://i.pravatar.cc/150?u=marcus"
              }
            ].map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl bg-white p-8 shadow-sm border border-border card-hover cursor-pointer">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 text-gray-700 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full border-2 border-primary/10" />
                  <div>
                    <h5 className="font-bold text-gray-900 leading-none mb-1">{testimonial.name}</h5>
                    <p className="text-xs text-gray-500 font-medium">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* About CTA */}
      <Section className="bg-primary text-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading level={2} className="mb-6 !text-white">
              Ready to create a lasting impact?
            </Heading>
            <p className="mb-10 text-lg opacity-90">
              Your support directly funds sustainable solutions for water, education, and health in communities that need it most. We pride ourselves on 100% transparency and verified impact.
            </p>
            <Link href="/about">
              <Button variant="secondary" size="lg">
                Our Impact Story
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
