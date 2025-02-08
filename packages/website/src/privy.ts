import { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  loginMethods: ["email", "google"],
  appearance: {
    theme: "light",
    accentColor: "#4F46E5", // Indigo color to match your current theme
    // showPrivyBranding: false,
  },
};
