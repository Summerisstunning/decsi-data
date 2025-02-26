"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Investment } from "@/types/portfolio"

interface InvestmentState {
  investments: Investment[]
}

type InvestmentAction =
  | { type: "ADD_INVESTMENT"; investment: Investment }
  | { type: "UPDATE_INVESTMENT"; investment: Investment }
  | { type: "SET_INVESTMENTS"; investments: Investment[] }

interface InvestmentContextType {
  investments: Investment[]
  addInvestment: (investment: Omit<Investment, "id">) => Promise<Investment>
  updateInvestment: (investment: Investment) => void
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined)

function investmentReducer(state: InvestmentState, action: InvestmentAction): InvestmentState {
  switch (action.type) {
    case "ADD_INVESTMENT":
      return {
        ...state,
        investments: [...state.investments, action.investment],
      }
    case "UPDATE_INVESTMENT":
      return {
        ...state,
        investments: state.investments.map((i) => (i.id === action.investment.id ? action.investment : i)),
      }
    case "SET_INVESTMENTS":
      return {
        ...state,
        investments: action.investments,
      }
    default:
      return state
  }
}

export function InvestmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(investmentReducer, { investments: [] })

  // Load investments from localStorage on mount
  useEffect(() => {
    const savedInvestments = localStorage.getItem("investments")
    if (savedInvestments) {
      dispatch({ type: "SET_INVESTMENTS", investments: JSON.parse(savedInvestments) })
    }
  }, [])

  // Save investments to localStorage when they change
  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(state.investments))
  }, [state.investments])

  const addInvestment = async (investmentData: Omit<Investment, "id">) => {
    const newInvestment: Investment = {
      ...investmentData,
      id: `investment_${Date.now()}`,
    }

    dispatch({ type: "ADD_INVESTMENT", investment: newInvestment })
    return newInvestment
  }

  const updateInvestment = (investment: Investment) => {
    dispatch({ type: "UPDATE_INVESTMENT", investment })
  }

  return (
    <InvestmentContext.Provider
      value={{
        investments: state.investments,
        addInvestment,
        updateInvestment,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  )
}

export function useInvestments() {
  const context = useContext(InvestmentContext)
  if (context === undefined) {
    throw new Error("useInvestments must be used within an InvestmentProvider")
  }
  return context
}

