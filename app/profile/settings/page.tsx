"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Eye, Heart, Smartphone, Mail, Lock, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {

  function getTokenFromCookie(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
    return ""
}

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: true,
    events: false,
    marketing: false,
    pushNotifications: true,
    emailNotifications: true,
  })

  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showDistance: true,
    showAge: true,
    profileVisibility: "everyone",
    allowMessages: "matches",
  })

  const [discovery, setDiscovery] = useState({
    maxDistance: [25],
    ageRange: [22, 35],
    showMe: "everyone",
    globalMode: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const initialized = useRef(false)

  // Fetch settings on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const fetchSettings = async () => {
      setLoading(true)
      setError(null)
      try {
const token = getTokenFromCookie("token")
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}settings`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        if (!res.ok) throw new Error("Failed to fetch settings")
        const data = await res.json()
        setNotifications(data.notifications)
        setPrivacy(data.privacy)
        setDiscovery(data.discovery)
      } catch (err: any) {
        setError("Could not load settings.")
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  // Save settings handler
  const handleSave = async () => {
    setLoading(true)
    setError(null)
    try {
    const token = getTokenFromCookie("token")
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}settings`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notifications,
            privacy,
            discovery,
          }),
        }
      )
      if (!res.ok) throw new Error("Failed to save settings")
      toast({
        title: "Settings saved",
        description: "Your settings have been updated.",
        variant: "success",
      })
    } catch (err: any) {
      setError("Could not save settings.")
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account preferences and privacy settings
            </p>
          </div>

          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="discovery">Discovery</TabsTrigger>
              {/* <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger> */}
            </TabsList>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="new-matches">New Matches</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone likes you back
                        </p>
                      </div>
                      <Switch
                        id="new-matches"
                        checked={notifications?.newMatches}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, newMatches: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="messages">New Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when you receive a message
                        </p>
                      </div>
                      <Switch
                        id="messages"
                        checked={notifications?.messages}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, messages: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="likes">Likes</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone likes your profile
                        </p>
                      </div>
                      <Switch
                        id="likes"
                        checked={notifications?.likes}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, likes: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="events">Events</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about upcoming events
                        </p>
                      </div>
                      <Switch
                        id="events"
                        checked={notifications?.events}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, events: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketing">Marketing</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive tips and promotional content
                        </p>
                      </div>
                      <Switch
                        id="marketing"
                        checked={notifications?.marketing}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, marketing: checked })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Delivery Methods</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Label htmlFor="push">Push Notifications</Label>
                      </div>
                      <Switch
                        id="push"
                        checked={notifications?.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Label htmlFor="email">Email Notifications</Label>
                      </div>
                      <Switch
                        id="email"
                        checked={notifications?.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-online">Show Online Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Let others see when you're online
                        </p>
                      </div>
                      <Switch
                        id="show-online"
                        checked={privacy?.showOnline}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, showOnline: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-distance">Show Distance</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your distance to other users
                        </p>
                      </div>
                      <Switch
                        id="show-distance"
                        checked={privacy?.showDistance}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, showDistance: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-age">Show Age</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your age on your profile
                        </p>
                      </div>
                      <Switch
                        id="show-age"
                        checked={privacy?.showAge}
                        onCheckedChange={(checked) =>
                          setPrivacy({ ...privacy, showAge: checked })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Who can see your profile
                      </p>
                      <Select
                        value={privacy?.profileVisibility}
                        onValueChange={(value) =>
                          setPrivacy({ ...privacy, profileVisibility: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="matches">Matches Only</SelectItem>
                          <SelectItem value="hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="allow-messages">Who Can Message You</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Control who can send you messages
                      </p>
                      <Select
                        value={privacy?.allowMessages}
                        onValueChange={(value) =>
                          setPrivacy({ ...privacy, allowMessages: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="matches">Matches Only</SelectItem>
                          <SelectItem value="none">No One</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discovery" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Discovery Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>
                      Maximum Distance: {discovery?.maxDistance?.[0]} miles
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      How far away can potential matches be
                    </p>
                    <Slider
                      value={discovery?.maxDistance}
                      onValueChange={(value) =>
                        setDiscovery({ ...discovery, maxDistance: value })
                      }
                      max={100}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>
                      Age Range: {discovery?.ageRange?.[0]} - {discovery?.ageRange?.[1]}
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Age range for potential matches
                    </p>
                    <Slider
                      value={discovery?.ageRange}
                      onValueChange={(value) =>
                        setDiscovery({ ...discovery, ageRange: value })
                      }
                      max={65}
                      min={18}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="show-me">Show Me</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Who you want to see
                    </p>
                    <Select
                      value={discovery?.showMe}
                      onValueChange={(value) =>
                        setDiscovery({ ...discovery, showMe: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="everyone">Everyone</SelectItem>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="global-mode">Global Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        See people from around the world
                      </p>
                    </div>
                    <Switch
                      id="global-mode"
                      checked={discovery?.globalMode}
                      onCheckedChange={(checked) =>
                        setDiscovery({ ...discovery, globalMode: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="alex.johnson@example.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-destructive">Danger Zone</h3>

                    <div className="p-4 border border-destructive/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Matching Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Rank each preference as Very Important, Somewhat Important, or
                    Not Important
                  </p>

                  <div className="space-y-4">
                    {[
                      { key: "race", label: "Race/Ethnicity" },
                      { key: "height", label: "Height" },
                      { key: "smoking", label: "Smoking Habits" },
                      { key: "drinking", label: "Drinking Habits" },
                      { key: "bodyType", label: "Body Type" },
                      { key: "profession", label: "Profession" },
                      { key: "location", label: "Location" },
                      { key: "politics", label: "Political Views" },
                      { key: "religion", label: "Religion/Spirituality" },
                      { key: "maritalStatus", label: "Marital Status" },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <span className="font-medium">{label}</span>
                        <Select defaultValue="not-important">
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="very-important">Very Important</SelectItem>
                            <SelectItem value="somewhat-important">Somewhat Important</SelectItem>
                            <SelectItem value="not-important">Not Important</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Optionally show loading/error */}
          {loading && (
            <div className="mb-4 text-center text-muted-foreground">Loading...</div>
          )}
          {error && (
            <div className="mb-4 text-center text-destructive">{error}</div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
