"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/useWallet"
import { Loader2, Wallet } from "lucide-react"

export function WalletConnectButton() {
  const { account, isConnecting, error, connectWallet, disconnectWallet, isConnected } = useWallet()

  if (isConnecting) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    )
  }

  if (isConnected) {
    return (
      <Button variant="outline" onClick={disconnectWallet}>
        {account?.slice(0, 6)}...{account?.slice(-4)}
      </Button>
    )
  }

  return (
    <Button variant="outline" onClick={connectWallet}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  )
}

