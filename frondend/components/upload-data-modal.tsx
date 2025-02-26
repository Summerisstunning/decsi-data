"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUp, AlertCircle } from "lucide-react"
import type { MyProject } from "@/types/portfolio"

interface UploadDataModalProps {
  isOpen: boolean
  onClose: () => void
  project: MyProject
}

export function UploadDataModal({ isOpen, onClose, project }: UploadDataModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: null as File[] | null,
    dataType: "",
    license: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) })
    }
  }

  const handleSubmit = async () => {
    // Here you would:
    // 1. Upload the data to decentralized storage
    // 2. Create the data NFT
    // 3. Update the smart contract with new data reference
    // 4. Release the locked funding if milestone is completed
    console.log("Uploading data:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Research Data</DialogTitle>
          <DialogDescription>Upload your research data to create a data NFT and unlock funding</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This data will be converted into an NFT to ensure its uniqueness and ownership. The upload will trigger a
              smart contract verification for milestone completion.
            </AlertDescription>
          </Alert>

          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Data Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a title for this data upload"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the contents and significance of this data"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Input
                  id="dataType"
                  value={formData.dataType}
                  onChange={(e) => setFormData({ ...formData, dataType: e.target.value })}
                  placeholder="e.g., Experimental Results, Analysis, Raw Data"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Upload Files</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Input id="file" type="file" multiple className="hidden" onChange={handleFileChange} />
                  <Label htmlFor="file" className="cursor-pointer">
                    <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to select files or drag and drop</p>
                  </Label>
                </div>
                {formData.files && (
                  <div className="text-sm text-muted-foreground">{formData.files.length} files selected</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">Data License</Label>
                <Input
                  id="license"
                  value={formData.license}
                  onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                  placeholder="Specify the license for data usage"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1}>
            Back
          </Button>
          <Button
            onClick={() => {
              if (step < 2) setStep(step + 1)
              else handleSubmit()
            }}
          >
            {step === 2 ? "Upload & Create NFT" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

