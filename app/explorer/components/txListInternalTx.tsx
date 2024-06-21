import { getInternalTransactionsByHash } from "@/utils/data";
import { InternalTransactionByHashResponse } from "@/utils/definitions";
import { useState } from "react";

const TxListInternalTx = () => {
  const [txHash, setTxHash] = useState(
    "0x96f3f60fd07e63b72ed5fbb5e6f99406f46e756862e9dcdd6cdd601246cd199e"
  );
  const [response, setResponse] = useState<
    InternalTransactionByHashResponse[] | null
  >(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const transactions = await getInternalTransactionsByHash(txHash);
      setResponse(transactions);
    } catch (error) {
      console.error("Failed to fetch internal transactions by hash:", error);
    }
  };
  return (
    <div className="m-5 border p-5">
      <h2>Get 'Internal Transactions' by Transaction Hash</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="txHash"
          defaultValue={txHash}
          onChange={(e) => setTxHash(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default TxListInternalTx;
