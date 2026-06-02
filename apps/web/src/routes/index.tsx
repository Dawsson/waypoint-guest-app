import { createFileRoute } from "@tanstack/react-router";
import { GuestHome } from "../app";

export const Route = createFileRoute("/")({
  component: GuestHome,
});
