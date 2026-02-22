"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { Project } from "@/lib/types";
import { getProject } from "@/lib/projects-api";

interface ProjectContextValue {
  project: Project | null;
  setProjectId: (id: string) => void;
  refresh: () => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children, projectId }: { children: ReactNode; projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);

  const refresh = useCallback(() => {
    const p = getProject(projectId);
    setProject(p ?? null);
  }, [projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setProjectId = useCallback((id: string) => {
    const p = getProject(id);
    setProject(p ?? null);
  }, []);

  return (
    <ProjectContext.Provider value={{ project, setProjectId, refresh }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject(): ProjectContextValue {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
