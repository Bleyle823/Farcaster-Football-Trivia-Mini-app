"use client"

import { useEffect } from "react"
import { sdk } from "@farcaster/miniapp-sdk"
import FootballTrivia from "../football-trivia"

export default function Page() {
  useEffect(() => {
    async function ready() {
      try {
        await sdk.actions.ready()
      } catch {
        // ignore if not running inside Farcaster client
      }
    }
    ready()
  }, [])

  return (
    <div>
      <FootballTrivia />
    </div>
  )
}
