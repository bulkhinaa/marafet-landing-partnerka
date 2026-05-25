import { StickyNav } from "@/components/ui/StickyNav";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorks/HowItWorksSection";
import { EarningsTreeSection } from "@/components/sections/EarningsTree/EarningsTreeSection";
import { CalculatorSection } from "@/components/sections/Calculator/CalculatorSection";
import { LegalSection } from "@/components/sections/Legal/LegalSection";
import { AudienceSection } from "@/components/sections/Audience/AudienceSection";
import { FAQSection } from "@/components/sections/FAQ/FAQSection";
import { DownloadSection } from "@/components/sections/Download/DownloadSection";
import { FooterSection } from "@/components/sections/Footer/FooterSection";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main className="overflow-x-hidden">
        <HeroSection />
        <HowItWorksSection />
        <EarningsTreeSection />
        <CalculatorSection />
        <LegalSection />
        <AudienceSection />
        <FAQSection />
        <DownloadSection />
      </main>
      <FooterSection />
    </>
  );
}
