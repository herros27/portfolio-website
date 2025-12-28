import { getExperiences } from "@/actions/experience";
import Link from "next/link";
import { Plus } from "lucide-react";
import ExperienceList from "./experience-list";
import { ShinyButton } from "@/components/ui/shiny-button";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  // Fetch ALL experiences including deleted ones for restore functionality
  const experiences = await getExperiences(true);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent'>
            Experience
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            Manage your work experience and education
          </p>
        </div>
        <Link href='/admin/experience/new'>
          <ShinyButton className='group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 outline-none transition hover:scale-105 active:scale-100'>
            <Plus size={20} className="transition-transform group-hover:rotate-90" />
            Add Experience
          </ShinyButton>
        </Link>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  );
}
