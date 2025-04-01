"use client";

import { useAccount, useReadContract } from "wagmi";
import { erc20Abi } from "viem";

interface ERC20BalanceProps {
  tokenAddress: string;
}

export default function ERC20Balance({ tokenAddress }: ERC20BalanceProps) {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address!],
  });

  if (!isConnected) return <p>Vui lòng kết nối ví</p>;
  if (isLoading) return <p>Loading Balance ERC20 Token...</p>;
  return <h2>Balance ERC20 Token: {balance?.toString() || 0} USDT</h2>;
}
