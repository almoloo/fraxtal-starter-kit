"use client";

import { useAccount, type Connector } from "wagmi";
import ConnectModal from "./ConnectModal";
import { useState } from "react";

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
      {isDisconnected && (
        <>
          <button onClick={() => setShowModal(!showModal)}>connect</button>
        </>
      )}
      {/* ----- CONNECTING ----- */}
      {(isConnecting || isReconnecting) && (
        <>
          <span>connecting...</span>
        </>
      )}
      {showModal && <ConnectModal />}
    </>
  );
};

export default AccountButton;
