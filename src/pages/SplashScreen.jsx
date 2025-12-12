import React from "react";
import { Wallet } from "lucide-react";

export default function SplashScreen() {
  return (
    <div
      className="h-screen w-screen
        flex flex-col items-center justify-center w-full
        bg-gradient-to-br from-purple-600 to-pink-500
        animate-screenFade
      "
    >
      <Wallet
        size={110}
        className="text-white animate-iconSequence"
      />

      <h1 className="text-white text-4xl font-bold mt-6">
        Finance Tracker
      </h1>
    </div>
  );
}
