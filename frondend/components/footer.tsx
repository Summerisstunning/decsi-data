import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import MoleculeIcon from "@/components/molecule-icon"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py:12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <MoleculeIcon className="h-8 w-8" />
              <span className="font-bold">DeSciData</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering scientific research through decentralized data sharing and crowdfunding.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Platform</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/experiments" className="text-muted-foreground hover:text-foreground">
                  Experiments
                </Link>
              </li>
              <li>
                <Link href="/data" className="text-muted-foreground hover:text-foreground">
                  Data Sharing
                </Link>
              </li>
              <li>
                <Link href="/crowdfunding" className="text-muted-foreground hover:text-foreground">
                  Crowdfunding
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DeSciData. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

