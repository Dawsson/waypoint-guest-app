import { createApi, json } from "@waypoint/backend";
import { middleware } from "@waypoint/core";
import type InternalWorker from "../../internal/src";
import { appPermissions } from "../../../platform.config";
import { z } from "zod";

export interface ApiEnv {
  BETTER_AUTH_SECRET: string;
  INTERNAL: Service<typeof InternalWorker>;
  PUBLIC_APP_NAME: string;
}

const api = createApi<ApiEnv>();

const publicProcedure = api.procedure("public");
const guestProcedure = api.procedure("guest").use(middleware.guest);
const accountProcedure = api
  .procedure("account")
  .use(middleware.auth)
  .permission(appPermissions.account.read);
const prodSettingsProcedure = api
  .procedure("prodSettings")
  .use(middleware.auth)
  .permission(appPermissions.settings.manage)
  .in("prod")
  .use(middleware.prodApproval);

void accountProcedure;
void prodSettingsProcedure;

const contract = api.router({
  endpoints: {
    health: publicProcedure.endpoint({
      method: "GET",
      path: "/health",
      run: ({ env }) =>
        json({
          app: env.PUBLIC_APP_NAME,
          ok: true,
          surface: "api",
        }),
    }),
  },
  queries: {
    guest: guestProcedure.query({
      input: z.object({
        id: z.string().default("guest"),
      }),
      run: async (ctx, input) => {
        const [user, sum] = await Promise.all([
          ctx.env.INTERNAL.getUser(input.id),
          ctx.env.INTERNAL.add(2, 3),
        ]);

        return {
          auth: "guest",
          internal: {
            sum,
            user,
          },
          message: "Guest access is enabled.",
          operation: ctx.operation.name,
        };
      },
    }),
  },
});

export default api.worker(contract);
