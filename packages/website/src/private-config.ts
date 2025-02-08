import { z } from "zod";

const privateEnvConfigValidator = z.object({});

export const privateEnv = privateEnvConfigValidator.parse({});
