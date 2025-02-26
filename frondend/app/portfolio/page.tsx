"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Clock, Lock, RefreshCw, Wallet } from "lucide-react"
import { UploadDataModal } from "@/components/upload-data-modal"
import type { MyProject, Investment } from "@/types/portfolio"
import { useWallet } from "@/hooks/useWallet"
import { useProjects } from "@/contexts/project-context"
import { useInvestments } from "@/contexts/investment-context"

export default function PortfolioPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<MyProject | null>(null)
  const { isConnected, connectWallet } = useWallet()
  const { projects } = useProjects()
  const { investments } = useInvestments() // Add this line

  if (!isConnected) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-6">
            Please connect your wallet to view your portfolio, including your projects and investments.
          </p>
          <Button onClick={connectWallet} size="lg">
            <Wallet className="mr-2 h-4 w-4" />
            Connect MetaMask
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

      <Tabs defaultValue="my-projects">
        <TabsList className="mb-4">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="my-investments">My Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="my-projects">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first research project to begin tracking progress and receiving funding.
              </p>
              <Button style={{ backgroundColor: "hsl(var(--orange))" }} onClick={() => (window.location.href = "/")}>
                Start a Project
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onUpload={(project) => {
                    setSelectedProject(project)
                    setIsUploadModalOpen(true)
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-investments">
          {investments.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No Investments Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start investing in research projects to gain access rights and potential returns.
              </p>
              <Button
                style={{ backgroundColor: "hsl(var(--orange))" }}
                onClick={() => (window.location.href = "/experiments")}
              >
                Browse Experiments
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {investments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedProject && (
        <UploadDataModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          project={selectedProject}
        />
      )}
    </div>
  )
}

function ProjectCard({ project, onUpload }: { project: MyProject; onUpload: (project: MyProject) => void }) {
  const percentFunded = Math.round((project.fundingRaised / project.fundingGoal) * 100)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-2">{project.title}</CardTitle>
            <CardDescription>
              {project.status === "funding" ? (
                <Badge variant="secondary">Funding</Badge>
              ) : project.status === "in_progress" ? (
                <Badge variant="default">In Progress</Badge>
              ) : (
                <Badge variant="success">Completed</Badge>
              )}
            </CardDescription>
          </div>
          {project.status === "in_progress" && (
            <Button variant="outline" size="sm" onClick={() => onUpload(project)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Data
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {project.status === "funding" ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Funding Progress</span>
              <span>{percentFunded}%</span>
            </div>
            <Progress value={percentFunded} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${project.fundingRaised.toLocaleString()} raised</span>
              <span>${project.fundingGoal.toLocaleString()} goal</span>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Project Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Next Milestone</h4>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between text-sm mb-1">
                  <span>{project.nextMilestone.title}</span>
                  <Badge variant="outline">
                    <Lock className="h-3 w-3 mr-1" />
                    {project.nextMilestone.fundingLocked} $EDU
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Due {project.nextMilestone.deadline}
                </div>
              </div>
            </div>

            {project.dataUploads && project.dataUploads.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Recent Data Uploads</h4>
                <div className="space-y-2">
                  {project.dataUploads.map((upload, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{upload.title}</span>
                      <Badge variant={upload.status === "completed" ? "success" : "secondary"}>
                        {upload.status === "completed" ? "Uploaded" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

function InvestmentCard({ investment }: { investment: Investment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2">{investment.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Access until {investment.accessUntil}
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Investment</div>
            <div className="font-medium">{investment.investmentAmount} $EDU</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Citations</div>
            <div className="font-medium">{investment.citations}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Earnings</div>
            <div className="font-medium text-green-600">{investment.earnings} $EDU</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Updates</div>
            <div className="font-medium">{investment.updates.length}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Recent Updates</h4>
          <div className="space-y-2">
            {investment.updates.slice(0, 2).map((update, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{update.title}</span>
                <span className="text-muted-foreground">{update.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Your Rights</h4>
          <div className="space-y-1">
            {investment.rights.map((right, index) => (
              <div key={index} className="text-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {right}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          View Full Details
        </Button>
      </CardFooter>
    </Card>
  )
}

// 只保留示例投资数据，项目数据现在来自 ProjectContext
const myInvestments: Investment[] = [
  {
    id: "1",
    title: "Climate Change Impact on Marine Ecosystems",
    investmentAmount: 5000,
    accessUntil: "2025-02-28",
    citations: 23,
    earnings: 750,
    updates: [
      {
        date: "2024-02-15",
        title: "New coral reef data added",
      },
      {
        date: "2024-01-30",
        title: "Temperature analysis updated",
      },
    ],
    rights: [
      "Access to all research data",
      "Usage rights for derivative research",
      "Revenue share from citations",
      "Access to future updates",
    ],
  },
  {
    id: "2",
    title: "CRISPR Applications in Crop Resilience",
    investmentAmount: 3000,
    accessUntil: "2024-12-31",
    citations: 15,
    earnings: 450,
    updates: [
      {
        date: "2024-02-20",
        title: "Gene editing results published",
      },
      {
        date: "2024-02-01",
        title: "New crop variety data",
      },
    ],
    rights: ["Access to research data", "Usage rights for academic purposes", "Revenue share from citations"],
  },
]

