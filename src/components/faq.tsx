
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollAnimationWrapper } from './scroll-animation-wrapper';

const faqItems = [
  {
    question: 'What is PropertyPro?',
    answer:
      'PropertyPro is a smart property management platform designed to simplify the rental process for both landlords and tenants. We use AI to help with rent suggestions, tenant communication, listing flats, and finding the perfect flatmate.',
  },
  {
    question: 'Which cities are you live in?',
    answer:
      'Currently, our primary focus is on major metropolitan areas in India, including Bangalore, Mumbai, Delhi, and Pune. We are constantly expanding to new cities!',
  },
  {
    question: 'How is PropertyPro different from other platforms?',
    answer:
      "Unlike simple listing sites or unverified social media groups, PropertyPro is an integrated platform. We offer AI-powered tools for landlords (like rent suggestions and maintenance tracking) and a unique, personality-driven matching system for tenants and flatmates. Our goal is to create a more trustworthy and efficient rental ecosystem.",
  },
  {
    question: 'How can PropertyPro help me?',
    answer:
      'If you are a landlord, we help you manage your entire portfolio, from listing properties and creating leases to tracking maintenance and analyzing your revenue. If you are a tenant, we help you find the perfect flat or flatmate through our intuitive swipe-based interface and detailed profiles.',
  },
  {
    question: 'Who can list a flat on the platform?',
    answer:
      'Property owners, current tenants looking for a flatmate, and authorized property managers are all welcome to list properties on PropertyPro.',
  },
  {
    question: 'Who is Mitra?',
    answer:
      'Mitra is your AI-powered rental assistant on PropertyPro. Mitra can help you find listings, answer questions about the rental market, and even draft communications, making the entire process faster and more convenient.',
  },
  {
    question: 'How can I list my flat/property?',
    answer:
      "Listing your property is simple! Once you sign up as a landlord, you can navigate to the 'Properties' section in your dashboard and click 'Add Property'. Fill in the details, and your listing will be ready in minutes.",
  },
  {
    question: 'How can I find a flat?',
    answer:
      'After signing up, head to the "Listings" page in your dashboard. You can swipe through available properties, and swipe up to save the ones you are interested in. You can also use our AI Assistant to find flats based on your specific requirements.',
  },
  {
    question: 'Is there a fee to join?',
    answer:
      'Joining PropertyPro and browsing listings is completely free. We offer premium features for landlords and property managers to enhance their management capabilities, but our core services are accessible to everyone.',
  },
];

export function Faq() {
  return (
    <section className="bg-orange-50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              You Might Be <span className="text-primary">Wondering...</span>
            </h2>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <div className="mx-auto max-w-3xl rounded-2xl bg-card p-6 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="border-b"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
