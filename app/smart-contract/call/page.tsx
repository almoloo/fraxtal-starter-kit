"use client";

import { getSmartContractSettings } from "@/utils/network-configs";
import { useState } from "react";
import { useWriteContract } from "wagmi";

const page = () => {
  const { data: hash, writeContract } = useWriteContract();
  const smartContractSettings = getSmartContractSettings();
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SET NAME", name);
    writeContract({
      address: smartContractSettings.address as `0x${string}`,
      abi: smartContractSettings.abi,
      functionName: "setName",
      args: [name],
    });
  };

  return (
    <div>
      <h2>CALL SMART CONTRACT</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">SET NAME</button>
      </form>
      {hash && <p>Transaction Hash: {hash}</p>}
    </div>
  );
};

export default page;
