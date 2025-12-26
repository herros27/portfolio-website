"use client";
import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import Certificates from "@/components/certificates";
import { WasmProvider } from "validation_semantic";
import BatchValidationExample from "@/components/form-test-dev";
export default function Home() {
  return (
    // <WasmProvider>

    // </WasmProvider>
    <main className='flex flex-col items-center'>
      {/* <WasmProvider>
        <BatchValidationExample />
      </WasmProvider> */}

      
        <Intro />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Certificates />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        {/* <SectionDivider /> */}
        <Contact />
      
    </main>
  );
}
