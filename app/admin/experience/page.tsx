import { getExperiences } from "@/actions/experience";
import Link from "next/link";
import { Plus } from "lucide-react";
import ExperienceList from "./experience-list";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Experience</h1>
          <p className='text-gray-400 mt-1'>
            Manage your work experience and education
          </p>
        </div>
        <Link
          href='/admin/experience/new'
          className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all'>
          <Plus size={20} />
          Add Experience
        </Link>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  );
}
