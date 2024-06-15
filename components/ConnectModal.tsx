import { Connector, useConnect } from "wagmi";

const ConnectModal = () => {
  const { connectors, connect } = useConnect();
  return (
    <div>
      ConnectModal
      <hr />
      {connectors.map((connector: Connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
};

export default ConnectModal;
