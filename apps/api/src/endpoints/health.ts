import { healthStatus } from "@waypoint/backend";
import { publicProcedure } from "../procedures";

export const healthEndpoint = publicProcedure.health.query({
  run: ({ ctx }) =>
    healthStatus({
      app: ctx.env.PUBLIC_APP_NAME,
      checks: {
        auth: { detail: "Better Auth context initialized", ok: Boolean(ctx.auth) },
        db: { detail: "D1 Drizzle context initialized", ok: Boolean(ctx.db) },
      },
      surface: "api",
    }),
});
