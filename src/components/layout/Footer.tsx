import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-black">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">GiveHope</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering communities through sustainable initiatives and transparency. Your help makes it possible.
            </p>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Programs</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/programs/clean-water-initiative" className="hover:text-primary">Clean Water</Link></li>
              <li><Link href="/programs/education-for-all" className="hover:text-primary">Education</Link></li>
              <li><Link href="/programs/hunger-relief-program" className="hover:text-primary">Hunger Relief</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Organization</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/about#impact" className="hover:text-primary">Our Impact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Connect</h4>
            <div className="flex gap-4">
              {/* Simplified social icons/links */}
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border hover:text-primary transition-colors cursor-pointer">X</a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border hover:text-primary transition-colors cursor-pointer">In</a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border hover:text-primary transition-colors cursor-pointer">Fb</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GiveHope. All rights reserved. A template for non-profits.</p>
        </div>
      </Container>
    </footer>
  );
};
