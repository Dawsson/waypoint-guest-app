import { json } from "@waypoint/backend";
import { publicProcedure } from "../procedures";

export const healthEndpoint = publicProcedure.endpoint({
  method: "GET",
  path: "/health",
  run: ({ env }) =>
    json({
      app: env.PUBLIC_APP_NAME,
      ok: true,
      surface: "api",
    }),
});
