'use client';
import { getFrxEthBalance } from '@/utils/data';
import { useState } from 'react';
import EthBalance from './components/ethBalance';
import TxList from './components/txList';
import TxListInternal from './components/txListInternal';
import TxListInternalTx from './components/txListInternalTx';
import TokenTx from './components/tokenTx';
import TokenNftTx from './components/tokenNftTx';
import GetStatus from './components/getStatus';
import GetTxReceiptStatus from './components/getTxReceiptStatus';
import TokenBalance from './components/tokenBalance';
import { GlobeIcon } from 'lucide-react';

const page = () => {
	return (
		<div>
			<header className="mb-5 flex flex-col gap-3">
				<h1 className="flex items-center font-bold text-xl">
					<GlobeIcon className="text-neutral-500 mr-2 h-6 w-6" />
					<span>Fetch Explorer Data</span>
				</h1>
				<p className="alert gray leading-relaxed">
					This interface allows you to fetch data from the Explorer
					API, which provides information about Fraxtal transactions,
					token balances, and more.
				</p>
			</header>
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
