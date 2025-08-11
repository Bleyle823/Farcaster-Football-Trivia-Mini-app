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
        src: "/football-icon-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
