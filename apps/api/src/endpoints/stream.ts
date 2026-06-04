import { eventStream } from "@waypoint/backend";
import { publicEndpointProcedure } from "../procedures";

export const guestStreamEndpoint = publicEndpointProcedure.endpoint({
  method: "GET",
  path: "/events/guest",
  run: ({ ctx }) =>
    eventStream(guestEvents(ctx.env.PUBLIC_APP_NAME), {
      headers: { "x-waypoint-example": "guest-stream" },
    }),
});

async function* guestEvents(appName: string) {
  yield { data: { appName, step: "connected" }, event: "status" };
  yield { data: { message: "Streaming through the Waypoint API Worker." }, event: "message" };
  yield { data: true, event: "done" };
}
