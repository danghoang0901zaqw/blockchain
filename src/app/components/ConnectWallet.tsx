"use client";
import { useAccount } from "wagmi";
import { Account } from "./Account";
import { Connect } from "./Connect";

export function ConnectWallet() {
  const { isConnected } = useAccount();
  return (
    <div className="flex items-center justify-center h-screen">
      {isConnected ? <Account /> : <Connect />}
    </div>
  );
}
