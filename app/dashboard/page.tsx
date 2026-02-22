"use client";

import { IconFolder } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ProjectCard, NewProjectCard } from "@/components/dashboard/project-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { useProjects } from "@/hooks/useProjects";
import Link from "next/link";

export default function DashboardPage() {
  const { projects, loading } = useProjects();

  if (loading) return null;

  return (
    <div className="space-y-8">
      <ProjectHeader
        title="Projects"
        actions={
          <Link href="/dashboard/new">
            <Button size="sm">+ New Project</Button>
          </Link>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={<IconFolder className="h-10 w-10" />}
          title="No projects yet"
          description="Create your first Root14 project to get started."
          action={
            <Link href="/dashboard/new">
              <Button>Create Project</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
          <NewProjectCard />
        </div>
      )}
    </div>
  );
}
