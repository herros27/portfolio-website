import { getProject } from "@/actions/projects";
import { notFound } from "next/navigation";
import ProjectForm from "../../project-form";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectForm project={project} />;
}
