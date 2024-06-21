import {
  ContractExecutionStatusResponse,
  EthBalanceResponse,
  InternalTransactionByHashResponse,
  InternalTransactionResponse,
  NftTransferResponse,
  NormalTransactionResponse,
  TokenBalanceResponse,
  TokenTransferResponse,
  TransactionReceiptStatusResponse,
} from "@/utils/definitions";

const apiEndpoint = "/api/v1/explorer";

/**
 * Retrieves the frxETH balance for the specified address(es).
 * @param address - The address(es) for which to retrieve the balance.
 * @returns A Promise that resolves to the frxETH balance response.
 * @throws If there was an error fetching the frxETH balance.
 */
export const getFrxEthBalance = async (
  address: string[]
): Promise<EthBalanceResponse> => {
  try {
    const isMultiAddress = address.length > 1;
    let endpoint = apiEndpoint;
    if (isMultiAddress) {
      endpoint += `/account/balancemulti?addresses=${address.join(",")}`;
    } else {
      endpoint += `/account/balance?address=${address[0]}`;
    }
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error("Failed to fetch frxETH balance:", error);
    throw error;
  }
};

export const getNormalTransactions = async (
  address: string
): Promise<NormalTransactionResponse[]> => {
  try {
    const res = await fetch(`${apiEndpoint}/account/txlist?address=${address}`);
    return res.json();
  } catch (error) {
    console.error("Failed to fetch normal transactions:", error);
    throw error;
  }
};

export const getInternalTransactions = async (
  address: string
): Promise<InternalTransactionResponse[]> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/account/txlistinternal?address=${address}`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch internal transactions:", error);
    throw error;
  }
};

export const getInternalTransactionsByHash = async (
  txHash: string
): Promise<InternalTransactionByHashResponse[]> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/account/txlistinternaltx?txHash=${txHash}`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch internal transactions by hash:", error);
    throw error;
  }
};

export const getTokenTransfers = async (
  address: string,
  contractAddress: string
): Promise<TokenTransferResponse[]> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/account/tokentx?address=${address}&contractaddress=${contractAddress}`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch token transfers:", error);
    throw error;
  }
};

export const getNftTransfers = async (
  address: string,
  contractAddress: string
): Promise<NftTransferResponse[]> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/account/tokennfttx?address=${address}&contractaddress=${contractAddress}`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch NFT transfers:", error);
    throw error;
  }
};

export const getContractExecutionStatus = async (
  txHash: string
): Promise<ContractExecutionStatusResponse> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/transaction/getstatus?txHash=${txHash}`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch contract execution status:", error);
    throw error;
  }
};

export const getTxReceiptStatus = async (
  txHash: string
): Promise<TransactionReceiptStatusResponse> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/transaction/gettxreceiptstatus?txhash=${txHash}`
    );
    return res.json();
  } catch (error) {
    console.error("Failed to fetch transaction receipt status:", error);
    throw error;
  }
};

export const getTokenBalance = async (
  address: string,
  contractAddress: string
): Promise<TokenBalanceResponse> => {
  try {
    const res = await fetch(
      `${apiEndpoint}/account/tokenbalance?address=${address}&contractaddress=${contractAddress}`
    );
    return res.text();
  } catch (error) {
    console.error("Failed to fetch token balance:", error);
    throw error;
  }
};
