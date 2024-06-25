"use client";

import { useAccount, useConnect, useSwitchChain, type Connector } from "wagmi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AccountButton = () => {
  const {
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
    connector,
  } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { chains, switchChainAsync } = useSwitchChain();

  // ----- HANDLE CONNECT
  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector, chainId: chains[0].id });
    } catch (error) {
      console.error(error);
    }
  };

  // ----- HANDLE DISCONNECT BUTTON
  const handleDisconnect = async () => {
    if (!connector) {
      console.error("No connector provided");
      return;
    }
    try {
      await connector.disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* ----- DISCONNECT BUTTON ----- */}
      {isConnected && (
        <div>
          <button onClick={() => handleDisconnect()}>Disconnect</button>
        </div>
      )}
      {/* ----- CONNECT BUTTON ----- */}
      {(isDisconnected || isConnecting || isReconnecting) && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="relative"
              disabled={isConnecting || isReconnecting}
            >
              <span
                className={`${(isConnecting || isReconnecting) && "opacity-0"}`}
              >
                Connect Wallet
              </span>
              {(isConnecting || isReconnecting) && (
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                  <LoaderIcon className="h-6 w-6 animate-spin" />
                </div>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect a wallet</DialogTitle>
              <DialogDescription>
                Connect your wallet to access the full functionality of the
                application.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-1">
              {connectors.length === 0 ? (
                <small className="rounded border bg-slate-50 p-4 text-center text-neutral-500">
                  No connectors available
                </small>
              ) : (
                connectors.map((connector: Connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => handleConnect(connector)}
                    size="lg"
                    variant="outline"
                  >
                    {connector.icon && (
                      <img
                        src={connector.icon}
                        alt={connector.name}
                        className="mr-2 h-4 w-4"
                      />
                    )}
                    {connector.name}
                  </Button>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AccountButton;
