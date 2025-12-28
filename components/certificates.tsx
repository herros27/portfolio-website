"use client";

import React from "react";
import SectionHeading from "./ui/section-heading";
import { useSectionInView } from "@/lib/hooks";
import InfiniteMovingCards from "./ui/infinite-moving-cards";

interface CertificateData {
  title: string;
  description: string | null;
  imageUrl: string | null;
  tags: string[];
  issueDate: Date;
  credentialUrl: string | null;
}

interface CertificatesProps {
  certificates: CertificateData[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  const { ref } = useSectionInView("Certificates", 0.1);

  // Transform data to match the format expected by InfiniteMovingCards
  const items = certificates.map((cert) => ({
    title: cert.title,
    description: cert.description || "",
    imageUrl: cert.imageUrl || "",
    tags: cert.tags,
    issueDate: cert.issueDate,
    credentialUrl: cert.credentialUrl,
  }));

  return (
    <section ref={ref as React.LegacyRef<HTMLElement>} id='certificates' className='py-10 z-30'>
      <SectionHeading>My Certificates</SectionHeading>
      <div className='overflow-hidden '>
        <InfiniteMovingCards
          items={items}
          direction='right'
          speed='normal'
          pauseOnHover={true}
          className='will-change-transform transform-gpu mt-10'
        />
      </div>
    </section>
  );
}
