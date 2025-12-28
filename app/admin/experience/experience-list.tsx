"use client";

import { useState } from "react";
import { Experience } from "@prisma/client";
import { Pencil, Trash2, RotateCcw, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { deleteExperience, restoreExperience } from "@/actions/experience";
import toast from "react-hot-toast";

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const [items, setItems] = useState(experiences);
  const [showDeleted, setShowDeleted] = useState(false);

  const filtered = showDeleted
    ? items.filter((e) => e.deletedAt)
    : items.filter((e) => !e.deletedAt);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    const result = await deleteExperience(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(items.map((e) => (e.id === id ? { ...e, deletedAt: new Date() } : e)));
      toast.success("Experience deleted");
    }
  };

  const handleRestore = async (id: string) => {
    const result = await restoreExperience(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(items.map((e) => (e.id === id ? { ...e, deletedAt: null } : e)));
      toast.success("Experience restored");
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
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
          Active ({items.filter((e) => !e.deletedAt).length})
        </button>
        <button
          onClick={() => setShowDeleted(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showDeleted
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Deleted ({items.filter((e) => e.deletedAt).length})
        </button>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center text-gray-400">
            {showDeleted ? "No deleted experiences" : "No experiences yet"}
          </div>
        ) : (
          filtered.map((exp) => (
            <div
              key={exp.id}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      {exp.current && " (Current)"}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-400 text-sm line-clamp-2">
                    {exp.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {exp.deletedAt ? (
                    <button
                      onClick={() => handleRestore(exp.id)}
                      className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <RotateCcw size={18} />
                    </button>
                  ) : (
                    <>
                      <Link
                        href={`/admin/experience/${exp.id}/edit`}
                        className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
