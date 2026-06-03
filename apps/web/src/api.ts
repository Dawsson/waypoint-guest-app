import { createApiClient } from "@waypoint/backend";
import { contract } from "../../api/src/contract";
import { resolveApiUrl } from "./api-url";

export const api = createApiClient<typeof contract>({
  baseUrl: resolveApiUrl(),
  contract,
});

export const getGuest = async (id = "guest") => {
  return api.guest({ id });
};

export const guestQueryOptions = (id = "guest") => api.guest.queryOptions({ id });
export const meQueryOptions = () => api.me.queryOptions();

export type GuestQueryResult = Awaited<ReturnType<typeof getGuest>>;
