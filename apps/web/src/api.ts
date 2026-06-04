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

export const streamGuestEvents = async (onEvent: (event: string) => void) => {
  const response = await fetch(`${resolveApiUrl()}/events/guest`, {
    credentials: "include",
  });
  if (!response.body) {
    throw new Error("Guest stream did not include a response body.");
  }

  for await (const event of parseServerEvents(response.body)) {
    onEvent(event);
  }
};

export type GuestQueryResult = Awaited<ReturnType<typeof getGuest>>;

async function* parseServerEvents(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = "";
  const reader = body.getReader();

  try {
    while (true) {
      const result = await reader.read();
      if (result.done) {
        break;
      }
      buffer += decoder.decode(result.value, { stream: true });
      const parsed = readCompleteEvents(buffer);
      yield* parsed.events;
      buffer = parsed.tail;
    }
  } finally {
    reader.releaseLock();
  }

  buffer += decoder.decode();
  yield* readCompleteEvents(buffer).events;
}

function readCompleteEvents(buffer: string) {
  const parts = buffer.split("\n\n");
  return {
    events: parts.slice(0, -1).flatMap((block) => {
      const event = block
        .split("\n")
        .filter((line) => line.startsWith("data: "))
        .map((line) => line.slice("data: ".length))
        .join("\n");
      return event ? [event] : [];
    }),
    tail: parts.at(-1) ?? "",
  };
}
