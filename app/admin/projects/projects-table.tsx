"use client";

import { useState } from "react";
import { Project } from "@prisma/client";
import {
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  RotateCcw,
  ExternalLink,
  Github,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteProject, restoreProject, toggleProjectPublish } from "@/actions/projects";
import toast from "react-hot-toast";

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const [items, setItems] = useState(projects);
  const [showDeleted, setShowDeleted] = useState(false);

  const filteredProjects = showDeleted
    ? items.filter((p) => p.deletedAt)
    : items.filter((p) => !p.deletedAt);

  const handleTogglePublish = async (id: string) => {
    const result = await toggleProjectPublish(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(
        items.map((p) =>
          p.id === id ? { ...p, published: result.published ?? false } : p
        )
      );
      toast.success(
        result.published ? "Project published" : "Project unpublished"
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const result = await deleteProject(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(
        items.map((p) =>
          p.id === id ? { ...p, deletedAt: new Date() } : p
        )
      );
      toast.success("Project deleted");
    }
  };

  const handleRestore = async (id: string) => {
    const result = await restoreProject(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(items.map((p) => (p.id === id ? { ...p, deletedAt: null } : p)));
      toast.success("Project restored");
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowDeleted(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !showDeleted
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Active ({items.filter((p) => !p.deletedAt).length})
        </button>
        <button
          onClick={() => setShowDeleted(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            showDeleted
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Deleted ({items.filter((p) => p.deletedAt).length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {showDeleted ? "No deleted projects" : "No projects yet. Create your first project!"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                    Project
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                    Tags
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                    Links
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {project.imageUrl && (
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-800">
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">
                            {project.title}
                          </p>
                          <p className="text-gray-500 text-sm line-clamp-1 max-w-xs">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-gray-800 text-gray-400 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                            title="GitHub"
                          >
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(project.id)}
                        disabled={!!project.deletedAt}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          project.published
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-gray-700 text-gray-400"
                        } ${project.deletedAt ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"}`}
                      >
                        {project.published ? (
                          <>
                            <Eye size={12} />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {project.deletedAt ? (
                          <button
                            onClick={() => handleRestore(project.id)}
                            className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-emerald-400 transition-colors"
                            title="Restore"
                          >
                            <RotateCcw size={16} />
                          </button>
                        ) : (
                          <>
                            <Link
                              href={`/admin/projects/${project.id}/edit`}
                              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
