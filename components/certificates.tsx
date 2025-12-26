// certificates.tsx

"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { certificatesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import InfiniteMovingCards from "./infinite-moving-cards";

export default function Certificates() {
  const { ref } = useSectionInView("Certificates", 0.5);

  return (
    <section ref={ref as any} id='certificates' className='py-20 '>
      <SectionHeading>My Certificates</SectionHeading>
      <div>
        <InfiniteMovingCards
          // Langsung teruskan data tanpa .map()
          items={certificatesData}
          direction='right'
          speed='normal'
          pauseOnHover={false}
          className='mt-10 sm:mt-20'
        />
      </div>
    </section>
  );
}
