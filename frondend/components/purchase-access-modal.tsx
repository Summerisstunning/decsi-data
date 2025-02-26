"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Info, Loader2, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@/hooks/useWallet"
import { useToast } from "@/components/ui/use-toast"
import { useInvestments } from "@/contexts/investment-context"
import { useBlockchain } from "@/hooks/useBlockchain"

interface PurchaseAccessModalProps {
  isOpen: boolean
  onClose: () => void
  experimentTitle: string
  basePrice: number
  experimentId: string
}

export function PurchaseAccessModal({
  isOpen,
  onClose,
  experimentTitle,
  basePrice,
  experimentId,
}: PurchaseAccessModalProps) {
  const [months, setMonths] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isConnected, connectWallet } = useWallet()
  const { toast } = useToast()
  const { addInvestment } = useInvestments()
  const { fundExperiment } = useBlockchain()

  const totalPrice = basePrice * months

  const handlePurchase = async () => {
    if (!isConnected) {
      return
    }

    setIsSubmitting(true)
    try {
      // 调用区块链合约进行购买
      const tx = await fundExperiment(experimentId, totalPrice.toString())

      // 添加投资到本地状态
      const accessUntil = new Date()
      accessUntil.setMonth(accessUntil.getMonth() + months)

      await addInvestment({
        title: experimentTitle,
        investmentAmount: totalPrice,
        accessUntil: accessUntil.toISOString().split("T")[0],
        citations: 0,
        earnings: 0,
        updates: [
          {
            date: new Date().toISOString().split("T")[0],
            title: "Access NFT purchased",
          },
        ],
        rights: [
          "Access to all research data",
          "Rights to use data in derivative research",
          "Revenue share from citations",
          "Access to future updates",
        ],
      })

      toast({
        title: "购买成功",
        description: `您现在拥有 ${months} 个月的 ${experimentTitle} 访问权限`,
      })

      onClose()
    } catch (error) {
      console.error("购买访问权限时出错:", error)
      toast({
        title: "购买失败",
        description: "处理您的购买时出现错误，请重试。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>连接钱包</DialogTitle>
            <DialogDescription>请连接您的钱包以购买访问权限。</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <Button onClick={connectWallet} size="lg">
              <Wallet className="mr-2 h-4 w-4" />
              连接 MetaMask
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>购买 NFT 访问权限</DialogTitle>
          <DialogDescription>获取 {experimentTitle} 的可转让访问权限</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>访问时长</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[months]}
                onValueChange={(value) => setMonths(value[0])}
                min={1}
                max={24}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-20"
                min={1}
                max={24}
              />
              <span className="text-sm text-muted-foreground">个月</span>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">每月价格</span>
                <span className="font-medium">{basePrice} $EDU</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm">时长</span>
                <span className="font-medium">{months} 个月</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">总价</span>
                  <span className="font-bold text-lg">{totalPrice} $EDU</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-4 text-sm space-y-2">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">NFT 访问权限</p>
                <p className="text-muted-foreground">此 NFT 授予您访问实验数据的权限，可以在 NFT 市场上转让或交易。</p>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handlePurchase} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              处理中...
            </>
          ) : (
            "购买访问 NFT"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

