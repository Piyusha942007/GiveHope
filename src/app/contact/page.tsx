"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Heart } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", subject: "general", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      label: "Email us at",
      value: "hello@givehope.org",
      href: "mailto:hello@givehope.org"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      label: "Call us at",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      label: "Visit our office",
      value: "123 Impact Way, San Francisco, CA",
      href: "#"
    }
  ];

  return (
    <div className="pt-24 md:pt-32">
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left Column — Info */}
            <div className="space-y-12">
              <div>
                <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary">Get in Touch</span>
                <Heading level={1} className="mb-6 !text-5xl md:!text-6xl">Let&apos;s talk about <span className="text-primary italic">impact.</span></Heading>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Have questions about our verified programs or how we ensure transparency? Our team is here to help you make the most informed donation possible.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {contactMethods.map((method) => (
                  <a 
                    key={method.label} 
                    href={method.href}
                    className="group p-6 rounded-2xl border border-border bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-green-500/5 transition-all duration-500"
                  >
                    <div className="mb-4 h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {method.icon}
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{method.label}</p>
                    <p className="text-gray-900 font-bold group-hover:text-primary transition-colors">{method.value}</p>
                  </a>
                ))}
                
                {/* Community Trust Badge */}
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Heart className="w-5 h-5 fill-primary" />
                    <span className="text-sm font-black uppercase tracking-tighter">Community First</span>
                  </div>
                  <p className="text-xs text-primary/70 font-bold leading-relaxed">
                    Over 12,000+ donors trust us to deliver verified impact globally.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Connect with us</p>
                <div className="flex gap-4">
                  {[
                    { icon: <Globe className="w-5 h-5" />, href: "#" },
                    { icon: <MessageSquare className="w-5 h-5" />, href: "#" },
                    { icon: <Send className="w-5 h-5" />, href: "#" }
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="h-12 w-12 rounded-full border border-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 via-transparent to-green-100/20 rounded-[2.5rem] blur-2xl -z-10" />
              
              <div className="rounded-3xl border border-border bg-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {isSuccess ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-primary">
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 font-medium">We'll get back to you within 24 hours.</p>
                    <Button 
                      variant="outline" 
                      className="mt-8 rounded-full"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                      <select
                        id="subject"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="donation">Donation Support</option>
                        <option value="press">Press & Media</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-xl text-lg font-bold"
                      isLoading={isSubmitting}
                    >
                      Send Message
                    </Button>
                    
                    <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-widest pt-2">
                      Typically responds in less than 24 hours
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
