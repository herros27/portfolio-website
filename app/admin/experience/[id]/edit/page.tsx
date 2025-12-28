import { getExperience } from "@/actions/experience";
import { notFound } from "next/navigation";
import ExperienceForm from "../../experience-form";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params;
  const experience = await getExperience(id);

  if (!experience) {
    notFound();
  }

  return <ExperienceForm experience={experience} />;
}
