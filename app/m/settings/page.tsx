"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Shield,
  Eye,
  Heart,
  MessageSquare,
  MapPin,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  LogOut,
  Trash2,
  HelpCircle,
  FileText,
} from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      newMatches: true,
      messages: true,
      likes: false,
      events: true,
      marketing: false,
    },
    privacy: {
      showOnline: true,
      showDistance: true,
      showAge: true,
      incognito: false,
    },
    preferences: {
      darkMode: false,
      soundEffects: true,
      vibration: true,
      autoPlay: false,
    },
  })

  const updateSetting = (category: string, key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-4 w-4 text-red-500" />
              <div>
                <Label>New Matches</Label>
                <p className="text-sm text-muted-foreground">Get notified when you have new matches</p>
              </div>
            </div>
            <Switch
              checked={settings?.notifications?.newMatches}
              onCheckedChange={(checked) => updateSetting("notifications", "newMatches", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <div>
                <Label>Messages</Label>
                <p className="text-sm text-muted-foreground">Get notified about new messages</p>
              </div>
            </div>
            <Switch
              checked={settings?.notifications?.messages}
              onCheckedChange={(checked) => updateSetting("notifications", "messages", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-4 w-4 text-pink-500" />
              <div>
                <Label>Likes</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone likes you</p>
              </div>
            </div>
            <Switch
              checked={settings.notifications.likes}
              onCheckedChange={(checked) => updateSetting("notifications", "likes", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Shield className="mr-2 h-5 w-5" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <Label>Show Online Status</Label>
                <p className="text-sm text-muted-foreground">Let others see when you're online</p>
              </div>
            </div>
            <Switch
              checked={settings.privacy.showOnline}
              onCheckedChange={(checked) => updateSetting("privacy", "showOnline", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-orange-500" />
              <div>
                <Label>Show Distance</Label>
                <p className="text-sm text-muted-foreground">Display your distance to other users</p>
              </div>
            </div>
            <Switch
              checked={settings.privacy.showDistance}
              onCheckedChange={(checked) => updateSetting("privacy", "showDistance", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-4 w-4 text-purple-500" />
              <div>
                <Label>Incognito Mode</Label>
                <p className="text-sm text-muted-foreground">Browse profiles without being seen</p>
              </div>
            </div>
            <Switch
              checked={settings.privacy.incognito}
              onCheckedChange={(checked) => updateSetting("privacy", "incognito", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Smartphone className="mr-2 h-5 w-5" />
            App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.preferences.darkMode ? (
                <Moon className="h-4 w-4 text-blue-500" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-500" />
              )}
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme for the app</p>
              </div>
            </div>
            <Switch
              checked={settings.preferences.darkMode}
              onCheckedChange={(checked) => updateSetting("preferences", "darkMode", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="h-4 w-4 text-green-500" />
              <div>
                <Label>Sound Effects</Label>
                <p className="text-sm text-muted-foreground">Play sounds for app interactions</p>
              </div>
            </div>
            <Switch
              checked={settings.preferences.soundEffects}
              onCheckedChange={(checked) => updateSetting("preferences", "soundEffects", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-4 w-4 text-purple-500" />
              <div>
                <Label>Vibration</Label>
                <p className="text-sm text-muted-foreground">Enable haptic feedback</p>
              </div>
            </div>
            <Switch
              checked={settings.preferences.vibration}
              onCheckedChange={(checked) => updateSetting("preferences", "vibration", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Button>

          <Button variant="outline" className="w-full justify-start bg-transparent">
            <FileText className="mr-2 h-4 w-4" />
            Terms & Privacy Policy
          </Button>

          <Separator />

          <Button
            variant="outline"
            className="w-full justify-start text-orange-600 hover:text-orange-700 bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>

          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
