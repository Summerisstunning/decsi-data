"use client"

import { useEffect, useRef } from "react"

export default function LabEquipment() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 200

    // Lab equipment animation
    let bubbleTime = 0
    const bubbles: { x: number; y: number; size: number; speed: number }[] = []

    // Create initial bubbles
    for (let i = 0; i < 15; i++) {
      bubbles.push({
        x: 150 + Math.random() * 30 - 15,
        y: 150 + Math.random() * 20,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.2,
      })
    }

    const drawLabEquipment = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw flask
      ctx.strokeStyle = "#0066cc"
      ctx.lineWidth = 2

      // Flask body
      ctx.beginPath()
      ctx.moveTo(120, 80)
      ctx.lineTo(120, 120)
      ctx.bezierCurveTo(120, 170, 180, 170, 180, 120)
      ctx.lineTo(180, 80)
      ctx.stroke()

      // Flask neck
      ctx.beginPath()
      ctx.moveTo(135, 80)
      ctx.lineTo(135, 60)
      ctx.lineTo(165, 60)
      ctx.lineTo(165, 80)
      ctx.stroke()

      // Liquid in flask
      const liquidHeight = Math.sin(Date.now() * 0.001) * 3
      ctx.fillStyle = "rgba(0, 204, 255, 0.3)"
      ctx.beginPath()
      ctx.moveTo(120, 120 + liquidHeight)
      ctx.bezierCurveTo(120, 170 + liquidHeight, 180, 170 + liquidHeight, 180, 120 + liquidHeight)
      ctx.lineTo(180, 170)
      ctx.lineTo(120, 170)
      ctx.closePath()
      ctx.fill()

      // Update bubbles
      bubbleTime += 0.1
      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed

        // Reset bubble if it reaches the top
        if (bubble.y < 120) {
          bubble.y = 150 + Math.random() * 20
          bubble.x = 150 + Math.random() * 30 - 15
        }

        // Draw bubble
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw test tubes
      const drawTestTube = (x: number, fillLevel: number, color: string) => {
        // Test tube body
        ctx.strokeStyle = "#0066cc"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x - 10, 60)
        ctx.lineTo(x - 10, 140)
        ctx.arc(x, 140, 10, Math.PI, 0, false)
        ctx.lineTo(x + 10, 60)
        ctx.stroke()

        // Test tube liquid
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(x - 9, 140 - fillLevel)
        ctx.lineTo(x - 9, 140)
        ctx.arc(x, 140, 9, Math.PI, 0, false)
        ctx.lineTo(x + 9, 140 - fillLevel)
        ctx.closePath()
        ctx.fill()
      }

      // Draw multiple test tubes with different fill levels and colors
      drawTestTube(70, 50 + Math.sin(bubbleTime * 0.5) * 5, "rgba(255, 165, 0, 0.3)")
      drawTestTube(230, 70 + Math.sin(bubbleTime * 0.5 + 1) * 5, "rgba(75, 0, 130, 0.3)")

      // Draw connecting tubes
      ctx.strokeStyle = "#0066cc"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(70, 60)
      ctx.bezierCurveTo(70, 30, 150, 30, 150, 60)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(230, 60)
      ctx.bezierCurveTo(230, 30, 150, 30, 150, 60)
      ctx.stroke()

      requestAnimationFrame(drawLabEquipment)
    }

    drawLabEquipment()
  }, [])

  return <canvas ref={canvasRef} width={300} height={200} className="mx-auto my-4" />
}

