import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustedMarquee from "@/components/TrustedMarquee";
import REIHero from "@/components/REIHero";
import AgentOrbit from "@/components/AgentOrbit";
import UseCaseAISRE from "@/components/UseCaseAISRE";
import WorkflowFlow from "@/components/WorkflowFlow";
import UseCaseFinOps from "@/components/UseCaseFinOps";
import UseCaseObservability from "@/components/UseCaseObservability";
import AstraGrid from "@/components/AstraGrid";
import StatsBand from "@/components/StatsBand";
import Testimonial from "@/components/Testimonial";
import Integrations from "@/components/Integrations";
import DemoCTA from "@/components/DemoCTA";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <main data-testid="landing-page">
      <Nav />
      <Hero />
      <TrustedMarquee />
      <REIHero />
      <AgentOrbit />
      <UseCaseAISRE />
      <WorkflowFlow />
      <UseCaseFinOps />
      <UseCaseObservability />
      <AstraGrid />
      <StatsBand />
      <Testimonial />
      <Integrations />
      <DemoCTA />
      <Footer />
    </main>
  );
}
