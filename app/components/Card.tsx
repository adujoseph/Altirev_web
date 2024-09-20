import React from 'react'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-[#fff] shadow overflow-hidden m-3">
      {children}
    </div>
  )
}
