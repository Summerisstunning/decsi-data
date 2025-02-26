"use client"

import { useState } from "react"
import { experimentContract, dataNFTContract } from "@/lib/blockchain"
import { useWallet } from "@/hooks/useWallet"

export function useBlockchain() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { account } = useWallet()

  // 创建实验
  const createExperiment = async (experimentData: any) => {
    try {
      setIsLoading(true)
      setError(null)
      const tx = await experimentContract.createExperiment(experimentData)
      return tx
    } catch (err) {
      setError(err instanceof Error ? err : new Error("创建实验失败"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // 为实验提供资金
  const fundExperiment = async (experimentId: string, amount: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const tx = await experimentContract.fundExperiment(experimentId, amount)
      return tx
    } catch (err) {
      setError(err instanceof Error ? err : new Error("资助实验失败"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // 创建数据 NFT
  const createDataNFT = async (experimentId: string, metadata: any) => {
    try {
      setIsLoading(true)
      setError(null)
      const tx = await dataNFTContract.createDataNFT(experimentId, metadata)
      return tx
    } catch (err) {
      setError(err instanceof Error ? err : new Error("创建数据 NFT 失败"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // 获取用户的数据 NFT
  const getUserDataNFTs = async () => {
    if (!account) {
      throw new Error("请先连接钱包")
    }

    try {
      setIsLoading(true)
      setError(null)
      return await dataNFTContract.getUserDataNFTs(account)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("获取数据 NFT 失败"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    createExperiment,
    fundExperiment,
    createDataNFT,
    getUserDataNFTs,
  }
}

