"use client";

import { z } from "zod";

const publicEnvConfigValidator = z.object({
  NEXT_PUBLIC_PRIVY_APP_ID: z.string(),
  NEXT_PUBLIC_EXTENSION_ID: z.string(),
});

export const publicEnv = publicEnvConfigValidator.parse({
  NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  NEXT_PUBLIC_EXTENSION_ID: process.env.NEXT_PUBLIC_EXTENSION_ID,
});
