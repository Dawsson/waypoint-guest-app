import { describeAiGatewayUniversalRequest } from "@waypoint/backend";
import { guestProcedure } from "../procedures";

export const aiGatewayDescriptionQuery = guestProcedure.aiGatewayDescription.query({
  run: async () => {
    const description = describeAiGatewayUniversalRequest([
      {
        body: {
          messages: [{ content: "Example prompt body stays out of logs.", role: "user" }],
          model: "@cf/meta/llama-3.1-8b-instruct",
          stream: true,
        },
        headers: { "cf-aig-cache-ttl": "300" },
        provider: "workers-ai",
      },
    ]);

    return {
      ...description,
      providers: [...description.providers],
    };
  },
});
