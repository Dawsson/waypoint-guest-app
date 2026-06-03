import { Link } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { meQueryOptions } from "./api";
import { authClient, ensureAnonymousSession, isAnonymousUser } from "./auth";

const queryClient = new QueryClient();

const signOut = async () => {
  await authClient.signOut();
  await queryClient.invalidateQueries({ queryKey: ["waypoint"] });
};

export function AppProviders({ children }: Readonly<{ children: ReactNode }>) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function GuestHome() {
  return (
    <AppProviders>
      <GuestPanel />
    </AppProviders>
  );
}

export function WorkspaceHome() {
  return (
    <AppProviders>
      <WorkspacePanel />
    </AppProviders>
  );
}

function GuestPanel() {
  const session = authClient.useSession();
  const isAnonymous = isAnonymousUser(session.data?.user);
  const isLoggedIn = Boolean(session.data);

  const continueAsGuest = async () => {
    await ensureAnonymousSession();
    await queryClient.invalidateQueries({ queryKey: ["waypoint"] });
  };

  return (
    <main className="shell">
      <section className="panel">
        <h1>Waypoint Guest App</h1>

        <div className="status-list" aria-label="Auth status">
          <StatusRow label="Logged in" value={isLoggedIn ? "yes" : "no"} />
          <StatusRow
            label="Session type"
            value={isAnonymous ? "guest" : isLoggedIn ? "user" : "none"}
          />
          <StatusRow label="User id" value={session.data?.user.id ?? "none"} />
        </div>

        <div className="actions">
          <button type="button" onClick={continueAsGuest}>
            Continue as guest
          </button>
          {isLoggedIn ? (
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          ) : null}
          <Link to="/workspace">Open protected workspace</Link>
        </div>
      </section>
    </main>
  );
}

function WorkspacePanel() {
  const session = authClient.useSession();
  const me = useQuery({
    ...meQueryOptions(),
    enabled: Boolean(session.data),
  });

  return (
    <main className="shell">
      <section className="panel">
        <h1>Protected workspace</h1>

        <div className="status-list" aria-label="Workspace session">
          <StatusRow label="Session mode" value={me.data?.mode ?? "loading"} />
          <StatusRow label="User id" value={me.data?.user.id ?? "loading"} />
          <StatusRow label="Email" value={me.data?.user.email ?? "loading"} />
          <StatusRow label="Session id" value={me.data?.sessionId ?? "loading"} />
        </div>

        <div className="actions">
          {session.data ? (
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          ) : null}
          <Link to="/">Back to public app</Link>
        </div>

        {me.error ? <p className="error">{me.error.message}</p> : null}
      </section>
    </main>
  );
}

function StatusRow({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="status-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
