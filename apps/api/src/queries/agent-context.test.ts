import { describe, expect, test } from "bun:test";

import { agentContextOutputSchema } from "../contract";
import { buildAgentContext } from "./agent-context";

describe("agent context", () => {
  test("documents template apps, bindings, guardrails, and commands", () => {
    const context = buildAgentContext("2026-06-04T00:00:00.000Z");

    expect(agentContextOutputSchema.parse(context)).toEqual(context);
    expect(context.project).toEqual({
      name: "waypoint-guest-app",
      template: "waypoint-product-template",
    });
    expect(context.apps.map((app) => app.name)).toEqual(["web", "api", "internal"]);
    expect(context.apps.find((app) => app.name === "api")).toMatchObject({
      bindings: ["CACHE", "DB", "INTERNAL"],
      vars: expect.arrayContaining(["BETTER_AUTH_SECRET", "PUBLIC_APP_URL"]),
    });
    expect(context.commands.checkTypes).toBe("bun run check-types");
    expect(context.commands.inspect).toContain("inspect platform.config.ts --json");
    expect(context.commands.buildArtifacts).toContain("buildAppArtifact");
    expect(context.guardrails).toContain(
      "Do not import API runtime modules into the browser bundle.",
    );
  });
});
