import { useEffect, useState } from "react";
import { getGuest, type GuestQueryResult } from "./api";

export function GuestHome() {
  const [guest, setGuest] = useState<GuestQueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getGuest().then(setGuest).catch((cause: unknown) => {
      setError(cause instanceof Error ? cause.message : "Guest query failed");
    });
  }, []);

  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">Waypoint guest app</p>
        <h1>Public web, public API, internal Worker.</h1>
        <p className="summary">
          TanStack Start calls a Waypoint HTTP query, the API calls the internal Worker through a
          Worker-to-Worker binding, and the app config declares the binding contract once.
        </p>

        <dl className="facts">
          <div>
            <dt>Auth mode</dt>
            <dd>{guest?.auth ?? "loading"}</dd>
          </div>
          <div>
            <dt>Internal user</dt>
            <dd>{guest?.internal.user.name ?? "loading"}</dd>
          </div>
          <div>
            <dt>Worker RPC sum</dt>
            <dd>{guest?.internal.sum ?? "loading"}</dd>
          </div>
        </dl>

        {error ? <p className="error">{error}</p> : null}
      </section>
    </main>
  );
}
