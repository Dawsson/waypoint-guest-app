import type InternalWorker from "../../internal/src";

export interface ApiEnv {
  BETTER_AUTH_SECRET: string;
  INTERNAL: Service<typeof InternalWorker>;
  PUBLIC_APP_NAME: string;
}
