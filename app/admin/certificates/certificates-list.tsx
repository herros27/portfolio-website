"use client";

import { useState } from "react";
import { Certificate } from "@prisma/client";
import { Pencil, Trash2, RotateCcw, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteCertificate, restoreCertificate } from "@/actions/certificates";
import toast from "react-hot-toast";
import AdminCard from "@/components/admin/admin-card";

interface CertificatesListProps {
  certificates: Certificate[];
}

export default function CertificatesList({ certificates }: CertificatesListProps) {
  const [items, setItems] = useState(certificates);
  const [showDeleted, setShowDeleted] = useState(false);

  const filtered = showDeleted
    ? items.filter((c) => c.deletedAt)
    : items.filter((c) => !c.deletedAt);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    const result = await deleteCertificate(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(items.map((c) => (c.id === id ? { ...c, deletedAt: new Date() } : c)));
      toast.success("Certificate deleted");
    }
  };

  const handleRestore = async (id: string) => {
    const result = await restoreCertificate(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(items.map((c) => (c.id === id ? { ...c, deletedAt: null } : c)));
      toast.success("Certificate restored");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowDeleted(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
            !showDeleted
              ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
          }`}
        >
          Active ({items.filter((c) => !c.deletedAt).length})
        </button>
        <button
          onClick={() => setShowDeleted(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
            showDeleted
              ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30 shadow-lg shadow-red-500/10 dark:shadow-red-500/20"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
          }`}
        >
          Deleted ({items.filter((c) => c.deletedAt).length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <AdminCard showBeam={false} className="col-span-full p-8 text-center text-gray-600 dark:text-gray-400">
            {showDeleted ? "No deleted certificates" : "No certificates yet"}
          </AdminCard>
        ) : (
          filtered.map((cert, index) => (
            <AdminCard
              key={cert.id}
              showBeam={true}
              beamSize={150}
              beamDuration={6}
              beamDelay={index * 0.15}
              className="overflow-hidden group"
            >
              {cert.imageUrl && (
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{cert.issuer}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  {new Date(cert.issueDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {cert.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Verify
                    </a>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    {cert.deletedAt ? (
                      <button
                        onClick={() => handleRestore(cert.id)}
                        className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/10 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-110"
                      >
                        <RotateCcw size={16} />
                      </button>
                    ) : (
                      <>
                        <Link
                          href={`/admin/certificates/${cert.id}/edit`}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-110"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all hover:scale-110"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
