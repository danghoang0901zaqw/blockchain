"use client";

import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";

export default function TransferBNB() {
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!to || !amount) return;
    sendTransaction({
      to,
      value: parseEther(amount),
    });
  };

  if (!isConnected) return <p>Vui lòng kết nối ví</p>;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Transfer BNB</h2>
      <input
        type="text"
        placeholder="Address"
        className="px-3 py-[10px] peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        className="px-3 py-[10px] peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
        placeholder="BNB"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-500 rounded-md cursor-pointer hover:opacity-90"
        onClick={handleSend}
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send BNB"}
      </button>
    </div>
  );
}
