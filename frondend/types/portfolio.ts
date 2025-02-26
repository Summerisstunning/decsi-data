export interface MyProject {
  id: string
  title: string
  fundingGoal: number
  fundingRaised: number
  status: "funding" | "in_progress" | "completed"
  nextMilestone: {
    title: string
    deadline: string
    fundingLocked: number
  }
  progress: number
  dataUploads: {
    date: string
    title: string
    status: "completed" | "pending"
  }[]
}

export interface Investment {
  id: string
  title: string
  investmentAmount: number
  accessUntil: string
  citations: number
  earnings: number
  updates: {
    date: string
    title: string
  }[]
  rights: string[]
}

