import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Droplets, BookOpen, Sprout } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Mission Section */}
      <Section className="bg-muted py-12 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Our Mission</span>
              <Heading level={1} className="mb-6">Empowering Communities, One Project at a Time</Heading>
              <p className="mb-8 text-lg text-gray-600 leading-relaxed">
                Founded in 2015, GiveHope was built on a simple premise: that every individual has the power to change the world. We bridge the gap between global donors and local sustainability projects that create lasting, measurable impact.
              </p>
              <div className="space-y-4 border-l-4 border-primary pl-6 py-2">
                <p className="text-xl font-medium italic text-gray-800">
                  &quot;We don&apos;t just provide aid; we build the foundations for self-sufficiency and long-term growth.&quot;
                </p>
                <cite className="block text-sm font-bold text-gray-500">— Sarah Jenkins, Founder</cite>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-300 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src="/images/about-team.png"
                alt="Our team working with local communities"
                className="relative rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl border border-border hidden sm:block animate-float">
                <div className="text-4xl font-extrabold text-primary mb-1">10+</div>
                <div className="text-sm font-bold text-gray-500 tracking-tight">Years of Service</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section id="impact">
        <Container>
          <div className="text-center mx-auto max-w-3xl mb-16">
            <Heading level={2} className="mb-4 text-center mx-auto block">Our Verified Impact</Heading>
            <p className="text-gray-600 text-center mx-auto block">
              We believe in radical transparency. Every project we fund is tracked and reported, so you know exactly where your contribution went and who it helped.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: <Droplets className="w-10 h-10 text-blue-500" />,
                title: "Clean Water",
                stat: "1.2M Gallons",
                desc: "Provided annually to villages that previously lacked safe water sources."
              },
              {
                icon: <BookOpen className="w-10 h-10 text-orange-500" />,
                title: "Education",
                stat: "45 Schools",
                desc: "Built or renovated, providing a learning environment for over 15,000 students."
              },
              {
                icon: <Sprout className="w-10 h-10 text-green-500" />,
                title: "Environment",
                stat: "250k Trees",
                desc: "Planted in critical reforestation zones, restoring vital ecosystems."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-8 card-hover cursor-pointer">
                <div className="mb-6">{item.icon}</div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{item.title}</h4>
                <div className="text-2xl font-bold text-gray-900 mb-4">{item.stat}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team CTA */}
      <Section className="bg-muted/30">
        <Container className="text-center">
          <div className="mx-auto max-w-2xl">
            <Heading level={3} className="mb-6">Join Our Global Team</Heading>
            <p className="mb-10 text-gray-600">
              Whether you&apos;re looking to donate, volunteer, or partner with us, there&apos;s a place for you at GiveHope. Together, we can build a better world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/donate" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">Support Our Mission</Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Contact Us</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
