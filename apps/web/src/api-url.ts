export const resolveApiUrl = () => {
  const env = import.meta.env as Record<string, string | undefined>;
  const browserEnv =
    typeof window === "undefined"
      ? undefined
      : (window as Window & { readonly __WAYPOINT_ENV__?: Record<string, string | undefined> })
          .__WAYPOINT_ENV__;
  const runtimeEnv = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;
  const apiUrl =
    readApiUrl(browserEnv) ?? readApiUrl(runtimeEnv) ?? readApiUrl(env) ?? env.PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Missing PUBLIC_API_URL for Waypoint API client.");
  }

  return apiUrl;
};

const readApiUrl = (env: Record<string, string | undefined> | undefined) =>
  env?.PUBLIC_API_URL ?? env?.VITE_PUBLIC_API_URL ?? env?.API_URL ?? env?.VITE_API_URL;
