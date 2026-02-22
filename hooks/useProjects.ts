"use client";

import { useState, useCallback, useEffect } from "react";
import { Project } from "@/lib/types";
import * as api from "@/lib/projects-api";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setProjects(api.getProjects());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    (data: { name: string; network: "testnet" | "mainnet"; circuits: string[] }) => {
      const project = api.createProject(data);
      refresh();
      return project;
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      api.deleteProject(id);
      refresh();
    },
    [refresh]
  );

  const update = useCallback(
    (id: string, updates: Partial<Pick<Project, "name" | "network" | "circuits">>) => {
      const result = api.updateProject(id, updates);
      refresh();
      return result;
    },
    [refresh]
  );

  return { projects, loading, create, remove, update, refresh };
}
