"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "./Reveal";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is the AdlER Suite?",
    answer: "The AdlER Suite is a unified family of ERP, Human Capital Management (HCM), mobility portals, facility management (Profac), and IoT telemetry platforms developed specifically for large B2B corporations and conglomerates operating in the GCC region.",
  },
  {
    question: "How does AdlER support GCC Wage Protection System (WPS) compliance?",
    answer: "AdlER features an integrated WPS compiler that automatically pulls monthly salary files, structures them into WPS-compliant SIF files, and handles payroll encryption handshakes with major banks (QNB, Doha Bank, etc.) under local labor ministry guidelines.",
  },
  {
    question: "Can AdlER be deployed on-premise?",
    answer: "Yes. To satisfy data sovereignty and compliance requirements for public and private organizations, AdlER supports private cloud, public cloud, and complete on-premise database deployments with full localized backup redundancy.",
  },
  {
    question: "Does AdlER integrate with existing SAP or Oracle ERP nodes?",
    answer: "Yes, AdlER comes with pre-built REST and GraphQL API connectors to integrate with legacy SAP, Oracle, and Microsoft Dynamics structures, allowing you to run localized WPS, ESS, or facility management layers on top of your global core.",
  },
  {
    question: "Which GCC sectors is AdlER engineered for?",
    answer: "AdlER supports 10+ industries, including real estate development, oil & gas, hospitality, logistics, healthcare, retail distribution, and facility operations.",
  },
];

function FaqAccordionItem({ faq, index }: { faq: FaqItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <Reveal delay={index * 60} duration={600} variant="fade-up">
      <div className="border-b border-divider group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left py-5 font-display font-medium text-sm md:text-base text-text-primary hover:text-cyan transition-colors duration-300"
          data-interactive
        >
          <span className="pr-4">{faq.question}</span>
          <span
            className={`text-cyan text-lg select-none ml-4 shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : "0px",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <p className="font-body text-xs md:text-sm font-light leading-relaxed text-text-secondary pb-5 pr-8">
            {faq.answer}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function FaqSection() {
  return (
    <section className="relative w-full bg-bg-base py-24">
      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-12 z-10">
        
        {/* Title Header */}
        <div className="mb-16 text-center">
          <Reveal variant="blur-in">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              SUPPORT & DETAILS
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
              Frequently asked questions.
            </h2>
          </Reveal>
        </div>

        {/* Accordions */}
        <div className="flex flex-col border-t border-divider">
          {faqs.map((faq, idx) => (
            <FaqAccordionItem key={idx} faq={faq} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
