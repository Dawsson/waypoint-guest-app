import { createApiClient } from "@waypoint/backend";
import type { contract } from "../../api/src/router";

export const resolveApiUrl = () => {
  const apiUrl = import.meta.env.PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Missing PUBLIC_API_URL for Waypoint API client.");
  }

  return apiUrl;
};

export const api = createApiClient<typeof contract>({
  baseUrl: resolveApiUrl(),
});

export const getGuest = async (id = "guest") => {
  return api.guest({ id });
};

export const guestQueryOptions = () => api.guest.queryOptions();

export type GuestQueryResult = Awaited<ReturnType<typeof getGuest>>;
