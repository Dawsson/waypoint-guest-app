import { healthStatus } from "@waypoint/backend";
import { api } from "./procedures";
import { routes } from "./router";

export default api.worker(routes, {
  health: (env) =>
    healthStatus({
      app: env.PUBLIC_APP_NAME,
      checks: { env: { detail: "PUBLIC_APP_NAME is available", ok: Boolean(env.PUBLIC_APP_NAME) } },
      surface: "worker",
    }),
  waypointAuth: ({ auth }) => auth,
});
