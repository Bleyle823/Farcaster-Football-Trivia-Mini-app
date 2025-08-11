"use client";

import {
  PwaBottomNavbar,
  bottomNavHeight,
} from "@/app/pwa/components/bottom-navbar";
import { PwaSafeArea } from "@/app/pwa/components/safe-area";
import { PwaTopNavbar, topNavHeight } from "@/app/pwa/components/top-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

type AppSettings = {
  darkMode: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  autoAdvance: boolean;
  showHints: boolean;
};

function parseSettings(raw: string): AppSettings | null {
  try {
    const parsed = JSON.parse(raw) as Partial<Record<keyof AppSettings, unknown>>;
    const candidate: AppSettings = {
      darkMode: typeof parsed.darkMode === "boolean" ? parsed.darkMode : false,
      soundEffects:
        typeof parsed.soundEffects === "boolean" ? parsed.soundEffects : true,
      hapticFeedback:
        typeof parsed.hapticFeedback === "boolean" ? parsed.hapticFeedback : true,
      autoAdvance:
        typeof parsed.autoAdvance === "boolean" ? parsed.autoAdvance : false,
      showHints: typeof parsed.showHints === "boolean" ? parsed.showHints : true,
    };
    return candidate;
  } catch {
    return null;
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    soundEffects: true,
    hapticFeedback: true,
    autoAdvance: false,
    showHints: true,
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('football-trivia-settings');
    if (savedSettings) {
      const parsed = parseSettings(savedSettings);
      if (parsed) setSettings(parsed);
    }
    
    // Check system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!savedSettings) {
      setSettings(prev => ({ ...prev, darkMode: prefersDark }));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('football-trivia-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key: keyof AppSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    const statsRaw = localStorage.getItem('football-trivia-stats');
    const settingsRaw = localStorage.getItem('football-trivia-settings');
    
    const exportData = {
      stats: statsRaw ? JSON.parse(statsRaw) as unknown : null,
      settings: settingsRaw ? JSON.parse(settingsRaw) as unknown : null,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'football-trivia-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear ALL data? This will reset your statistics, settings, and cannot be undone.')) {
      localStorage.removeItem('football-trivia-stats');
      localStorage.removeItem('football-trivia-settings');
      
      // Reset to default settings
      setSettings({
        darkMode: false,
        soundEffects: true,
        hapticFeedback: true,
        autoAdvance: false,
        showHints: true,
      });
      
      alert('All data has been cleared successfully.');
    }
  };

  return (
    <PwaSafeArea {...{ topNavHeight, bottomNavHeight }}>
      <PwaTopNavbar />
      <main className="mx-auto flex w-full max-w-global flex-1 flex-col gap-6 p-4">
        {/* Settings Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl">⚙️</div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Customize your football trivia experience
          </p>
        </div>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎨</span>
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <div className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </div>
              </div>
              <Switch 
                id="dark-mode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => updateSetting('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Game Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎮</span>
              Game Experience
            </CardTitle>
            <CardDescription>
              Adjust gameplay preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-effects">Sound Effects</Label>
                <div className="text-sm text-muted-foreground">
                  Play sounds for correct/incorrect answers
                </div>
              </div>
              <Switch 
                id="sound-effects"
                checked={settings.soundEffects}
                onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="haptic-feedback">Haptic Feedback</Label>
                <div className="text-sm text-muted-foreground">
                  Vibrate on touch interactions (mobile)
                </div>
              </div>
              <Switch 
                id="haptic-feedback"
                checked={settings.hapticFeedback}
                onCheckedChange={(checked) => updateSetting('hapticFeedback', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-advance">Auto Advance</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically move to next question after answering
                </div>
              </div>
              <Switch 
                id="auto-advance"
                checked={settings.autoAdvance}
                onCheckedChange={(checked) => updateSetting('autoAdvance', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-hints">Show Hints</Label>
                <div className="text-sm text-muted-foreground">
                  Display helpful hints for difficult questions
                </div>
              </div>
              <Switch 
                id="show-hints"
                checked={settings.showHints}
                onCheckedChange={(checked) => updateSetting('showHints', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💾</span>
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your stored data and statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleExportData}
            >
              <span className="mr-2">📤</span>
              Export My Data
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleClearAllData}
            >
              <span className="mr-2">🗑️</span>
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>ℹ️</span>
              About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform</span>
                <span>PWA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage</span>
                <span>Local Device</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => window.location.href = '/pwa/about'}
              >
                <span className="mr-2">📖</span>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Settings are saved locally on your device</p>
        </div>
      </main>
      <PwaBottomNavbar />
    </PwaSafeArea>
  );
}
