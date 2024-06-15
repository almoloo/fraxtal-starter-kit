import { isTestnet } from "@/utils/network-configs";
import { Connector, useConnect, useSwitchChain } from "wagmi";

const ConnectModal = () => {
  const { connectors, connectAsync } = useConnect();
  const { chains, switchChainAsync } = useSwitchChain();

  const handleConnect = async (connector: Connector) => {
    try {
      const network =
        (isTestnet()
          ? chains.find((chain) => chain.testnet)
          : chains.find((chain) => !chain.testnet)) ?? chains[0];
      await connectAsync({ connector, chainId: network.id });
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
