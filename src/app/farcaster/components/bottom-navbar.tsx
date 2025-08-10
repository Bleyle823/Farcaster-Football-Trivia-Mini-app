"use client";

import { BottomNavbarWrapper } from "@/app/farcaster/components/bottom-navbar-wrapper";
import { cn } from "@/lib/utils";
import { CircleUser, CogIcon, HomeIcon, InfoIcon, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navRoutes = [
  "/farcaster",
  "/farcaster/trivia",
  "/farcaster/about",
  "/farcaster/profile",
  "/farcaster/settings",
] as const;

type NavRoutes = (typeof navRoutes)[number];

const navSetup: Record<
  NavRoutes,
  {
    name: string;
    isActive: string[];
    icon: React.ReactNode;
  }
> = {
  "/farcaster": {
    name: "Home",
    isActive: ["/farcaster"],
    icon: <HomeIcon className="size-6" />,
  },
  "/farcaster/trivia": {
    name: "Trivia",
    isActive: ["/farcaster/trivia"],
    icon: <Trophy className="size-6" />,
  },
  "/farcaster/about": {
    name: "About",
    isActive: ["/farcaster/about"],
    icon: <InfoIcon className="size-6" />,
  },
  "/farcaster/profile": {
    name: "Profile",
    isActive: ["/farcaster/profile"],
    icon: <CircleUser className="size-6" />,
  },
  "/farcaster/settings": {
    name: "Settings",
    isActive: ["/farcaster/settings"],
    icon: <CogIcon className="size-6" />,
  },
} as const;

export const bottomNavHeight = "calc(4rem + 1px)";

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <BottomNavbarWrapper>
      <nav className="max-w-global flex h-full w-full items-center justify-evenly">
        {navRoutes.map((route, index) => {
          const activeRoutes = navSetup[route].isActive;

          const isActive = activeRoutes.includes(pathname);

          return (
            <Link
              key={`bottom-navbar-link-${route}-${index}`}
              href={route}
              className="flex h-full flex-1 items-center justify-center px-1"
            >
              <div
                className={cn(
                  "group flex w-full max-w-[110px] flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60",
                )}
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {navSetup[route].icon}
                </span>
                <div className="text-[11px] leading-none">
                  {navSetup[route].name}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </BottomNavbarWrapper>
  );
}
