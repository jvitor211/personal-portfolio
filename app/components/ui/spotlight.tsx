"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useRef, useState } from "react"

export const Spotlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return

      const rect = divRef.current.getBoundingClientRect()
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    divRef.current?.addEventListener("mousemove", handleMouseMove)

    return () => {
      divRef.current?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMounted])

  return (
    <div ref={divRef} className={cn("relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-0 z-10 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(29,78,216,0.15), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}

