import { createApiClient } from "@waypoint/backend";
import type { contract } from "../../api/src/router";

export const resolveApiUrl = () => {
  return process.env.PUBLIC_API_URL ?? "http://127.0.0.1:8787";
};

export const api = createApiClient<typeof contract>({
  baseUrl: resolveApiUrl(),
});

export const getGuest = async (id = "guest") => {
  return api.guest({ id });
};

export const guestQueryOptions = () => api.guest.queryOptions();

export type GuestQueryResult = Awaited<ReturnType<typeof getGuest>>;
