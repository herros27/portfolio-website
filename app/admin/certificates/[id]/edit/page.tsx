import { getCertificate } from "@/actions/certificates";
import { notFound } from "next/navigation";
import CertificateForm from "../../certificate-form";

interface EditCertificatePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCertificatePage({ params }: EditCertificatePageProps) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  if (!certificate) {
    notFound();
  }

  return <CertificateForm certificate={certificate} />;
}
