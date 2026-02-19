'use client'

import { HTMLAttributes } from 'react'

interface MysticCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export default function MysticCard({ children, className = '', glow = false, ...props }: MysticCardProps) {
  return (
    <div
      className={`card-gold rounded-xl p-6 transition-all duration-300 ${glow ? 'shadow-[0_0_30px_rgba(201,149,42,0.15)]' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
