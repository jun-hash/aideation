import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className="bg-gradient-to-r min-h-screen grainy from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI <span className="text-green-600 font-bold">note taking</span>{" "}
          assistant.
        </h1>
      </div>
    </div>
  )
}
