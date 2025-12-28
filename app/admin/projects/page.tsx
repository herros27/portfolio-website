import { getProjects } from "@/actions/projects";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectsTable from "./projects-table";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Projects</h1>
          <p className='text-gray-400 mt-1'>Manage your portfolio projects</p>
        </div>
        <Link
          href='/admin/projects/new'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all'>
          <Plus size={20} />
          Add Project
        </Link>
      </div>

      {/* Projects Table */}
      <ProjectsTable projects={projects} />
    </div>
  );
}
