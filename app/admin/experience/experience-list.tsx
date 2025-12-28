"use client";

import { useState } from "react";
import { Experience } from "@prisma/client";
import { Pencil, Trash2, RotateCcw, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { deleteExperience, restoreExperience } from "@/actions/experience";
import toast from "react-hot-toast";
import AdminCard from "@/components/admin/admin-card";

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
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
            !showDeleted
              ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-500/30 shadow-lg shadow-blue-500/10 dark:shadow-blue-500/20"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
          }`}
        >
          Active ({items.filter((e) => !e.deletedAt).length})
        </button>
        <button
          onClick={() => setShowDeleted(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
            showDeleted
              ? "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30 shadow-lg shadow-red-500/10 dark:shadow-red-500/20"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
          }`}
        >
          Deleted ({items.filter((e) => e.deletedAt).length})
        </button>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <AdminCard showBeam={false} className="p-8 text-center text-gray-600 dark:text-gray-400">
            {showDeleted ? "No deleted experiences" : "No experiences yet"}
          </AdminCard>
        ) : (
          filtered.map((exp, index) => (
            <AdminCard
              key={exp.id}
              showBeam={true}
              beamSize={200}
              beamDuration={7}
              beamDelay={index * 0.1}
              className="p-6 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-600/20 flex items-center justify-center border border-blue-200 dark:border-blue-500/30">
                      <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {exp.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exp.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      {exp.current && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
                          Current
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {exp.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {exp.deletedAt ? (
                    <button
                      onClick={() => handleRestore(exp.id)}
                      className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/10 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:scale-110"
                    >
                      <RotateCcw size={18} />
                    </button>
                  ) : (
                    <>
                      <Link
                        href={`/admin/experience/${exp.id}/edit`}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-110"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all hover:scale-110"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
