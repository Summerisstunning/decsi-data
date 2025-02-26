"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { MyProject } from "@/types/portfolio"

interface ProjectState {
  projects: MyProject[]
}

type ProjectAction =
  | { type: "ADD_PROJECT"; project: MyProject }
  | { type: "UPDATE_PROJECT"; project: MyProject }
  | { type: "SET_PROJECTS"; projects: MyProject[] }

interface ProjectContextType {
  projects: MyProject[]
  addProject: (project: Omit<MyProject, "id">) => Promise<MyProject>
  updateProject: (project: MyProject) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.project],
      }
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.project.id ? action.project : p)),
      }
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.projects,
      }
    default:
      return state
  }
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, { projects: [] })

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      dispatch({ type: "SET_PROJECTS", projects: JSON.parse(savedProjects) })
    }
  }, [])

  // Save projects to localStorage when they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(state.projects))
  }, [state.projects])

  const addProject = async (projectData: Omit<MyProject, "id">) => {
    // Generate a unique ID for the new project
    const newProject: MyProject = {
      ...projectData,
      id: `project_${Date.now()}`,
    }

    dispatch({ type: "ADD_PROJECT", project: newProject })
    return newProject
  }

  const updateProject = (project: MyProject) => {
    dispatch({ type: "UPDATE_PROJECT", project })
  }

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        addProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}

