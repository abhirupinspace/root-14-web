"use client";

import { use } from "react";
import { ProjectProvider } from "@/contexts/project-context";

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  return <ProjectProvider projectId={projectId}>{children}</ProjectProvider>;
}
