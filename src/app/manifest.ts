import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Football Trivia",
    short_name: "FT Trivia",
    description: "Quick-fire football questions. Test your knowledge and climb the leaderboard.",
    start_url: "/pwa",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B1320",
    theme_color: "#0B1320",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
