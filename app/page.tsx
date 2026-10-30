import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Compare } from "@/components/sections/Compare";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Lessons } from "@/components/sections/Lessons";
import { PythagorasLesson } from "@/components/sections/PythagorasLesson";
import { Audience } from "@/components/sections/Audience";
import { WhyNow } from "@/components/sections/WhyNow";
import { Vision } from "@/components/sections/Vision";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Compare />
        <HowItWorks />
        <Lessons />
        <PythagorasLesson />
        <Audience />
        <WhyNow />
        <Vision />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
