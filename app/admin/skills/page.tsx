import { getSkills } from "@/actions/skills";
import SkillsList from "./skills-list";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Skills</h1>
        <p className="text-gray-400 mt-1">
          Manage your technical skills and expertise
        </p>
      </div>

      <SkillsList skills={skills} />
    </div>
  );
}
