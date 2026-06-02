export interface GuestQueryResult {
  readonly auth: "guest";
  readonly internal: {
    readonly sum: number;
    readonly user: {
      readonly id: string;
      readonly name: string;
    };
  };
  readonly message: string;
  readonly operation: string;
}

export interface WaypointResponse<TData> {
  readonly data: TData;
  readonly ok: true;
}

export const resolveApiUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin.replace("5173", "8787");
  }

  return process.env.PUBLIC_API_URL ?? "http://127.0.0.1:8787";
};

export const getGuest = async (id = "guest") => {
  const response = await fetch(`${resolveApiUrl()}/query/guest`, {
    body: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Guest query failed with ${response.status}`);
  }

  const result = (await response.json()) as WaypointResponse<GuestQueryResult>;
  return result.data;
};
