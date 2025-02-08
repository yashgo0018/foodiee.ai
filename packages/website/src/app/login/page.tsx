"use client";

import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { publicEnv } from "@/public-config";
import Image from "next/image";

export default function Login() {
  const { login, ready, authenticated, user, getAccessToken } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated && user) {
      // Get the token
      getAccessToken().then((token) => {
        // Check if this was opened by the extension
        const isExtension =
          new URLSearchParams(window.location.search).get("source") ===
          "extension";

        if (isExtension) {
          // Send message to extension
          chrome.runtime.sendMessage(publicEnv.NEXT_PUBLIC_EXTENSION_ID, {
            type: "LOGIN_SUCCESS",
            token: token,
            email: user.email,
          });
          // Close the tab
          window.close();
        } else {
          // Normal website flow
          router.push("/dashboard");
        }
      });
    }
  }, [ready, authenticated, user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          {/* Logo and Title Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Foodiee.ai Logo"
                width={64}
                height={64}
                className="rounded-xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to Foodiee.ai
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Your smart companion for ordering food abroad
            </p>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Sign in to your account
            </h2>

            <button
              onClick={login}
              className="w-full flex items-center justify-center px-6 py-3 rounded-xl 
                       bg-orange-500 hover:bg-orange-600
                       text-white font-medium text-lg
                       transform transition duration-200 hover:scale-[1.02]
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Continue with Privy
            </button>

            <div className="mt-6 text-center text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
