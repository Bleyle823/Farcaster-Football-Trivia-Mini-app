import { FarcasterProviders } from "@/app/farcaster/providers";
import { ReadyOnMount } from "@/app/farcaster/components/ready-on-mount";
import { getBaseUrl } from "@/lib/constants";
import "@/styles/globals.css";

import { type Metadata, type Viewport } from "next";

const appUrl = getBaseUrl();

// Mini App Embed metadata to make pages sharable in Farcaster feeds
const miniapp = {
  version: "1" as const,
  imageUrl: `${appUrl}/og-football.png`,
  button: {
    title: "⚽ Start",
    action: {
      type: "launch_miniapp" as const,
      url: `${appUrl}/farcaster`,
      name: "Football Trivia",
      splashImageUrl: `${appUrl}/splash-image-200x200.png`,
      splashBackgroundColor: "#0B1320",
    },
  },
};

// Backwards compatibility tag for older clients
const frame = {
  ...miniapp,
  button: {
    ...miniapp.button,
    action: { ...miniapp.button.action, type: "launch_frame" as const },
  },
};

const stringifiedMiniapp = JSON.stringify(miniapp);
const stringifiedFrame = JSON.stringify(frame);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Farcaster Mini App Template",
  description: "Farcaster Mini App template for Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  appleWebApp: {
    capable: true,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    // Primary embed tag for Mini Apps
    "fc:miniapp": stringifiedMiniapp,
    // Backwards compatibility for older Farcaster clients
    "fc:frame": stringifiedFrame,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="overscroll-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      suppressHydrationWarning
    >
      <body className="overscroll-none">
        <FarcasterProviders>
          <ReadyOnMount />
          {children}
        </FarcasterProviders>
      </body>
    </html>
  );
}

