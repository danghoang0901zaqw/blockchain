"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import BalanceBNB from "./BalanceBNB";
import ERC20Balance from "./ERC20Balance";
import TransferBNB from "./TransferBNB";
import TransferERC20 from "./TransferERC20";

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = formatAddress(address);
  return (
    <div>
      <div className="p-2 rounded border flex items-center gap-2">
        <div className="w-full h-full">
          {ensAvatar && (
            <img
              alt="ENS Avatar"
              className="w-10 h-10 rounded-full"
              src={ensAvatar}
            />
          )}
          {address && (
            <p>
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </p>
          )}
          <p>Connected to {connector?.name} Connector</p>
          <BalanceBNB />
        </div>
        <button
          className="px-4 py-2 bg-green-500 rounded-md cursor-pointer hover:opacity-90"
          onClick={() => disconnect()}
          type="button"
        >
          Disconnect
        </button>
      </div>
      <div className="mt-2 p-2 rounded border flex items-center gap-2">
        <ERC20Balance />
      </div>
      <div className="mt-2 p-2 rounded border flex items-center gap-2">
        <TransferBNB />
      </div>
      <div className="mt-2 p-2 rounded border flex items-center gap-2">
      {address && <TransferERC20 address={address} />}
      </div>
    </div>
  );
}
