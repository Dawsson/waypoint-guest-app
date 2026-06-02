import { createApi } from "@waypoint/backend";
import { middleware } from "@waypoint/core";
import type { ApiEnv } from "./env";

export const api = createApi<ApiEnv>();

export const publicProcedure = api.procedure();
export const guestProcedure = api.procedure().use(middleware.guest);
