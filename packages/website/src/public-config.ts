"use client";

import { z } from "zod";

const publicEnvConfigValidator = z.object({
  privyApiKey: z.string(),
  extensionId: z.string(),
});

export const publicEnv = publicEnvConfigValidator.parse({
  privyApiKey: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID,
});
