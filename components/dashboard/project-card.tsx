"use client";

import Link from "next/link";
import { IconFolder, IconPlus } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const date = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/dashboard/${project.id}`}>
      <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
        <CardContent className="pt-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <IconFolder className="h-4 w-4 text-foreground/40" />
              <h3 className="text-sm font-semibold text-foreground">{project.name}</h3>
            </div>
            <Badge variant="outline" className="text-[10px]">
              {project.network}
            </Badge>
          </div>
          <p className="text-xs text-foreground/40 mb-3">{date}</p>
          <div className="flex gap-4 text-xs text-foreground/50">
            <span>{project.circuits.length} circuits</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function NewProjectCard() {
  return (
    <Link href="/dashboard/new">
      <Card className="h-full border-dashed hover:border-foreground/20 transition-colors cursor-pointer">
        <CardContent className="pt-0 flex flex-col items-center justify-center h-full min-h-[120px]">
          <IconPlus className="h-5 w-5 text-foreground/30 mb-2" />
          <span className="text-xs font-medium text-foreground/40">New Project</span>
        </CardContent>
      </Card>
    </Link>
  );
}
