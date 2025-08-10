import { NextRequest } from 'next/server'
export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const url = new URL(request.url)
  const origin = `${url.protocol}//${url.host}`

  // Use the provided association values (env vars can override if set)
  const accountAssociation = {
    header:
      process.env.FARCASTER_ACCOUNT_HEADER ||
      'eyJmaWQiOjY3NDc5MiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDdENjI4NDE4NjEyNzU0OWUxODgzRjMwMUM0MjU5MTBGMzYxOUUyNTQifQ',
    payload:
      process.env.FARCASTER_ACCOUNT_PAYLOAD ||
      'eyJkb21haW4iOiJmYXJjYXN0ZXItZm9vdGJhbGwtdHJpdmlhLW1pbmktYXBwLnZlcmNlbC5hcHAifQ',
    signature:
      process.env.FARCASTER_ACCOUNT_SIGNATURE ||
      'MHg1MGE1Nzk1M2Y5ZWJhZWZhZWNhNzcxZjI4N2ExOWE4MGFkYjZkMTNmZTA2MWM4Njc1MDBkNTU2Mjk0YTc4ZDA3M2NkMzkwMmFiZTc5MWNhZDY2NDdmOWEzY2M2M2ZkNjE1MGU5ZTU3NjAxMThkMjRkZmZiNDZkOTM0MjViZDAzZTFj',
  }

  const manifest = {
    accountAssociation,
    frame: {
      name: 'Football Trivia',
      version: '1',
      iconUrl: 'https://drive.google.com/uc?id=YOUR_ICON_FILE_ID',
      homeUrl: 'https://farcaster-football-trivia-mini-app.vercel.app',
      imageUrl: 'https://drive.google.com/uc?id=YOUR_MAIN_IMAGE_FILE_ID',
      buttonTitle: 'open mini app',
      splashImageUrl: 'https://drive.google.com/uc?id=YOUR_SPLASH_IMAGE_FILE_ID',
      splashBackgroundColor: '#000000',
      webhookUrl: 'https://farcaster-football-trivia-mini-app.vercel.app/api/webhook',
      subtitle: 'Play a fun football trivia game',
      heroImageUrl: 'https://drive.google.com/uc?id=YOUR_HERO_IMAGE_FILE_ID',
      tags: ['social', 'sports', 'messaging'],
      tagline: 'Gaming',
      primaryCategory: 'games',
      ogTitle: 'Football games fast',
      ogDescription: 'Play fun football games',
      description: 'Experience the fun of football trivia games',
      ogImageUrl: 'https://drive.google.com/uc?id=YOUR_OG_IMAGE_FILE_ID',
      screenshotUrls: ['https://drive.google.com/uc?id=YOUR_SCREENSHOT_FILE_ID'],
      castShareUrl: 'https://farcaster-football-trivia-mini-app.vercel.app',
    },
  }

  return Response.json(manifest)
}


