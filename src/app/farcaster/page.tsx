import {
  BottomNavbar,
  bottomNavHeight,
} from "@/app/farcaster/components/bottom-navbar";
import { SafeArea } from "@/app/farcaster/components/safe-area";
import { TopNavbar, topNavHeight } from "@/app/farcaster/components/top-navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <SafeArea {...{ topNavHeight, bottomNavHeight }}>
      <TopNavbar />
      <main className="mx-auto flex w-full max-w-global flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <p className="text-muted-foreground">Ready for some football trivia?</p>
        <Link
          href="/farcaster/trivia"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Start Trivia
        </Link>
      </main>
      <BottomNavbar />
    </SafeArea>
  );
}
