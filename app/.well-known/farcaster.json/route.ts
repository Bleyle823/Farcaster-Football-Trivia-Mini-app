import { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const url = new URL(request.url)
  const origin = `${url.protocol}//${url.host}`

  const accountAssociation = {
    header: process.env.FARCASTER_ACCOUNT_HEADER || '',
    payload: process.env.FARCASTER_ACCOUNT_PAYLOAD || '',
    signature: process.env.FARCASTER_ACCOUNT_SIGNATURE || '',
  }

  const manifest = {
    accountAssociation,
    frame: {
      version: '1',
      name: 'Football Trivia',
      iconUrl: `${origin}/placeholder-logo.png`,
      homeUrl: origin,
      splashImageUrl: `${origin}/placeholder.jpg`,
      splashBackgroundColor: '#ffffff',
    },
  }

  return Response.json(manifest)
}


