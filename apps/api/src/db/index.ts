import { createWaypointDb } from "@waypoint/db";
import type { ApiEnv } from "../env";
import * as schema from "./schema";

export const createDb = (env: ApiEnv) =>
  createWaypointDb({
    binding: env.DB,
    schema,
  });

export type AppDb = ReturnType<typeof createDb>;
export { schema };
