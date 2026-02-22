"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IconAlertTriangle, IconKey, IconNetwork } from "@tabler/icons-react";
import { ApiKeyCard } from "@/components/dashboard/api-key-card";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useProject } from "@/contexts/project-context";
import { deleteProject, updateProject, rotateApiKey } from "@/lib/projects-api";

export default function ProjectSettingsPage() {
  const router = useRouter();
  const { project, refresh } = useProject();
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!project) return null;

  function handleNetworkChange(network: "testnet" | "mainnet") {
    updateProject(project!.id, { network });
    refresh();
  }

  function handleRotateKey(keyType: "apiKey" | "testApiKey") {
    rotateApiKey(project!.id, keyType);
    refresh();
  }

  function handleDelete() {
    deleteProject(project!.id);
    setDeleteOpen(false);
    router.push("/dashboard");
  }

  return (
    <div className="space-y-8">
      <ProjectHeader title="Settings" description="Manage project configuration." />

      {/* API Keys */}
      <ApiKeyCard
        apiKey={project.apiKey}
        testApiKey={project.testApiKey}
        onRotate={handleRotateKey}
      />

      {/* Network */}
      <Card>
        <CardHeader className="flex! flex-row items-center gap-2">
          <IconNetwork className="h-4 w-4 text-foreground/50" />
          <CardTitle className="text-sm font-medium">Network</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={project.network} onValueChange={(v) => handleNetworkChange(v as "testnet" | "mainnet")}>
            <SelectTrigger className="max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="testnet">Testnet</SelectItem>
              <SelectItem value="mainnet">Mainnet</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200/60">
        <CardHeader className="flex! flex-row items-center gap-2">
          <IconAlertTriangle className="h-4 w-4 text-red-500" />
          <CardTitle className="text-sm font-medium text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-foreground/50 mb-3">
            Delete this project and all associated data. This cannot be undone.
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
          >
            Delete Project
          </Button>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Project"
        description={`This will permanently delete "${project.name}" and all its data.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
      />
    </div>
  );
}
