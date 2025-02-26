"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import MoleculeIcon from "@/components/molecule-icon"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useWallet } from "@/hooks/useWallet"
import { CreateExperimentModal } from "./create-experiment-modal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { isConnected } = useWallet()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <MoleculeIcon className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block">DeSciData</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/experiments" className="text-sm font-medium transition-colors hover:text-primary">
            Experiments
          </Link>
          <Link href="/data" className="text-sm font-medium transition-colors hover:text-primary">
            Data
          </Link>
          <Link href="/crowdfunding" className="text-sm font-medium transition-colors hover:text-primary">
            Crowdfunding
          </Link>
          <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
            Portfolio
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <WalletConnectButton />
          <Button
            size="sm"
            className="hidden md:flex"
            style={{ backgroundColor: "hsl(var(--orange))" }}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Start Project
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "container md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-[400px] py-4" : "max-h-0",
        )}
      >
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/experiments" className="text-sm font-medium transition-colors hover:text-primary">
            Experiments
          </Link>
          <Link href="/data" className="text-sm font-medium transition-colors hover:text-primary">
            Data
          </Link>
          <Link href="/crowdfunding" className="text-sm font-medium transition-colors hover:text-primary">
            Crowdfunding
          </Link>
          <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
            Portfolio
          </Link>
          <div className="flex flex-col space-y-2 pt-2">
            <Button
              size="sm"
              style={{ backgroundColor: "hsl(var(--orange))" }}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Start Project
            </Button>
          </div>
        </nav>
      </div>

      <CreateExperimentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </header>
  )
}

