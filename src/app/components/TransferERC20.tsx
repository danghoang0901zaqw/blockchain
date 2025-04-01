"use client";
import { useAccount, useWalletClient } from "wagmi";
import { parseUnits } from "viem";
import { useState } from "react";

interface TransferERC20Props {
  ERC20Address: string;
}
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

export default function TransferERC20({ ERC20Address }: TransferERC20Props) {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const transferToken = async () => {
    if (!walletClient || !address) {
      alert("Connect Wallet!");
      return;
    }
    try {
      setIsLoading(true);
      const amountInWei = parseUnits(amount, 1);
      const txHash = await walletClient.writeContract({
        address: ERC20Address,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [toAddress, amountInWei],
      });

      alert(`Success! TX Hash: ${txHash}`);
    } catch (error) {
      console.error("Lỗi khi chuyển token:", error);
      alert("Fail!");
    } finally {
      setIsLoading(false);
    }
  };

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
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Transfer Token"}
      </button>
    </div>
  );
}
