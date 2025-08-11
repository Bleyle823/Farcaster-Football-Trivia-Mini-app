import {
  PwaBottomNavbar,
  bottomNavHeight,
} from "@/app/pwa/components/bottom-navbar";
import { PwaSafeArea } from "@/app/pwa/components/safe-area";
import { PwaTopNavbar, topNavHeight } from "@/app/pwa/components/top-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <PwaSafeArea {...{ topNavHeight, bottomNavHeight }}>
      <PwaTopNavbar />
      <main className="mx-auto flex w-full max-w-global flex-1 flex-col gap-6 p-4">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="text-6xl">⚽</div>
          <h1 className="text-3xl font-bold">Football Trivia App</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your football knowledge with our interactive trivia game featuring questions about FIFA World Cups, legendary players, famous clubs, and football history.
          </p>
        </div>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎮</span>
              Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <h3 className="font-semibold">Competitive Scoring</h3>
                  <p className="text-sm text-muted-foreground">Track your progress and aim for the perfect score</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold">Mobile Optimized</h3>
                  <p className="text-sm text-muted-foreground">Seamless experience on all devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌍</div>
                <div>
                  <h3 className="font-semibold">Global Football</h3>
                  <p className="text-sm text-muted-foreground">Questions covering international football</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold">Instant Feedback</h3>
                  <p className="text-sm text-muted-foreground">Immediate answers with visual feedback</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📚</span>
              Question Categories
            </CardTitle>
            <CardDescription>
              Our trivia covers a wide range of football topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">FIFA World Cup</Badge>
              <Badge variant="secondary">Ballon d&apos;Or Winners</Badge>
              <Badge variant="secondary">UEFA Champions League</Badge>
              <Badge variant="secondary">Legendary Players</Badge>
              <Badge variant="secondary">Football History</Badge>
              <Badge variant="secondary">Club Records</Badge>
              <Badge variant="secondary">International Teams</Badge>
              <Badge variant="secondary">Player Nicknames</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🛠️</span>
              Built With
            </CardTitle>
            <CardDescription>
              Modern web technologies for the best experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">⚛️</div>
                <div className="font-semibold">Next.js 15</div>
                <div className="text-xs text-muted-foreground">React Framework</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-semibold">Tailwind CSS</div>
                <div className="text-xs text-muted-foreground">Styling</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <div className="text-2xl mb-2">📱</div>
                <div className="font-semibold">PWA Ready</div>
                <div className="text-xs text-muted-foreground">Progressive Web App</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Version Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Football Trivia App v1.0.0</p>
          <p>Made with ❤️ for football fans worldwide</p>
        </div>
      </main>
      <PwaBottomNavbar />
    </PwaSafeArea>
  );
}
