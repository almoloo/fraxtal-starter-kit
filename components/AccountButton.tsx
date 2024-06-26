"use client";

import { useAccount, useConnect, useSwitchChain, type Connector } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  BracesIcon,
  DownloadIcon,
  GlobeIcon,
  HouseIcon,
  LoaderIcon,
  LogOutIcon,
  ParenthesesIcon,
  PowerIcon,
  UploadIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { ellipsisAddress } from "@/utils/utils";
import Link from "next/link";

const AccountButton = () => {
  const {
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
    connector,
  } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { chains } = useSwitchChain();
  const { address } = useAccount();

  // ----- HANDLE CONNECT
  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector, chainId: chains[0].id });
    } catch (error) {
      console.error(error);
    }
  };

  // ----- HANDLE DISCONNECT BUTTON
  const handleDisconnect = async () => {
    if (!connector) {
      console.error("No connector provided");
      return;
    }
    try {
      await connector.disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  const MenuDivider = ({ title }: { title: string }) => {
    return (
      <div className="flex items-center gap-3">
        <span className="w-2 border-b"></span>
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="grow border-b"></span>
      </div>
    );
  };

  const MenuItem = ({
    title,
    icon,
    href,
  }: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }) => {
    return (
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link href={href} className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </Link>
      </Button>
    );
  };

  return (
    <>
      {/* ----- DISCONNECT BUTTON ----- */}
      {isConnected && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full px-3">
              <MetaMaskAvatar address={address!} size={20} />
              <span className="ml-2 text-xs">{ellipsisAddress(address!)}</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="mt-5 rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <MetaMaskAvatar address={address!} size={36} />
                  <div className="grow">
                    <h2 className="text-base">Welcome back,</h2>
                    <p className="mt-1 text-xs font-bold text-neutral-500">
                      {ellipsisAddress(address!)}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => handleDisconnect()}
                  >
                    <PowerIcon className="h-4 w-4" />
                  </Button>
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex grow flex-col gap-3 overflow-y-auto">
              <MenuItem
                title="Home"
                icon={<HouseIcon className="h-5 w-5 text-neutral-500" />}
                href="/"
              />
              {/* ----- SMART CONTRACT SECTION ----- */}
              <MenuDivider title="Smart Contract" />
              <MenuItem
                title="Call a method"
                icon={<ParenthesesIcon className="h-5 w-5 text-neutral-500" />}
                href="/smart-contract/call"
              />
              <MenuItem
                title="Get data"
                icon={<BracesIcon className="h-5 w-5 text-neutral-500" />}
                href="/smart-contract/fetch"
              />
              {/* ----- IPFS SECTION ----- */}
              <MenuDivider title="IPFS" />
              <MenuItem
                title="Fetch data/file"
                icon={<DownloadIcon className="h-5 w-5 text-neutral-500" />}
                href="/ipfs/fetch"
              />
              <MenuItem
                title="Upload data/file"
                icon={<UploadIcon className="h-5 w-5 text-neutral-500" />}
                href="/ipfs/upload"
              />
              {/* ----- EXPLORER ----- */}
              <MenuDivider title="Explorer" />
              <MenuItem
                title="Fetch explorer data"
                icon={<GlobeIcon className="h-5 w-5 text-neutral-500" />}
                href="/explorer"
              />
            </nav>
          </SheetContent>
        </Sheet>
      )}
      {/* ----- CONNECT BUTTON ----- */}
      {(isDisconnected || isConnecting || isReconnecting) && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="relative"
              disabled={isConnecting || isReconnecting}
            >
              <span
                className={`${(isConnecting || isReconnecting) && "opacity-0"}`}
              >
                Connect Wallet
              </span>
              {(isConnecting || isReconnecting) && (
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                  <LoaderIcon className="h-6 w-6 animate-spin" />
                </div>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect a wallet</DialogTitle>
              <DialogDescription>
                Connect your wallet to access the full functionality of the
                application.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-1">
              {connectors.length === 0 ? (
                <small className="rounded border bg-slate-50 p-4 text-center text-neutral-500">
                  No connectors available
                </small>
              ) : (
                connectors.map((connector: Connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => handleConnect(connector)}
                    size="lg"
                    variant="outline"
                  >
                    {connector.icon && (
                      <img
                        src={connector.icon}
                        alt={connector.name}
                        className="mr-2 h-4 w-4"
                      />
                    )}
                    {connector.name}
                  </Button>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AccountButton;
