import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { guestQueryOptions } from "./api";

const queryClient = new QueryClient();

export function GuestHome() {
  return (
    <QueryClientProvider client={queryClient}>
      <GuestPanel />
    </QueryClientProvider>
  );
}

function GuestPanel() {
  const guest = useQuery(guestQueryOptions());

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
            <dd>{guest.data?.auth ?? "loading"}</dd>
          </div>
          <div>
            <dt>Internal user</dt>
            <dd>{guest.data?.internal.user.name ?? "loading"}</dd>
          </div>
          <div>
            <dt>Worker RPC sum</dt>
            <dd>{guest.data?.internal.sum ?? "loading"}</dd>
          </div>
        </dl>

        {guest.error ? <p className="error">{guest.error.message}</p> : null}
      </section>
    </main>
  );
}
