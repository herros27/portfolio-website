import { getCertificates } from "@/actions/certificates";
import Link from "next/link";
import { Plus } from "lucide-react";
import CertificatesList from "./certificates-list";

export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  // Fetch ALL certificates including deleted ones for restore functionality
  const certificates = await getCertificates(true);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Certificates</h1>
          <p className='text-gray-400 mt-1'>
            Manage your certifications and achievements
          </p>
        </div>
        <Link
          href='/admin/certificates/new'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all'>
          <Plus size={20} />
          Add Certificate
        </Link>
      </div>

      <CertificatesList certificates={certificates} />
    </div>
  );
}
