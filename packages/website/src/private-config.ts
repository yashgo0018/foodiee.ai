import { z } from "zod";

const privateEnvConfigValidator = z.object({
  openaiApiKey: z.string(),
});

export const privateEnv = privateEnvConfigValidator.parse({
  openaiApiKey: process.env.OPENAI_API_KEY,
});
