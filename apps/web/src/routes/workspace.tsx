import { createFileRoute, redirect } from "@tanstack/react-router";
import { WorkspaceHome } from "../app";
import { authClient } from "../auth";

export const Route = createFileRoute("/workspace")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: "/" });
    }
  },
  component: WorkspaceHome,
});
