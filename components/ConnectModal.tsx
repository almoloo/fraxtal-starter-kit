import { isTestnet } from "@/utils/network-configs";
import { Connector, useConnect, useSwitchChain } from "wagmi";

const ConnectModal = () => {
  const { connectors, connectAsync } = useConnect();
  const { chains, switchChainAsync } = useSwitchChain();

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector, chainId: chains[0].id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      ConnectModal
      <hr />
      {connectors.map((connector: Connector) => (
        <button key={connector.uid} onClick={() => handleConnect(connector)}>
          {connector.name}
        </button>
      ))}
    </div>
  );
};

export default ConnectModal;
