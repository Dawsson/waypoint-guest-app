import {
  app,
  appSlot,
  binding,
  deploy,
  logging,
  permissions,
  roles,
  variable,
} from "@waypoint/core";
import { z } from "zod";

const permissionCatalog = permissions({
  account: ["read", "manage"],
  project: ["read", "manage"],
  settings: ["read", "manage"],
} as const);

export const appPermissions = permissionCatalog.values;

export const appRoles = roles({
  owner: {
    label: "Owner",
    permissions: ["*"],
  },
  viewer: {
    label: "Viewer",
    permissions: ["account:read", "project:read", "settings:read"],
  },
});

export default app({
  apps: {
    api: appSlot.apiWorker("apps/api/src/index.ts", {
      bindings: ["CACHE", "DB", "INTERNAL"],
      vars: [
        "API_URL",
        "APP_URL",
        "BETTER_AUTH_SECRET",
        "DEV_API_URL",
        "DEV_WEB_URL",
        "PUBLIC_APP_NAME",
        "PUBLIC_APP_URL",
      ],
    }),
    internal: appSlot.internalWorker("apps/internal/src/index.ts", { bindings: ["CACHE"] }),
    web: appSlot.tanstackStart("apps/web/src/start.ts", {
      vars: ["PUBLIC_API_URL", "PUBLIC_APP_NAME", "PUBLIC_APP_URL"],
    }),
  },
  bindings: {
    CACHE: binding.kv(),
    DB: binding.d1(),
    INTERNAL: binding.worker("internal"),
  },
  deploy: deploy.localAndGithubActions(),
  logging: logging({
    events: {
      "ai_gateway.example.requested": z.object({
        model: z.string(),
        provider: z.string(),
        streaming: z.boolean(),
      }),
      "api.health.checked": z.object({
        ok: z.boolean(),
        surface: z.literal("api"),
      }),
      "auth.guest_session.created": z.object({
        sessionId: z.string(),
        userId: z.string(),
      }),
      "stream.guest.connected": z.object({
        appName: z.string(),
        requestId: z.string().optional(),
      }),
    },
  }),
  name: "waypoint-guest-app",
  permissions: permissionCatalog,
  vars: {
    API_URL: variable.url(),
    APP_URL: variable.url(),
    BETTER_AUTH_SECRET: variable.secret(),
    DEV_API_URL: variable.optionalString(),
    DEV_WEB_URL: variable.optionalString(),
    PUBLIC_API_URL: variable.url().public(),
    PUBLIC_APP_NAME: variable.string(),
    PUBLIC_APP_URL: variable.url().public(),
  },
});
