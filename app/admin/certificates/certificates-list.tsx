"use client";

import { useState } from "react";
import { Certificate } from "@prisma/client";
import { Pencil, Trash2, RotateCcw, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteCertificate, restoreCertificate } from "@/actions/certificates";
import toast from "react-hot-toast";

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
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !showDeleted
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Active ({items.filter((c) => !c.deletedAt).length})
        </button>
        <button
          onClick={() => setShowDeleted(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showDeleted
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Deleted ({items.filter((c) => c.deletedAt).length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-gray-900 rounded-xl border border-gray-800 p-8 text-center text-gray-400">
            {showDeleted ? "No deleted certificates" : "No certificates yet"}
          </div>
        ) : (
          filtered.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
            >
              {cert.imageUrl && (
                <div className="relative aspect-video bg-gray-800">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                <p className="text-gray-400 text-sm">{cert.issuer}</p>
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
                      className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Verify
                    </a>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    {cert.deletedAt ? (
                      <button
                        onClick={() => handleRestore(cert.id)}
                        className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-emerald-400 transition-colors"
                      >
                        <RotateCcw size={16} />
                      </button>
                    ) : (
                      <>
                        <Link
                          href={`/admin/certificates/${cert.id}/edit`}
                          className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
