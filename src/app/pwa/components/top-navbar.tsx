"use client";

import { TopNavbarWrapper } from "@/app/pwa/components/top-navbar-wrapper";
import { usePathname } from "next/navigation";

export const topNavHeight = "calc(4rem + 1px)";

const pageInfo: Record<string, { title: string; emoji: string }> = {
  "/pwa": { title: "Football Trivia", emoji: "⚽" },
  "/pwa/about": { title: "About", emoji: "ℹ️" },
  "/pwa/profile": { title: "Profile", emoji: "👤" },
  "/pwa/settings": { title: "Settings", emoji: "⚙️" },
};

export function PwaTopNavbar() {
  const pathname = usePathname();
  const currentPage = pageInfo[pathname] || { title: "Football Trivia", emoji: "⚽" };

  return (
    <TopNavbarWrapper>
      <div className="max-w-global z-50 flex h-full w-full items-center justify-between bg-background/95 backdrop-blur-sm border-b px-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="text-2xl">{currentPage.emoji}</div>
          <div className="text-lg font-semibold text-primary">
            {currentPage.title}
          </div>
        </div>

        {/* Right side - could be used for user actions or notifications */}
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </TopNavbarWrapper>
  );
}
