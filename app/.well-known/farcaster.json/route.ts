import { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const url = new URL(request.url)
  const origin = `${url.protocol}//${url.host}`

  // Fallback to provided association values if env vars are not set
  const defaultAssociation = {
    header:
      'eyJmaWQiOjY3NDc5MiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDdENjI4NDE4NjEyNzU0OWUxODgzRjMwMUM0MjU5MTBGMzYxOUUyNTQifQ',
    payload:
      'eyJkb21haW4iOiJmYXJjYXN0ZXItZm9vdGJhbGwtdHJpdmlhLW1pbmktYXBwLnZlcmNlbC5hcHAifQ',
    signature:
      'MHg1MGE1Nzk1M2Y5ZWJhZWZhZWNhNzcxZjI4N2ExOWE4MGFkYjZkMTNmZTA2MWM4Njc1MDBkNTU2Mjk0YTc4ZDA3M2NkMzkwMmFiZTc5MWNhZDY2NDdmOWEzY2M2M2ZkNjE1MGU5ZTU3NjAxMThkMjRkZmZiNDZkOTM0MjViZDAzZTFj',
  }

  const accountAssociation = {
    header: process.env.FARCASTER_ACCOUNT_HEADER || defaultAssociation.header,
    payload: process.env.FARCASTER_ACCOUNT_PAYLOAD || defaultAssociation.payload,
    signature: process.env.FARCASTER_ACCOUNT_SIGNATURE || defaultAssociation.signature,
  }

  const manifest = {
    accountAssociation,
    frame: {
      version: '1',
      name: 'Football Trivia',
      iconUrl: `${origin}/placeholder-logo.png`,
      homeUrl: origin,
      splashImageUrl: `${origin}/placeholder.jpg`,
      splashBackgroundColor: '#000000',
      webhookUrl: `${origin}/api/webhook`,
    },
  }

  return Response.json(manifest)
}


