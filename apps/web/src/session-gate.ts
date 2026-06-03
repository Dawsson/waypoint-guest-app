import { getSessionCookie } from "better-auth/cookies";
import { resolveApiUrl } from "./api-url";

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

export const requireWorkspaceSession = async (request: Request) => {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/workspace")) {
    return null;
  }

  if (!isDocumentNavigation(request)) {
    return null;
  }

  if (hasSessionCookie(request) && (await hasValidServerSession(request))) {
    return null;
  }

  return Response.redirect(new URL("/", request.url), 302);
};

export const hasValidWorkspaceSession = async (request: Request) => {
  return hasSessionCookie(request) && (await hasValidServerSession(request));
};

async function hasValidServerSession(request: Request) {
  const response = await fetch(`${resolveApiUrl().replace(/\/$/, "")}/auth/get-session`, {
    credentials: "include",
    headers: forwardAuthHeaders(request.headers),
  }).catch(() => null);

  if (!response?.ok) {
    return false;
  }

  return Boolean(await response.json().catch(() => null));
}

function forwardAuthHeaders(headers: Headers) {
  const forwarded = new Headers();
  const cookie = headers.get("cookie");
  if (cookie) {
    forwarded.set("cookie", cookie);
  }

  return forwarded;
}
