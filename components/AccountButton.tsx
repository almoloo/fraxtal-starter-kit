"use client";

import { useAccount, type Connector } from "wagmi";
import ConnectModal from "./ConnectModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

const AccountButton = () => {
  const {
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
    connector,
  } = useAccount();

  const [showModal, setShowModal] = useState(false);

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
        <>
          <button onClick={() => handleDisconnect()}>disconnect</button>
        </>
      )}
      {/* ----- CONNECT BUTTON ----- */}
      {(isDisconnected || isConnecting || isReconnecting) && (
        <>
          <Button
            className="relative"
            disabled={isConnecting || isReconnecting}
            onClick={() => setShowModal(true)}
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
          {/* <button onClick={() => setShowModal(!showModal)}>connect</button> */}
        </>
      )}
      {showModal && <ConnectModal />}
    </>
  );
};

export default AccountButton;
