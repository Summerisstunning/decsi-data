"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useWallet } from "@/hooks/useWallet"
import { Loader2, Wallet } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useProjects } from "@/contexts/project-context"
import { useToast } from "@/components/ui/use-toast"

interface CreateExperimentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateExperimentModal({ isOpen, onClose }: CreateExperimentModalProps) {
  const router = useRouter()
  const { isConnected, connectWallet } = useWallet()
  const { addProject } = useProjects()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    methodology: "",
    impact: "",
    fundingType: "donation",
    fundingGoal: "",
    dataAccess: "public",
    timeline: "",
  })

  const handleSubmit = async () => {
    if (!isConnected) {
      return
    }

    setIsSubmitting(true)
    try {
      // Create new project
      const newProject = await addProject({
        title: formData.title,
        fundingGoal: Number(formData.fundingGoal),
        fundingRaised: 0,
        status: "funding",
        progress: 0,
        nextMilestone: {
          title: "Initial Funding Goal",
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days from now
          fundingLocked: Number(formData.fundingGoal),
        },
        dataUploads: [],
      })

      // Show success message
      toast({
        title: "Project Created",
        description: "Your new research project has been created successfully.",
      })

      // Close modal and redirect to portfolio
      onClose()
      router.push("/portfolio")
    } catch (error) {
      console.error("Error creating project:", error)
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>Please connect your wallet to create a new research project.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <Button onClick={connectWallet} size="lg">
              <Wallet className="mr-2 h-4 w-4" />
              Connect MetaMask
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Experiment</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Define your experiment objectives and methodology"
              : step === 2
                ? "Set up funding requirements"
                : "Configure data access settings"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Experiment Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter experiment title"
                />
              </div>
              <div>
                <Label htmlFor="objective">Research Objective</Label>
                <Textarea
                  id="objective"
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="Describe your research direction and goals"
                />
              </div>
              <div>
                <Label htmlFor="methodology">Methodology</Label>
                <Textarea
                  id="methodology"
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                  placeholder="Describe your experimental methods"
                />
              </div>
              <div>
                <Label htmlFor="impact">Expected Impact</Label>
                <Textarea
                  id="impact"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  placeholder="Describe the potential impact of your research"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Funding Type</Label>
                <RadioGroup
                  value={formData.fundingType}
                  onValueChange={(value) => setFormData({ ...formData, fundingType: value })}
                  className="flex flex-col space-y-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donation" id="donation" />
                    <Label htmlFor="donation">Donation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="investment" id="investment" />
                    <Label htmlFor="investment">Investment</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="fundingGoal">Funding Goal ($EDU)</Label>
                <Input
                  id="fundingGoal"
                  type="number"
                  value={formData.fundingGoal}
                  onChange={(e) => setFormData({ ...formData, fundingGoal: e.target.value })}
                  placeholder="Enter funding goal in $EDU"
                />
              </div>
              <div>
                <Label htmlFor="timeline">Project Timeline</Label>
                <Textarea
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="Describe your project milestones and timeline"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Data Access Type</Label>
                <Select
                  value={formData.dataAccess}
                  onValueChange={(value) => setFormData({ ...formData, dataAccess: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select data access type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Access</SelectItem>
                    <SelectItem value="timed">Time-Limited Access</SelectItem>
                    <SelectItem value="supporters">Supporters Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <AlertDescription>
                  After creation, this project will appear in your portfolio where you can track its progress, manage
                  funding, and upload research data.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1 || isSubmitting}>
            Back
          </Button>
          <Button
            onClick={() => {
              if (step < 3) setStep(step + 1)
              else handleSubmit()
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : step === 3 ? (
              "Create Experiment"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

