"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, LinkIcon, Share2, Users } from "lucide-react"
import { PurchaseAccessModal } from "@/components/purchase-access-modal"
import { notFound } from "next/navigation"
import { useWallet } from "@/hooks/useWallet"

// This function is used to get experiment data
function getExperimentData(id: string) {
  // In a real app, we would fetch the experiment data based on the ID
  const experimentData = {
    "qc-drug-discovery": {
      id: "qc-drug-discovery",
      title: "Quantum Computing for Drug Discovery",
      description: "Using quantum algorithms to accelerate drug discovery process",
      category: "Quantum Computing",
      accessPrice: 100, // Price in $EDU per month
      details: {
        overview: `This research project aims to leverage quantum computing algorithms to significantly accelerate the drug discovery process. We're developing novel quantum algorithms that can simulate molecular interactions with unprecedented accuracy.

Key Features:
• Quantum-accelerated molecular docking
• Novel drug candidate screening algorithms
• Integration with existing pharmaceutical databases
• Real-time molecular simulation capabilities`,
        methodology: `Our approach combines:
1. Quantum circuit design for molecular simulation
2. Machine learning optimization techniques
3. Classical-quantum hybrid algorithms
4. Cloud-based quantum computing resources`,
        impact: `Expected impacts include:
• 10x faster drug discovery pipeline
• More accurate molecular interaction predictions
• Reduced costs in pharmaceutical research
• Potential breakthroughs in treating complex diseases`,
      },
      requirements: {
        computation: "Access to quantum computing resources",
        data: "Molecular structure databases",
        timeline: "12 months",
      },
      benefits: [
        "Early access to research findings",
        "Rights to use data in derivative research",
        "Acknowledgment in publications",
        "Participation in research meetings",
      ],
      contractAddress: "0x1234567890abcdef",
      researchers: [
        {
          name: "Dr. Sarah Chen",
          role: "Principal Investigator",
          institution: "Quantum Research Institute",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Dr. Michael Zhang",
          role: "Senior Researcher",
          institution: "Quantum Research Institute",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      updates: [
        {
          date: "2023-11-15",
          title: "First milestone reached",
          content:
            "We've successfully implemented the first quantum algorithm for molecular docking simulations. Initial results show a 10x speedup compared to classical methods.",
        },
        {
          date: "2023-10-01",
          title: "Project launched",
          content:
            "We're excited to announce the launch of our quantum computing drug discovery project. Thank you to all our early supporters!",
        },
      ],
      dataFiles: [
        {
          name: "Initial Molecular Structures",
          description: "3D models of target protein structures",
          size: "1.2 GB",
          date: "2023-10-05",
          hash: "QmX7b5jxn6Vd...",
        },
        {
          name: "Quantum Algorithm Documentation",
          description: "Technical documentation of our approach",
          size: "4.5 MB",
          date: "2023-10-15",
          hash: "QmY8c6jzm7Wd...",
        },
      ],
      supportTiers: [
        {
          amount: 100,
          title: "Early Supporter",
          description: "Access to monthly research updates and acknowledgment in publications",
          backers: 45,
        },
        {
          amount: 500,
          title: "Research Contributor",
          description:
            "All previous rewards plus early access to research data and quarterly virtual meetings with the research team",
          backers: 22,
        },
        {
          amount: 2500,
          title: "Major Contributor",
          description:
            "All previous rewards plus NFT certification of your contribution and naming rights for a discovered molecule",
          backers: 11,
        },
      ],
      fundingGoal: 50000,
      fundingRaised: 32500,
      backers: 78,
      daysLeft: 15,
      author: {
        name: "Dr. Alice Johnson",
        institution: "Stanford University",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Quantum Computing", "Drug Discovery", "AI"],
    },
    // You can add more experiment data here...
  }

  return experimentData[id as keyof typeof experimentData]
}

export default function ExperimentPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const { isConnected, connectWallet } = useWallet()

  const experiment = getExperimentData(params.id)

  if (!experiment) {
    notFound()
  }

  const handleBuyClick = () => {
    if (!isConnected) {
      connectWallet()
    } else {
      setIsPurchaseModalOpen(true)
    }
  }

  const percentFunded = Math.round((experiment.fundingRaised / experiment.fundingGoal) * 100)

  return (
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-primary">
                {experiment.category}
              </Badge>
              <div className="text-sm text-muted-foreground">ID: {experiment.id}</div>
            </div>
            <h1 className="text-3xl font-bold">{experiment.title}</h1>
            <p className="text-muted-foreground">{experiment.description}</p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={experiment.author.avatar} alt={experiment.author.name} />
                  <AvatarFallback>{experiment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{experiment.author.name}</div>
                  <div className="text-xs text-muted-foreground">{experiment.author.institution}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Contract
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="backers">Backers</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6 space-y-4">
                <div className="prose max-w-none dark:prose-invert">
                  <p>{experiment.details.overview}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {experiment.tags &&
                    experiment.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="updates" className="mt-6 space-y-4">
                {experiment.updates.map((update, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">{update.date}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{update.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="data" className="mt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Research Data Files</h3>
                  <p className="text-sm text-muted-foreground">
                    All data is stored on decentralized storage with cryptographic verification.
                  </p>
                </div>
                {experiment.dataFiles.map((file, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          {file.name}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">{file.date}</div>
                      </div>
                      <CardDescription>{file.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Size: {file.size}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          IPFS Hash: {file.hash}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="backers" className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">{experiment.backers} Backers</h3>
                </div>
                <div className="space-y-4 mt-4">
                  {experiment.supportTiers.map((tier, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{tier.title}</CardTitle>
                          <Badge variant="secondary">${tier.amount}</Badge>
                        </div>
                        <CardDescription>{tier.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          {tier.backers} backers have chosen this tier
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div>
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
                <CardDescription>
                  {experiment.daysLeft > 0
                    ? `${experiment.daysLeft} days left to reach the funding goal`
                    : "Funding period has ended"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{percentFunded}%</span>
                  </div>
                  <Progress value={percentFunded} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span>${experiment.fundingRaised.toLocaleString()} raised</span>
                    <span>${experiment.fundingGoal.toLocaleString()} goal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{experiment.backers}</span> backers
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{experiment.daysLeft}</span> days left
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" style={{ backgroundColor: "hsl(var(--orange))" }} onClick={handleBuyClick}>
                    Support This Research
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Smart Contract
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Contract Address: {experiment.contractAddress}</p>
                  <p className="mt-1">
                    All transactions are secured by blockchain technology. Funds are released to researchers based on
                    milestone achievements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <PurchaseAccessModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        experimentTitle={experiment.title}
        basePrice={experiment.accessPrice}
        experimentId={experiment.id}
      />
    </div>
  )
}

