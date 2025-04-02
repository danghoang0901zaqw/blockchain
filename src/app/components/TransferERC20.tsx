"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { parseUnits } from "viem";
import { type BaseError, useWriteContract } from "wagmi";

interface TransferERC20Props {
  address: string;
}
const ERC20_ABI = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
];

export default function TransferERC20({ address }: TransferERC20Props) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const transferToken = () => {
    if (!address) {
      toast.info("Connect Wallet!");
      return;
    }
    const amountInWei = parseUnits(amount, 1);
    writeContract({
      address: address as `0x${string}`,
      abi: ERC20_ABI,
      functionName: "transferFrom",
      args: [address, toAddress, amountInWei],
    });
  };
  useEffect(() => {
    if (hash) {
      toast.success(`Transfer ERC20 successful!`);
      setAmount("");
      setToAddress("");
    }
    if (error) {
      toast.error((error as BaseError)?.shortMessage || error?.message);
    }
  }, [error, hash]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Transfer ERC20 Token</h2>
      <input
        type="text"
        placeholder="Address"
        className="px-3 py-[10px] peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        className="px-3 py-[10px] peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-500 rounded-md cursor-pointer hover:opacity-90"
        onClick={transferToken}
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Transfer Token"}
      </button>
    </div>
  );
}
