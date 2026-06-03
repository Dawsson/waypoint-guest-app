import { healthEndpoint } from "./endpoints/health";
import { clearHostSessionCookieEndpoint } from "./endpoints/session-cookie";
import { api } from "./procedures";
import { guestQuery } from "./queries/guest";
import { meQuery } from "./queries/me";

export const contract = api.router({
  clearHostSessionCookie: clearHostSessionCookieEndpoint,
  guest: guestQuery,
  health: healthEndpoint,
  me: meQuery,
});
