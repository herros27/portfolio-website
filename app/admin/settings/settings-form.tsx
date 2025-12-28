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
  Loader2
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
      toast.success(`${sectionLabels[section] || section} ${!currentVisible ? "shown" : "hidden"}`);
      setSettings(prev => 
        prev.map(s => s.section === section ? { ...s, visible: !currentVisible } : s)
      );
    }
    setLoading(null);
  };

  // Get visibility for a section (default to true if not found)
  const isVisible = (section: string) => {
    const setting = settings.find(s => s.section === section);
    return setting?.visible ?? true;
  };

  const allSections = ["intro", "about", "certificates", "projects", "skills", "experience", "contact"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio visibility settings</p>
        </div>
      </div>

      {/* Section Visibility */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Section Visibility</h2>
        <p className="text-gray-400 text-sm mb-6">
          Toggle which sections are visible on your public portfolio. Hidden sections will not be shown to visitors.
        </p>

        <div className="grid gap-4">
          {allSections.map((section) => {
            const visible = isVisible(section);
            const isLoading = loading === section;
            
            return (
              <div
                key={section}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  visible 
                    ? "bg-gray-800/50 border-gray-700" 
                    : "bg-gray-800/20 border-gray-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${visible ? "bg-blue-500/20 text-blue-400" : "bg-gray-700/50 text-gray-500"}`}>
                    {sectionIcons[section]}
                  </div>
                  <div>
                    <h3 className={`font-medium ${visible ? "text-white" : "text-gray-400"}`}>
                      {sectionLabels[section] || section}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {visible ? "Visible to visitors" : "Hidden from visitors"}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggle(section, visible)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    visible
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
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
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <p className="text-blue-400 text-sm">
          <strong>Note:</strong> Changes take effect immediately. Refresh your portfolio to see the updates.
        </p>
      </div>
    </div>
  );
}
