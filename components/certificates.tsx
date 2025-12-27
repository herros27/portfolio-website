// certificates.tsx

"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { certificatesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import InfiniteMovingCards from "./ui/infinite-moving-cards";

export default function Certificates() {
  const { ref } = useSectionInView("Certificates", 0.20);

  return (
    <section ref={ref as any} id='certificates' className='py-10 z-30'>
      <SectionHeading>My Certificates</SectionHeading>
      <div className='overflow-hidden '>
        <InfiniteMovingCards
          // Langsung teruskan data tanpa .map()
          items={certificatesData}
          direction='right'
          speed='normal'
          pauseOnHover={true}
          
          className='will-change-transform transform-gpu mt-10   '
        />
      </div>
    </section>
  );
}
