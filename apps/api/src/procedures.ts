import { createApi } from "@waypoint/backend";
import type { ApiEnv } from "./env";

export const api = createApi<ApiEnv>();

const guestIdentity = api.middleware("guest.identity", async (_ctx, next) => {
  // Placeholder for the real guest session behavior:
  // create or load an anonymous guest identity, then attach it to ctx.auth.
  await next();
});

export const publicProcedure = api.procedure();
export const guestProcedure = api.procedure().use(guestIdentity);
