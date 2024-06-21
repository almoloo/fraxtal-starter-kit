import { getTokenBalance } from "@/utils/data";
import { TokenBalanceResponse } from "@/utils/definitions";
import { useState } from "react";

const TokenBalance = () => {
  const [address, setAddress] = useState(
    "0x69B2AC8192a0c47B9C11543f20c367fcECCed7a3"
  );
  const [contractAddress, setContractAddress] = useState(
    "0xfc00000000000000000000000000000000000005"
  );

  const [response, setResponse] = useState<TokenBalanceResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const tokenBalance = await getTokenBalance(address, contractAddress);
      setResponse(tokenBalance);
    } catch (error) {
      console.error("Failed to fetch token balance:", error);
    }
  };
  return (
    <div className="m-5 border p-5">
      <h2>Get ERC20-Token Account Balance for TokenContractAddress</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="address"
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="contract address"
          defaultValue={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <pre>{response}</pre>
    </div>
  );
};

export default TokenBalance;
