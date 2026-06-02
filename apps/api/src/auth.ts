import { createWaypointAuth } from "@waypoint/auth";
import { organization } from "better-auth/plugins";
import type { ApiEnv } from "./env";
import type { AppDb } from "./db";
import { schema } from "./db";

export const createAuth = (env: ApiEnv, db: AppDb) =>
  createWaypointAuth({
    db,
    env,
    schema,
    betterAuth: {
      emailAndPassword: {
        enabled: true,
      },
      plugins: [
        organization({
          teams: {
            enabled: true,
          },
        }),
      ],
    },
  });

export type AppAuth = ReturnType<typeof createAuth>;
