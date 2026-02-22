import { Project } from "./types";

const STORAGE_KEY = "r14_projects";

function generateId(): string {
  return `proj_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function generateApiKey(prefix: string): string {
  const chars = "abcdef0123456789";
  let key = `r14_${prefix}_`;
  for (let i = 0; i < 32; i++) key += chars[Math.floor(Math.random() * chars.length)];
  return key;
}

export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function createProject(data: { name: string; network: "testnet" | "mainnet"; circuits: string[] }): Project {
  const project: Project = {
    id: generateId(),
    name: data.name,
    network: data.network,
    apiKey: generateApiKey("live"),
    testApiKey: generateApiKey("test"),
    createdAt: new Date().toISOString(),
    circuits: data.circuits,
  };
  const projects = getProjects();
  projects.push(project);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return project;
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function updateProject(id: string, updates: Partial<Pick<Project, "name" | "network" | "circuits">>): Project | undefined {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  projects[idx] = { ...projects[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects[idx];
}

export function rotateApiKey(id: string, keyType: "apiKey" | "testApiKey"): Project | undefined {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const prefix = keyType === "apiKey" ? "live" : "test";
  projects[idx][keyType] = generateApiKey(prefix);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects[idx];
}
