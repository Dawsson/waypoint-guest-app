import { publicProcedure } from "../procedures";

const expiredHostCookie = (name: string) =>
  `${name}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None`;

export const clearHostSessionCookieEndpoint = publicProcedure.endpoint({
  method: "POST",
  path: "/session/clear-host-cookie",
  run: () => {
    const response = Response.json({ ok: true });
    response.headers.append(
      "set-cookie",
      expiredHostCookie("__Secure-better-auth.session_token"),
    );
    response.headers.append("set-cookie", expiredHostCookie("better-auth.session_token"));
    return response;
  },
});
