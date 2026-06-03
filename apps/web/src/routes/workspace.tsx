import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceHome } from "../app";

export const Route = createFileRoute("/workspace")({
  component: WorkspaceHome,
});
