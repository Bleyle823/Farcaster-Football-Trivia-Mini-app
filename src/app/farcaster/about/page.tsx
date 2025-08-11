import { SafeArea } from "@/app/farcaster/components/safe-area";
import { TopNavbar, topNavHeight } from "@/app/farcaster/components/top-navbar";
import Link from "next/link";

export default function Page() {
  return (
    <SafeArea {...{ topNavHeight }}>
      <TopNavbar />
      <main className="flex gap-4">
        About
        <Link href="/farcaster">Go Home</Link>
      </main>
    </SafeArea>
  );
}


// {
//   "accountAssociation": {
//     "header": "eyJmaWQiOjY3NDc5MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDYyRTdhOGRCYjhEODUzOGUxY0RiNUQ4OTMwMzBCYjE2ZUEwMEIyRjIifQ",
//     "payload": "eyJkb21haW4iOiJmYXJjYXN0ZXItZm9vdGJhbGwtdHJpdmlhLW1pbmktYXBwLnZlcmNlbC5hcHAifQ",
//     "signature": "XNyQBVl65N/JwcNjbZPh6GURRPETPDFK6oOt3yp7//0FOVHHcSRzRm6sY/VWEn/c1grnUP1+cU5LbcvEPL9BKBw="
//   },
//   "frame": {
//     "version": "1",
//     "name": "Football Trivia",
//     "homeUrl": "/farcaster",
//     "iconUrl": "/football-icon-1024x1024.png",
//     "splashImageUrl": "/splash-image-200x200.png",
//     "splashBackgroundColor": "#0B1320",
//     "subtitle": "Test your football knowledge",
//     "description": "Quick-fire football questions across leagues, history, players, and records. Climb the leaderboard and challenge friends.",
//     "screenshotUrls": [
//       "/screenshots/ft-home.png",
//       "/screenshots/ft-question.png",
//       "/screenshots/ft-results.png"
//     ],
//     "primaryCategory": "games",
//     "tags": ["football", "soccer", "trivia", "sports"],
//     "heroImageUrl": "/football-hero-1200x630.jpg",
//     "tagline": "Score points with every correct answer",
//     "ogTitle": "Football Trivia",
//     "ogDescription": "Fast, fun football trivia. How high can you score?",
//     "ogImageUrl": "/football-hero-1200x630.jpg",
//     "noindex": false
//   }
// }
