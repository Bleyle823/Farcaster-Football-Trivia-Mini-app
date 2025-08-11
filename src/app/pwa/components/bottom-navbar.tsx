"use client";

import { BottomNavbarWrapper } from "@/app/pwa/components/bottom-navbar-wrapper";
import { cn } from "@/lib/utils";
import { CircleUser, CogIcon, HomeIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navRoutes = [
  "/pwa",
  "/pwa/about",
  "/pwa/profile",
  "/pwa/settings",
] as const;

type NavRoutes = (typeof navRoutes)[number];

const navSetup: Record<
  NavRoutes,
  {
    name: string;
    isActive: string[];
    icon: React.ReactNode;
    emoji: string;
  }
> = {
  "/pwa": {
    name: "Home",
    isActive: ["/pwa"],
    icon: <HomeIcon className="size-5" />,
    emoji: "⚽",
  },
  "/pwa/about": {
    name: "About",
    isActive: ["/pwa/about"],
    icon: <InfoIcon className="size-5" />,
    emoji: "ℹ️",
  },
  "/pwa/profile": {
    name: "Profile",
    isActive: ["/pwa/profile"],
    icon: <CircleUser className="size-5" />,
    emoji: "👤",
  },
  "/pwa/settings": {
    name: "Settings",
    isActive: ["/pwa/settings"],
    icon: <CogIcon className="size-5" />,
    emoji: "⚙️",
  },
} as const;

export const bottomNavHeight = "calc(4.5rem + 1px)";

export function PwaBottomNavbar() {
  const pathname = usePathname();

  return (
    <BottomNavbarWrapper>
      <nav className="max-w-global flex h-full w-full items-center justify-evenly bg-background/95 backdrop-blur-sm border-t">
        {navRoutes.map((route, index) => {
          const activeRoutes = navSetup[route].isActive;
          const isActive = activeRoutes.includes(pathname);

          return (
            <Link
              key={`bottom-navbar-link-${route}-${index}`}
              href={route}
              className={cn(
                "flex h-full flex-1 flex-col items-center justify-center gap-1 px-2 py-2 relative transition-all duration-200 ease-in-out",
                "hover:scale-105 active:scale-95",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
              
              {/* Icon container with background */}
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-primary/10 scale-110" 
                  : "hover:bg-muted/50"
              )}>
                {navSetup[route].icon}
              </div>
              
              {/* Label */}
              <div className={cn(
                "text-xs font-medium transition-all duration-200",
                isActive && "font-semibold"
              )}>
                {navSetup[route].name}
              </div>
            </Link>
          );
        })}
      </nav>
    </BottomNavbarWrapper>
  );
}
