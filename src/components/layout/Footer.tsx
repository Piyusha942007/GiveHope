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
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-900">Connect & Share</h4>
            <div className="flex flex-wrap gap-4">
              {/* WhatsApp Share */}
              <a 
                href={`https://wa.me/?text=${encodeURIComponent("Join me in supporting GiveHope! They are revolutionizing transparency in global donations. Check out their mission: https://givehope-iota.vercel.app/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-border shadow-sm hover:text-green-500 hover:border-green-200 transition-all cursor-pointer group"
                title="Share on WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* LinkedIn Share */}
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://givehope-iota.vercel.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-border shadow-sm hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer group"
                title="Share on LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* X (Twitter) Share */}
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join me in supporting @GiveHope! Verified impact, 100% transparency. Join the future of global giving.")}&url=${encodeURIComponent("https://givehope-iota.vercel.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-border shadow-sm hover:text-black hover:border-black/20 transition-all cursor-pointer group"
                title="Share on X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook Share */}
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://givehope-iota.vercel.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-border shadow-sm hover:text-blue-700 hover:border-blue-200 transition-all cursor-pointer group"
                title="Share on Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
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
