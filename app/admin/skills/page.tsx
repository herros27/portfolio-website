import { getSkills } from "@/actions/skills";
import SkillsList from "./skills-list";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
          Skills
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your technical skills and expertise
        </p>
      </div>

      <SkillsList skills={skills} />
    </div>
  );
}
