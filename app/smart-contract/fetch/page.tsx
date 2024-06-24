"use client";

import { getSmartContractSettings } from "@/utils/network-configs";
import { useEffect, useState } from "react";
// import { getContract } from "viem";
import { useReadContract } from "wagmi";

const page = () => {
  const smartContractSettings = getSmartContractSettings();
  const [fetchedName, setFetchedName] = useState<string>("");

  const { data } = useReadContract({
    abi: smartContractSettings.abi,
    address: smartContractSettings.address as `0x${string}`,
    functionName: "getName",
  });
  useEffect(() => {
    setFetchedName(data as string);
  }, [data]);
  // smart contract using viem
  return (
    <div>
      <h2>FETCH FROM SMART CONTRACT</h2>
      <p>Name: {fetchedName}</p>
    </div>
  );
};

export default page;
