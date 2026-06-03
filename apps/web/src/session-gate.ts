import { getSessionCookie } from "better-auth/cookies";

const passthroughPrefixes = [
  "/@fs/",
  "/@id/",
  "/@react-refresh",
  "/@vite/",
  "/assets/",
  "/favicon",
  "/node_modules/",
  "/robots.txt",
  "/src/",
] as const;

const isDocumentNavigation = (request: Request) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return false;
  }

  const url = new URL(request.url);
  if (passthroughPrefixes.some((prefix) => url.pathname.startsWith(prefix))) {
    return false;
  }

  const accept = request.headers.get("accept");
  return !accept || accept.includes("text/html") || accept.includes("*/*");
};

export const hasSessionCookie = (request: Request) => {
  return Boolean(getSessionCookie(request));
};

export const requireWorkspaceSession = (request: Request) => {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/workspace")) {
    return null;
  }

  if (!isDocumentNavigation(request) || hasSessionCookie(request)) {
    return null;
  }

  return Response.redirect(new URL("/", request.url), 302);
};
