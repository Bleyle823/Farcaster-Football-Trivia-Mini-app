import { getBaseUrl } from "@/lib/constants";
import { type domainManifestSchema } from "@farcaster/frame-core";
import { type z } from "zod";

type Manifest = z.input<typeof domainManifestSchema>;

const appUrl = getBaseUrl();

// Docs
// https://miniapps.farcaster.xyz/docs/guides/publishing#host-a-manifest-file
export const farcasterManifest: Manifest = {
  accountAssociation: {
    header:
      "eyJmaWQiOjI5MjE5NCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDcyNTU0QTIyNEI0Qjc1Njk2OTdBYWQ1ZUE1YmQ1NzM5ZDAxQzliYzMifQ",
    payload: "eyJkb21haW4iOiJ0ZW1wbGF0ZS5nYWlhcy54eXoifQ",
    signature:
      "MHg0N2YwYzJlZDQ3ZTMwODZiMGVmYjk3ZmQwYWM5NGQxZjk3Mjg4NDg0NTc3MjY4Yjg4Yzk4MjAyODlmMTI4MjkzMGZiNmExYTdhN2IxYWJlMmQxMzNjMDE1YTQ0Y2FkNWU5M2NiNmRiNmZhYzFjNDcyNjI5NDAwZTk5YmExODNiNjFi",
  },
  frame: {
    version: "1",
    name: "Football Trivia",
    homeUrl: `${appUrl}/farcaster`,
    iconUrl: `${appUrl}/football-icon-1024x1024.png`,
    // Add this file in public/ if you want a splash animation
    splashImageUrl: `${appUrl}/splash-image-200x200.png`,
    splashBackgroundColor: "#0B1320",
    // webhookUrl: "https://api.example.com/webhook/farcaster",
    subtitle: "Test your football knowledge",
    description:
      "Quick-fire football questions across leagues, history, players, and records. Climb the leaderboard and challenge friends.",
    screenshotUrls: [
      `${appUrl}/screenshots/ft-home.png`,
      `${appUrl}/screenshots/ft-question.png`,
      `${appUrl}/screenshots/ft-results.png`,
    ],
    primaryCategory: "games",
    tags: ["football", "soccer", "trivia", "sports"],
    heroImageUrl: `${appUrl}/football-hero-1200x630.jpg`,
    tagline: "Score points with every correct answer",
    ogTitle: "Football Trivia",
    ogDescription:
      "Fast, fun football trivia. How high can you score?",
    ogImageUrl: `${appUrl}/football-hero-1200x630.png`,
    noindex: false,
    // requiredChains: [],
    // requiredCapabilities: [
    // "wallet.getEthereumProvider",
    // "wallet.getSolanaProvider",
    // "actions.ready",
    // "actions.openUrl",
    // "actions.close",
    // "actions.setPrimaryButton",
    // "actions.addMiniApp",
    // "actions.signIn",
    // "actions.viewCast",
    // "actions.viewProfile",
    // "actions.composeCast",
    // "actions.viewToken",
    // "actions.sendToken",
    // "actions.swapToken",
    // "haptics.impactOccurred",
    // "haptics.notificationOccurred",
    // "haptics.selectionChanged",
    // "back",
    // ],
    // castShareUrl
  },
};
