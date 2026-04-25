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
            <div className="flex flex-col gap-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Share our mission</p>
              <div className="flex gap-5">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent("Join me in supporting GiveHope! They are revolutionizing transparency in global donations. Check out their mission: https://givehope-iota.vercel.app/")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-900"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join me in supporting @GiveHope! Verified impact, 100% transparency. Join the future of global giving.")}&url=${encodeURIComponent("https://givehope-iota.vercel.app")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-900"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://givehope-iota.vercel.app")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-gray-900"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
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
