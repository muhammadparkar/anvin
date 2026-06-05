"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import JourneySection from "./components/JourneySection";
import PlatformSection from "./components/PlatformSection";
import FeatureGrid from "./components/FeatureGrid";
import ContentGenerationSection from "./components/ContentGenerationSection";
import ProductsSection from "./components/ProductsSection";
import DeploymentSection from "./components/DeploymentSection";
import ServicesSection from "./components/ServicesSection";
import SecuritySection from "./components/SecuritySection";
import ProcessSimulator from "./components/ProcessSimulator";
import ClientsSection from "./components/ClientsSection";
import NewsSection from "./components/NewsSection";
import TestimonialSection from "./components/TestimonialSection";
import FaqSection from "./components/FaqSection";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";
import DitherSeparator from "./components/DitherSeparator";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger to recalculate all offsets in the correct DOM sequence
    // after child components are fully rendered and hydrated.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <div className="relative min-h-screen flex flex-col bg-bg-base">
      {/* Global Navigation */}
      <Navbar />

      <main className="flex-1 block">
        {/* Act 1 — Hero / The Entrance */}
        <HeroSection />

        {/* Transition: Hero (bg-base) -> JourneySection (bg-base) */}
        <DitherSeparator color="#1A3050" direction="down" height={32} />
        <JourneySection />

        {/* Transition: JourneySection (bg-base) -> Platform (bg-surface) */}
        <DitherSeparator color="#0D1B2E" direction="up" height={48} />
        <PlatformSection />

        {/* Transition: Platform (bg-surface) -> FeatureGrid (bg-base) */}
        <DitherSeparator color="#0D1B2E" direction="down" height={48} />
        <FeatureGrid />

        {/* Transition: FeatureGrid (bg-base) -> ContentGenerationSection (bg-surface) */}
        <DitherSeparator color="#0D1B2E" direction="up" height={48} />
        <ContentGenerationSection />

        {/* Stagger Transition: ContentGenerationSection (bg-surface) -> Products (bg-base) */}
        <DitherSeparator color="#0D1B2E" direction="down" height={48} />
        <ProductsSection />

        {/* Transition: Products (bg-base) -> Deployment (bg-surface) */}
        <DitherSeparator color="#0D1B2E" direction="up" height={48} />
        <DeploymentSection />

        {/* Transition: Deployment (bg-surface) -> Services (bg-base) */}
        <DitherSeparator color="#0D1B2E" direction="down" height={48} />
        <ServicesSection />

        {/* Transition: Services (bg-base) -> Security (bg-surface) */}
        <DitherSeparator color="#0D1B2E" direction="up" height={48} />
        <SecuritySection />

        {/* Transition: Security (bg-surface) -> ProcessSimulator (bg-base) */}
        <DitherSeparator color="#0D1B2E" direction="down" height={48} />
        <ProcessSimulator />

        {/* Transition: ProcessSimulator (bg-base) -> Clients (bg-surface) */}
        <DitherSeparator color="#0D1B2E" direction="up" height={48} />
        <ClientsSection />

        {/* Transition: Clients (bg-surface) -> News (bg-base) */}
        <DitherSeparator color="#0D1B2E" direction="down" height={48} />
        <NewsSection />

        {/* Stagger Transition: News (bg-base) -> Testimonial (bg-base) */}
        <DitherSeparator color="#1A3050" direction="down" height={32} />
        <TestimonialSection />

        {/* Stagger Transition: Testimonial (bg-base) -> FAQ (bg-base) */}
        <DitherSeparator color="#1A3050" direction="down" height={32} />
        <FaqSection />

        {/* Transition: FAQ (bg-base) -> CTA (bg-surface) */}
        <DitherSeparator color="#0D1B2E" direction="up" height={48} />
        <CtaBanner />

        {/* Transition: CTA (bg-surface) -> Footer (bg-base) */}
        <DitherSeparator color="#0D1B2E" direction="down" height={48} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
