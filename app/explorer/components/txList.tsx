import { getNormalTransactions } from "@/utils/data";
import { NormalTransactionResponse } from "@/utils/definitions";
import { useState } from "react";

const TxList = () => {
  const [address, setAddress] = useState(
    "0x69B2AC8192a0c47B9C11543f20c367fcECCed7a3"
  );
  const [response, setResponse] = useState<NormalTransactionResponse[] | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const transactions = await getNormalTransactions(address);
      setResponse(transactions);
    } catch (error) {
      console.error("Failed to fetch normal transactions:", error);
    }
  };
  return (
    <div className="m-5 border p-5">
      <h2>Get a list of 'Normal' Transactions By Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="address/addresses"
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default TxList;
