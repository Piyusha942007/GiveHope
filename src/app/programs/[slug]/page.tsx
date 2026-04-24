import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { DonationBox } from "@/components/features/DonationBox";
import { programs } from "@/data/programs";

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const progress = Math.min(Math.round((program.raised / program.goal) * 100), 100);
  const donorsCount = Math.floor(program.raised / 42) + 12; // Mock calculation
  const daysLeft = 12; // Mock value

  return (
    <>
      <Section className="pb-0 pt-12 md:pt-20 bg-white">
        <Container>
          <div className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500">
            <Link href="/programs" className="hover:text-primary transition-colors">Programs</Link>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-900">{program.title}</span>
          </div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-start">
            {/* Left — Content (2/3 width) */}
            <div className="lg:col-span-2 space-y-10">
              <div className="overflow-hidden rounded-3xl border border-border shadow-md">
                <img
                  src={program.image}
                  alt={program.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">{program.category}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                    Verified NGO
                  </span>
                </div>
                
                <Heading level={1} className="!text-4xl md:!text-5xl">{program.title}</Heading>
                
                <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
                  <p className="text-xl font-medium text-gray-900 leading-snug">
                    {program.description}
                  </p>
                  <p>
                    Every year, thousands of people in the target region face critical challenges due to the lack of sustainable resources. This program aims to build the necessary infrastructure to change that narrative forever. We don&apos;t just provide a one-time fix; we work with local leaders to ensure long-term maintenance and community ownership.
                  </p>
                  <p>
                    By donating today, you are directly contributing to the purchase of materials, the hiring of local labor, and the training of community managers. Your impact is measurable, verified, and reported back to you every step of the way.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-6 py-2 italic font-medium text-gray-800 text-xl">
                    &quot;This initiative isn&apos;t just about resources; it&apos;s about restoring dignity and hope to a community that has been overlooked for too long.&quot;
                  </blockquote>
                  <p>
                    Join us in making this vision a reality. We&apos;ve already seen incredible progress, but we need your help to reach the finish line. Every contribution, no matter how small, brings us one step closer to our goal.
                  </p>
                </div>
              </div>
              
              {/* Sharing Feature — More prominent */}
              <div className="rounded-2xl bg-muted/50 p-8 border border-border text-center sm:text-left mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Amplify our impact</h4>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-md">Every share brings us closer to our goal. Inspire your network to join this life-changing initiative.</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    {[
                      { 
                        name: "WhatsApp", 
                        icon: <MessageCircle className="w-5 h-5" />, 
                        color: "hover:bg-green-500 hover:text-white border-green-200 text-green-700", 
                        href: `https://wa.me/?text=I was deeply moved by the ${program.title} initiative on GiveHope. They are doing incredible, verified work on the ground, and I believe we can help them reach their goal together. Take a moment to see the impact they are making: ${encodeURIComponent("https://givehope.example/programs/" + program.slug)}` 
                      },
                      { 
                        name: "LinkedIn", 
                        icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, 
                        color: "hover:bg-blue-600 hover:text-white border-blue-200 text-blue-700", 
                        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://givehope.example/programs/" + program.slug)}` 
                      },
                      { 
                        name: "X", 
                        icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>, 
                        color: "hover:bg-black hover:text-white border-gray-300 text-gray-700", 
                        href: `https://twitter.com/intent/tweet?text=I&apos;m inspired by the ${program.title} program by @GiveHope. Real transparency, real impact. Let&apos;s make a difference together! &url=${encodeURIComponent("https://givehope.example/programs/" + program.slug)}` 
                      }
                    ].map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Share on ${platform.name}`}
                      >
                        <Button variant="outline" size="icon" className={`bg-white transition-all duration-300 rounded-full shadow-sm ${platform.color}`}>
                          {platform.icon}
                        </Button>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Donation Sidebar (1/3 width) */}
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-border bg-white p-8 shadow-xl">
                <div className="mb-8 space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-4xl font-black text-gray-900">${program.raised.toLocaleString()}</span>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">raised of ${program.goal.toLocaleString()} goal</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                      <span>{progress}% funded</span>
                      <span>{donorsCount} donors</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900 pt-2 border-t border-border/50">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {daysLeft} days left to reach goal
                  </div>
                </div>
                
                <DonationBox programName={program.title} />
              </div>

              <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10 text-center">
                <p className="text-sm font-bold text-primary leading-relaxed">
                  Your donation is 100% tax-deductible. We provide full receipting and impact tracking for every gift.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Suggested Programs */}
      <Section className="mt-20 bg-muted/30 border-t border-border">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <Heading level={3}>More initiatives to support</Heading>
            <Link href="/programs" className="text-sm font-bold text-primary hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {programs
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <div key={p.id} className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-all card-hover">
                  <Link href={`/programs/${p.slug}`} className="flex flex-col h-full">
                    <div className="aspect-video overflow-hidden">
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-900 mb-2">{p.title}</h4>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{p.category}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
