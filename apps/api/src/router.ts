import { healthEndpoint } from "./endpoints/health";
import { guestStreamEndpoint } from "./endpoints/stream";
import { contract } from "./contract";
import { procedure } from "./procedures";
import { agentContextQuery } from "./queries/agent-context";
import { aiGatewayDescriptionQuery, aiGatewayForwardingEndpoint } from "./queries/ai-gateway";
import { guestQuery } from "./queries/guest";
import { meQuery } from "./queries/me";

export const routes = procedure.router({
  agentContext: agentContextQuery,
  aiGatewayDescription: aiGatewayDescriptionQuery,
  aiGatewayForwarding: aiGatewayForwardingEndpoint,
  guest: guestQuery,
  health: healthEndpoint,
  me: meQuery,
  stream: guestStreamEndpoint,
});

export { contract };
