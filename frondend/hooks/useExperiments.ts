"use client"

import { useState, useEffect } from "react"
import { experimentsAPI } from "@/lib/api"

export function useExperiments() {
  const [experiments, setExperiments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadExperiments() {
      try {
        setIsLoading(true)
        const data = await experimentsAPI.getAll()
        setExperiments(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("加载实验失败"))
      } finally {
        setIsLoading(false)
      }
    }

    loadExperiments()
  }, [])

  const createExperiment = async (experimentData: any) => {
    try {
      const newExperiment = await experimentsAPI.create(experimentData)
      setExperiments((prev) => [...prev, newExperiment])
      return newExperiment
    } catch (err) {
      throw err instanceof Error ? err : new Error("创建实验失败")
    }
  }

  const getExperimentById = async (id: string) => {
    try {
      return await experimentsAPI.getById(id)
    } catch (err) {
      throw err instanceof Error ? err : new Error("获取实验详情失败")
    }
  }

  return {
    experiments,
    isLoading,
    error,
    createExperiment,
    getExperimentById,
  }
}

