import { healthEndpoint } from "./endpoints/health";
import { api } from "./procedures";
import { guestQuery } from "./queries/guest";

export const contract = api.router({
  endpoints: {
    health: healthEndpoint,
  },
  queries: {
    guest: guestQuery,
  },
});
