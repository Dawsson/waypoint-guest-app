export const resolveApiUrl = () => {
  const env = import.meta.env as Record<string, string | undefined>;
  const runtimeEnv = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env;
  const apiUrl = env.PUBLIC_API_URL ?? runtimeEnv?.PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("Missing PUBLIC_API_URL for Waypoint API client.");
  }

  return apiUrl;
};
