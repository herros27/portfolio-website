import { prisma } from "@/lib/db";
import {
  FolderKanban,
  Briefcase,
  Award,
  Wrench,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const [projectsCount, experienceCount, certificatesCount, skillsCount] =
    await Promise.all([
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.experience.count({ where: { deletedAt: null } }),
      prisma.certificate.count({ where: { deletedAt: null } }),
      prisma.skill.count({ where: { visible: true } }),
    ]);

  const publishedProjects = await prisma.project.count({
    where: { published: true, deletedAt: null },
  });

  return {
    projects: { total: projectsCount, published: publishedProjects },
    experience: experienceCount,
    certificates: certificatesCount,
    skills: skillsCount,
  };
}

const statCards = [
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    color: "from-blue-500 to-cyan-500",
    key: "projects" as const,
  },
  {
    name: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    key: "experience" as const,
  },
  {
    name: "Certificates",
    href: "/admin/certificates",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    key: "certificates" as const,
  },
  {
    name: "Skills",
    href: "/admin/skills",
    icon: Wrench,
    color: "from-emerald-500 to-teal-500",
    key: "skills" as const,
  },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Manage your portfolio content from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value =
            card.key === "projects"
              ? stats.projects.total
              : stats[card.key];

          return (
            <Link
              key={card.name}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {card.name}
                  </p>
                  <p className="text-4xl font-bold text-white mt-2">{value}</p>
                  {card.key === "projects" && (
                    <p className="text-sm text-gray-500 mt-1">
                      {stats.projects.published} published
                    </p>
                  )}
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${card.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Placeholder */}
        <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white transition-colors"
            >
              <FolderKanban size={18} />
              <span>Add New Project</span>
            </Link>
            <Link
              href="/admin/experience/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white transition-colors"
            >
              <Briefcase size={18} />
              <span>Add Experience</span>
            </Link>
            <Link
              href="/admin/certificates/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white transition-colors"
            >
              <Award size={18} />
              <span>Add Certificate</span>
            </Link>
            <Link
              href="/admin/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white transition-colors"
            >
              <Eye size={18} />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* View Portfolio */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-white">
              Preview Portfolio
            </h2>
          </div>
          <p className="text-gray-400 mb-6">
            See how your portfolio looks to visitors. All changes you make here
            will be reflected on the public site after saving.
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            <Eye size={18} />
            View Live Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
