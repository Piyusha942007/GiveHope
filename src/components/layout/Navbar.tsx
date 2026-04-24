"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "/programs" },
    { name: "About", href: "/about" },
    { name: "Impact", href: "/about#impact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 py-4 ${
        scrolled ? "pt-4" : "pt-6"
      }`}
    >
      <div 
        className={`mx-auto max-w-7xl transition-all duration-500 rounded-full border ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border-border/50 shadow-lg py-2" 
            : "bg-transparent border-transparent py-2"
        }`}
      >
        <Container>
          <div className="flex h-14 items-center justify-between">
            {/* Logo & Trust Signal */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110 shadow-lg shadow-green-500/20">
                  <div className="relative flex items-center justify-center w-full h-full">
                    {/* Drop */}
                    <div className="w-1.5 h-1.5 bg-white rounded-full z-10" />
                    {/* Inner Ripple */}
                    <div className="absolute w-3.5 h-3.5 border-2 border-white/70 rounded-full" />
                    {/* Outer Ripple */}
                    <div className="absolute w-5 h-5 border-[1.5px] border-white/30 rounded-full" />
                  </div>
                </div>
                <span className="text-xl font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors">
                  GiveHope
                </span>
              </Link>
              
              <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-green-50 border border-green-100/50 px-2.5 py-1">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Verified NGOs</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full group overflow-hidden ${
                      isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {/* Hover indicator (underline replacement) */}
                    <span className={`absolute bottom-0 left-0 w-full h-full bg-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 rounded-full`} />
                  </Link>
                );
              })}
              <div className="ml-4 h-8 w-px bg-gray-200 mx-2" />
              <Link href="/donate">
                <Button size="sm" className="rounded-full px-6 shadow-md hover:shadow-green-500/30 transition-all relative overflow-hidden group border border-transparent hover:border-green-400/50">
                  <span className="relative z-10 font-bold">Donate Now</span>
                  {/* Ripple Effect on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute w-24 h-24 border border-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-out" />
                    <div className="absolute w-24 h-24 border border-white/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-1000 delay-100 ease-out" />
                  </div>
                </Button>
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 transition-colors hover:bg-gray-100 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`h-0.5 w-full bg-gray-900 rounded-full transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-0.5 w-full bg-gray-900 rounded-full transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-full bg-gray-900 rounded-full transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Nav — Full Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[-1] bg-white transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-32 px-8">
          <nav className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-4xl font-black tracking-tighter transition-all duration-500 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-primary mr-4 opacity-20">0{i + 1}</span>
                {link.name}
              </Link>
            ))}
            <Link 
              href="/donate" 
              className={`mt-12 transition-all duration-500 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `400ms` }}
              onClick={() => setIsOpen(false)}
            >
              <Button size="lg" className="w-full h-16 text-xl rounded-2xl">
                Donate Now
              </Button>
            </Link>
          </nav>
          
          <div className="mt-auto mb-12 flex justify-between items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Connect with us</p>
              <div className="flex gap-4">
                <span className="font-bold text-gray-900">TW</span>
                <span className="font-bold text-gray-900">IN</span>
                <span className="font-bold text-gray-900">FB</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Join the movement</p>
              <p className="font-bold text-primary">hello@givehope.org</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
