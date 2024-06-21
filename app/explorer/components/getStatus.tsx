import { getContractExecutionStatus } from "@/utils/data";
import { ContractExecutionStatusResponse } from "@/utils/definitions";
import { useState } from "react";

const GetStatus = () => {
  const [txHash, setTxHash] = useState(
    "0xc2c1cccb3cc92c959c91b2b6451f29734f67675ac39949552fee82237e5d052f"
  );
  const [response, setResponse] =
    useState<ContractExecutionStatusResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const status = await getContractExecutionStatus(txHash);
      setResponse(status);
    } catch (error) {
      console.error("Failed to fetch contract execution status:", error);
    }
  };
  return (
    <div className="m-5 border p-5">
      <h2>Check Contract Execution Status</h2>
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

export default GetStatus;
