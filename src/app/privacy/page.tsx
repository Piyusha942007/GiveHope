import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";

export default function PrivacyPage() {
  return (
    <Section className="pt-32 pb-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Heading level={1} className="mb-8">Privacy Policy</Heading>
          <div className="prose prose-lg prose-gray">
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Your privacy is fundamental to our mission of building a more transparent and trusting world.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How we use your data</h3>
            <p>
              We collect minimal information required to process your donations and keep you updated on the impact of your gifts. This typically includes your name, email address, and payment confirmation.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">100% Secure</h3>
            <p>
              We use industry-standard encryption (SSL) and secure payment processors like Stripe. We never store your credit card information on our servers.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">No Selling</h3>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Your data is used exclusively for GiveHope initiatives.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Real-time Transparency</h3>
            <p>
              If you choose to donate anonymously, your name will not appear on any public donor lists. You have full control over how you appear on our platform.
            </p>

            <div className="mt-20 p-8 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-bold text-primary">
                If you have any questions about our privacy practices, please contact us at hello@givehope-iota.vercel.app
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
