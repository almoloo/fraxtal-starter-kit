"use client";

import { useAccount, Connector } from "wagmi";
import ConnectModal from "./ConnectModal";
import { useState } from "react";

// ----- HANDLE DISCONNECT BUTTON
const handleDisconnect = async (connector?: Connector) => {
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

const ConnectButton = () => {
  const {
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
    connector,
  } = useAccount();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ----- DISCONNECT BUTTON ----- */}
      {isConnected && (
        <>
          <button onClick={() => handleDisconnect(connector)}>
            disconnect
          </button>
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

export default ConnectButton;
