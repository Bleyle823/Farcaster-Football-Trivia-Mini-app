"use client";

import {
  PwaBottomNavbar,
  bottomNavHeight,
} from "@/app/pwa/components/bottom-navbar";
import { PwaSafeArea } from "@/app/pwa/components/safe-area";
import { PwaTopNavbar, topNavHeight } from "@/app/pwa/components/top-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

type ProfileStats = {
  gamesPlayed: number;
  totalQuestions: number;
  correctAnswers: number;
  bestScore: number;
  averageScore: number;
};

function parseProfileStats(raw: string): ProfileStats | null {
  try {
    const parsed = JSON.parse(raw) as Partial<Record<keyof ProfileStats, unknown>>;
    const candidate: ProfileStats = {
      gamesPlayed: typeof parsed.gamesPlayed === "number" ? parsed.gamesPlayed : 0,
      totalQuestions:
        typeof parsed.totalQuestions === "number" ? parsed.totalQuestions : 0,
      correctAnswers:
        typeof parsed.correctAnswers === "number" ? parsed.correctAnswers : 0,
      bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : 0,
      averageScore:
        typeof parsed.averageScore === "number" ? parsed.averageScore : 0,
    };
    return candidate;
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const [stats, setStats] = useState<ProfileStats>({
    gamesPlayed: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    bestScore: 0,
    averageScore: 0,
  });

  // Load stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem("football-trivia-stats");
    if (savedStats) {
      const parsed = parseProfileStats(savedStats);
      if (parsed) setStats(parsed);
    }
  }, []);

  const accuracy = stats.totalQuestions > 0 ? (stats.correctAnswers / stats.totalQuestions) * 100 : 0;

  const achievements = [
    {
      id: 'first-game',
      title: 'First Steps',
      description: 'Played your first game',
      emoji: '👶',
      unlocked: stats.gamesPlayed >= 1,
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Got all questions right in a game',
      emoji: '🏆',
      unlocked: stats.bestScore === 5,
    },
    {
      id: 'dedicated-player',
      title: 'Dedicated Player',
      description: 'Played 10 games',
      emoji: '🎯',
      unlocked: stats.gamesPlayed >= 10,
    },
    {
      id: 'knowledge-master',
      title: 'Knowledge Master',
      description: '80% accuracy overall',
      emoji: '🧠',
      unlocked: accuracy >= 80,
    },
  ];

  const handleResetStats = () => {
    if (confirm('Are you sure you want to reset all your statistics? This action cannot be undone.')) {
      localStorage.removeItem('football-trivia-stats');
      setStats({
        gamesPlayed: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        bestScore: 0,
        averageScore: 0,
      });
    }
  };

  return (
    <PwaSafeArea {...{ topNavHeight, bottomNavHeight }}>
      <PwaTopNavbar />
      <main className="mx-auto flex w-full max-w-global flex-1 flex-col gap-6 p-4">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl">👤</div>
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">
            Track your football trivia progress and achievements
          </p>
        </div>

        {/* Stats Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📊</span>
              Statistics
            </CardTitle>
            <CardDescription>
              Your performance across all games
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.gamesPlayed}</div>
                <div className="text-sm text-muted-foreground">Games Played</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.bestScore}/5</div>
                <div className="text-sm text-muted-foreground">Best Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{stats.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{accuracy.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            {/* Accuracy Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Accuracy</span>
                <span>{accuracy.toFixed(1)}%</span>
              </div>
              <Progress value={accuracy} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🏅</span>
              Achievements
            </CardTitle>
            <CardDescription>
              Unlock badges by reaching milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? 'border-primary/20 bg-primary/5' 
                      : 'border-muted bg-muted/30'
                  }`}
                >
                  <div className={`text-2xl ${!achievement.unlocked && 'grayscale opacity-50'}`}>
                    {achievement.emoji}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${!achievement.unlocked && 'text-muted-foreground'}`}>
                      {achievement.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {achievement.description}
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="default" className="mt-1 text-xs">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>⚡</span>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/pwa'}
            >
              <span className="mr-2">🎮</span>
              Play Trivia
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleResetStats}
            >
              <span className="mr-2">🔄</span>
              Reset Statistics
            </Button>
          </CardContent>
        </Card>

        {/* Note about local storage */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Statistics are stored locally on your device</p>
        </div>
    </main>
      <PwaBottomNavbar />
    </PwaSafeArea>
  );
}
