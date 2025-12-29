"use client";

import { useState } from "react";
import { SectionVisibility } from "@prisma/client";
import { updateSectionVisibility } from "@/actions/settings";
import toast from "react-hot-toast";
import {
  Home,
  User,
  Award,
  FolderGit2,
  Wrench,
  Briefcase,
  Mail,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

interface SettingsFormProps {
  sections: SectionVisibility[];
}

const sectionIcons: Record<string, React.ReactNode> = {
  intro: <Home size={20} />,
  about: <User size={20} />,
  certificates: <Award size={20} />,
  projects: <FolderGit2 size={20} />,
  skills: <Wrench size={20} />,
  experience: <Briefcase size={20} />,
  contact: <Mail size={20} />,
};

const sectionLabels: Record<string, string> = {
  intro: "Introduction / Hero",
  about: "About Me",
  certificates: "Certificates",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
};

export default function SettingsForm({ sections }: SettingsFormProps) {
  const [settings, setSettings] = useState<SectionVisibility[]>(sections);
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = async (section: string, currentVisible: boolean) => {
    setLoading(section);
    const result = await updateSectionVisibility(section, !currentVisible);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(
        `${sectionLabels[section] || section} ${!currentVisible ? "shown" : "hidden"}`
      );
      setSettings((prev) =>
        prev.map((s) =>
          s.section === section ? { ...s, visible: !currentVisible } : s
        )
      );
    }
    setLoading(null);
  };

  // Get visibility for a section (default to true if not found)
  const isVisible = (section: string) => {
    const setting = settings.find((s) => s.section === section);
    return setting?.visible ?? true;
  };

  const allSections = [
    "intro",
    "about",
    "certificates",
    "projects",
    "skills",
    "experience",
    "contact",
  ];

  return (
    <div className='space-y-6 text-gray-900 dark:text-white'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Settings
          </h1>
          <p className='mt-1 text-gray-600 dark:text-gray-400'>
            Manage your portfolio visibility settings
          </p>
        </div>
      </div>

      {/* Section Visibility */}
      <div
        className='rounded-xl border p-6
  bg-white border-gray-200
  dark:bg-gray-900 dark:border-gray-800'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
          Section Visibility
        </h2>

        <p className='text-sm mb-6 text-gray-600 dark:text-gray-400'>
          Toggle which sections are visible on your public portfolio.
        </p>

        <div className='grid gap-4'>
          {allSections.map((section) => {
            const visible = isVisible(section);
            const isLoading = loading === section;

            return (
              <div
                key={section}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors
    ${
      visible
        ? "bg-gray-100 border-gray-300 dark:bg-gray-800/50 dark:border-gray-700"
        : "bg-gray-50 border-gray-200 dark:bg-gray-800/20 dark:border-gray-800"
    }`}>
                <div className='flex items-center gap-4'>
                  <div
                    className={`p-2 rounded-lg
    ${
      visible
        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
        : "bg-gray-200 text-gray-500 dark:bg-gray-700/50 dark:text-gray-500"
    }`}>
                    {sectionIcons[section]}
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${
                        visible
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500"
                      }`}>
                      {sectionLabels[section] || section}
                    </h3>

                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {visible ? "Visible to visitors" : "Hidden from visitors"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggle(section, visible)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    visible
                      ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 dark:text-green-400"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                  }`}>
                  {isLoading ? (
                    <Loader2 size={18} className='animate-spin' />
                  ) : visible ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                  {visible ? "Visible" : "Hidden"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div
        className='rounded-xl p-4 border
  bg-blue-50 border-blue-200
  dark:bg-blue-500/10 dark:border-blue-500/20'>
        <p className='text-sm text-blue-700 dark:text-blue-400'>
          <strong>Note:</strong> Changes take effect immediately.
        </p>
      </div>
    </div>
  );
}
