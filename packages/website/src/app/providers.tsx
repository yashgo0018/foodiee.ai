"use client";

import { privyConfig } from "@/privy";
import { publicEnv } from "@/public-config";
import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId={publicEnv.privyApiKey} config={privyConfig}>
      {children}
    </PrivyProvider>
  );
}
