import { getInternalTransactions } from "@/utils/data";
import { InternalTransactionResponse } from "@/utils/definitions";
import React from "react";

const TxListInternal = () => {
  const [address, setAddress] = React.useState(
    "0x69B2AC8192a0c47B9C11543f20c367fcECCed7a3"
  );
  const [response, setResponse] = React.useState<
    InternalTransactionResponse[] | null
  >(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const transactions = await getInternalTransactions(address);
      setResponse(transactions);
    } catch (error) {
      console.error("Failed to fetch internal transactions:", error);
    }
  };
  return (
    <div className="m-5 border p-5">
      <h2>Get a list of 'Internal' Transactions by Address</h2>
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

export default TxListInternal;
