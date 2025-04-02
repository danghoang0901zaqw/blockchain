"use client";
import { useState } from "react";
import { formatEther, erc20Abi } from "viem";

import { useAccount, useReadContract } from "wagmi";

export default function TokenBalance() {
  const { address, isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState<string>("");
  const {
    data: tokenBalance,
    refetch,
    isFetching,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address!],
    query: { enabled: false },
  });

  if (!isConnected) return <p>Connect wallet</p>;
  return (
    <div className="w-full flex flex-col gap-2">
      <input
        type="text"
        placeholder="Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        className="px-3 py-[10px] peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
      />
      <h2>
        Balance ERC20 Token:{" "}
        {tokenBalance ? Number(formatEther(tokenBalance)).toFixed(2) : "0.0"}{" "}
        USDT
      </h2>
      <button
        onClick={() => refetch()}
        disabled={isFetching || !contractAddress}
        className="px-4 py-2 bg-green-500 rounded-md cursor-pointer hover:opacity-90"
      >
        {isFetching ? "Loading..." : "Get ERC20 Token Balance"}
      </button>
    </div>
  );
}
