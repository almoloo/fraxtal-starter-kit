"use client";
import { getFrxEthBalance } from "@/utils/data";
import { useState } from "react";
import EthBalance from "./components/ethBalance";
import TxList from "./components/txList";
import TxListInternal from "./components/txListInternal";
import TxListInternalTx from "./components/txListInternalTx";
import TokenTx from "./components/tokenTx";
import TokenNftTx from "./components/tokenNftTx";
import GetStatus from "./components/getStatus";
import GetTxReceiptStatus from "./components/getTxReceiptStatus";
import TokenBalance from "./components/tokenBalance";

const page = () => {
  return (
    <div>
      <h1>EXPLORER API</h1>
      <EthBalance />
      <TxList />
      <TxListInternal />
      <TxListInternalTx />
      <TokenTx />
      <TokenNftTx />
      <GetStatus />
      <GetTxReceiptStatus />
      <TokenBalance />
    </div>
  );
};

export default page;
