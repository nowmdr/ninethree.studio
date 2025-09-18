import { ProjectDetail } from "@/components/ProjectDetail/ProjectDetail";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
