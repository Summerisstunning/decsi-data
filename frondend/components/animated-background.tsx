"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particles for the bubbling effect
    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.size = Math.random() * 5 + 1
        this.speedY = Math.random() * 1 + 0.5
        this.color = `hsl(${210}, ${Math.random() * 50 + 50}%, ${Math.random() * 30 + 60}%)`
        this.alpha = Math.random() * 0.6 + 0.1
      }

      update() {
        this.y -= this.speedY
        if (this.y < -this.size) {
          this.y = canvas.height + Math.random() * 100
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.globalAlpha = this.alpha
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // DNA helix parameters
    const dnaStrands = 3
    const dnaGap = canvas.width / (dnaStrands + 1)
    const dnaHeight = canvas.height
    const dnaWidth = 100
    const dnaSpeed = 0.02
    let dnaOffset = 0

    // Lab equipment
    const drawFlask = (x: number, y: number, size: number) => {
      ctx.strokeStyle = "rgba(0, 102, 204, 0.6)"
      ctx.lineWidth = 2

      // Flask body
      ctx.beginPath()
      ctx.moveTo(x - size / 3, y - size / 2)
      ctx.lineTo(x - size / 3, y - size / 4)
      ctx.bezierCurveTo(x - size / 3, y + size / 3, x + size / 3, y + size / 3, x + size / 3, y - size / 4)
      ctx.lineTo(x + size / 3, y - size / 2)
      ctx.stroke()

      // Flask neck
      ctx.beginPath()
      ctx.moveTo(x - size / 6, y - size / 2)
      ctx.lineTo(x - size / 6, y - size / 1.5)
      ctx.lineTo(x + size / 6, y - size / 1.5)
      ctx.lineTo(x + size / 6, y - size / 2)
      ctx.stroke()

      // Liquid in flask
      const liquidHeight = Math.sin(Date.now() * 0.001) * 5
      ctx.fillStyle = "rgba(0, 204, 255, 0.3)"
      ctx.beginPath()
      ctx.moveTo(x - size / 3, y - size / 4 + liquidHeight)
      ctx.bezierCurveTo(
        x - size / 3,
        y + size / 3 + liquidHeight,
        x + size / 3,
        y + size / 3 + liquidHeight,
        x + size / 3,
        y - size / 4 + liquidHeight,
      )
      ctx.lineTo(x + size / 3, y + size / 3)
      ctx.lineTo(x - size / 3, y + size / 3)
      ctx.closePath()
      ctx.fill()
    }

    const drawCircuit = (x: number, y: number, size: number) => {
      ctx.strokeStyle = "rgba(0, 102, 204, 0.4)"
      ctx.lineWidth = 1

      // Draw circuit lines
      for (let i = 0; i < 5; i++) {
        const lineY = y + ((i - 2) * size) / 5
        ctx.beginPath()
        ctx.moveTo(x - size / 2, lineY)
        ctx.lineTo(x + size / 2, lineY)
        ctx.stroke()

        // Add nodes
        if (i % 2 === 0) {
          for (let j = 0; j < 3; j++) {
            const nodeX = x - size / 2 + (j * size) / 2
            ctx.fillStyle = "rgba(0, 204, 255, 0.5)"
            ctx.beginPath()
            ctx.arc(nodeX, lineY, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Vertical connections
      for (let i = 0; i < 3; i++) {
        const lineX = x - size / 2 + (i * size) / 2
        ctx.beginPath()
        ctx.moveTo(lineX, y - size / 2)
        ctx.lineTo(lineX, y + size / 2)
        ctx.stroke()
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update DNA animation
      dnaOffset += dnaSpeed

      // Draw DNA helixes
      for (let s = 0; s < dnaStrands; s++) {
        const strandX = (s + 1) * dnaGap

        for (let i = 0; i < dnaHeight; i += 20) {
          const wave1 = (Math.sin(i * 0.02 + dnaOffset) * dnaWidth) / 2
          const wave2 = (Math.sin(i * 0.02 + Math.PI + dnaOffset) * dnaWidth) / 2

          const x1 = strandX + wave1
          const x2 = strandX + wave2

          // DNA strand
          ctx.strokeStyle = "rgba(0, 102, 204, 0.15)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(x1, i)
          ctx.lineTo(x2, i)
          ctx.stroke()

          // DNA nodes
          ctx.fillStyle = "rgba(0, 204, 255, 0.2)"
          ctx.beginPath()
          ctx.arc(x1, i, 4, 0, Math.PI * 2)
          ctx.fill()

          ctx.fillStyle = "rgba(0, 102, 204, 0.2)"
          ctx.beginPath()
          ctx.arc(x2, i, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw lab equipment
      drawFlask(canvas.width * 0.2, canvas.height * 0.3, 100)
      drawFlask(canvas.width * 0.8, canvas.height * 0.7, 120)
      drawCircuit(canvas.width * 0.3, canvas.height * 0.6, 150)
      drawCircuit(canvas.width * 0.7, canvas.height * 0.2, 180)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
      style={{ pointerEvents: "none" }}
    />
  )
}

