import { NavBar } from '../../components/layout/NavBar';
import { Footer } from '../../components/layout/Footer';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesGrid } from './components/FeaturesGrid';
import { CtaSection } from './components/CtaSection';

export function LandingPage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <FeaturesGrid />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
