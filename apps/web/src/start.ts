import { createMiddleware, createStart } from "@tanstack/react-start";
import { requireWorkspaceSession } from "./session-gate";

const workspaceSessionGate = createMiddleware().server(async ({ next, request }) => {
  const redirect = requireWorkspaceSession(request);
  if (redirect) {
    return redirect;
  }

  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [workspaceSessionGate],
}));
