"use client";
import { useAccount, useBalance } from "wagmi";
export default function Balance() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({
    address,
  });

  if (!isConnected) return <p>Connect Wallet</p>;
  if (isLoading) return <p>Loading Balance BNB...</p>;

  return <h2>Balance BNB: {data?.formatted} BNB</h2>;
}
