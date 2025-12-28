"use client";

import { useState } from "react";
import { Skill } from "@prisma/client";
import { Eye, EyeOff, Trash2, Plus, Loader2 } from "lucide-react";
import { createSkill, deleteSkill, toggleSkillVisibility } from "@/actions/skills";
import toast from "react-hot-toast";

interface SkillsListProps {
  skills: Skill[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  const [items, setItems] = useState(skills);
  const [newSkill, setNewSkill] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!newSkill.trim()) return;
    setIsAdding(true);
    try {
      const result = await createSkill({
        name: newSkill.trim(),
        order: items.length + 1,
        visible: true,
      });
      if (result.error) {
        toast.error(typeof result.error === "string" ? result.error : "Failed to add skill");
      } else if (result.data) {
        setItems([...items, result.data]);
        setNewSkill("");
        toast.success("Skill added");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const result = await toggleSkillVisibility(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(
        items.map((s) => (s.id === id ? { ...s, visible: result.visible ?? false } : s))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    const result = await deleteSkill(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      setItems(items.filter((s) => s.id !== id));
      toast.success("Skill deleted");
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Skill */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Add New Skill</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Enter skill name..."
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAdd}
            disabled={isAdding || !newSkill.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {isAdding ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Plus size={18} />
            )}
            Add
          </button>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Your Skills</h3>
          <span className="text-sm text-gray-400">
            {items.filter((s) => s.visible).length} visible / {items.length} total
          </span>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No skills yet. Add your first skill above!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((skill) => (
              <div
                key={skill.id}
                className={`group flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                  skill.visible
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-800/50 border-gray-800 opacity-60"
                }`}
              >
                <span className="text-white font-medium truncate">
                  {skill.name}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleVisibility(skill.id)}
                    className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    title={skill.visible ? "Hide" : "Show"}
                  >
                    {skill.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
