import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WhyMst } from "@/components/home/WhyMst";
import { Clients } from "@/components/home/Clients";
import { CustomerStory } from "@/components/home/CustomerStory";
import { HomeCta } from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesShowcase />
      <Clients />
      <CustomerStory />
      <WhyMst />
      <HomeCta />
    </>
  );
}
