"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, X, Save } from "lucide-react"

export default function EditProfilePage() {
  const [profileData, setProfileData] = useState({
    // Basic Info
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-03-15",
    gender: "male",
    interestedIn: "female",

    // Location
    country: "United States",
    state: "New York",
    city: "New York",
    zipCode: "10001",

    // Physical
    height: "5'10\"",
    bodyType: "athletic",
    ethnicity: "mixed",
    hairColor: "brown",
    eyeColor: "brown",

    // Lifestyle
    education: "masters",
    profession: "Software Engineer",
    company: "Tech Corp",
    income: "75000-100000",
    smoking: "never",
    drinking: "socially",
    drugs: "never",

    // Relationship
    relationshipStatus: "single",
    lookingFor: "long-term",
    hasChildren: "no",
    wantsChildren: "someday",

    // Personality & Interests
    bio: "Adventure seeker, coffee enthusiast, and book lover. Looking for someone to explore the city with and share meaningful conversations.",
    interests: ["travel", "photography", "hiking", "cooking", "music", "art"],
    languages: ["english", "spanish"],

    // Preferences
    religion: "not-religious",
    politics: "moderate",
    personalityType: "extrovert",

    // Dating Preferences
    ageRangeMin: 25,
    ageRangeMax: 35,
    maxDistance: 25,
    dealBreakers: [],
  })

  const [photos, setPhotos] = useState([
    "/placeholder.svg?height=300&width=200&text=Photo+1",
    "/placeholder.svg?height=300&width=200&text=Photo+2",
    "/placeholder.svg?height=300&width=200&text=Photo+3",
  ])

  const availableInterests = [
    "Travel",
    "Photography",
    "Hiking",
    "Cooking",
    "Music",
    "Art",
    "Fitness",
    "Reading",
    "Movies",
    "Gaming",
    "Dancing",
    "Yoga",
    "Sports",
    "Technology",
    "Fashion",
    "Food",
    "Wine",
    "Coffee",
    "Pets",
    "Nature",
    "Beach",
    "Mountains",
    "City Life",
    "Concerts",
  ]

  const handleInputChange = (field: string, value: string | number) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (interest: string) => {
    const interestLower = interest.toLowerCase()
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestLower)
        ? prev.interests.filter((i) => i !== interestLower)
        : [...prev.interests, interestLower],
    }))
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const addPhoto = () => {
    // In a real app, this would open a file picker
    setPhotos((prev) => [...prev, `/placeholder.svg?height=300&width=200&text=Photo+${prev.length + 1}`])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="text-muted-foreground">Update your information to attract better matches</p>
            </div>
            <Button className="bg-red-500 hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={profileData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="interestedIn">Interested In</Label>
                      <Select
                        value={profileData.interestedIn}
                        onValueChange={(value) => handleInputChange("interestedIn", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Men</SelectItem>
                          <SelectItem value="female">Women</SelectItem>
                          <SelectItem value="everyone">Everyone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      placeholder="Tell people about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={profileData.country}
                        onValueChange={(value) => handleInputChange("country", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={profileData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photos</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add up to 6 photos. Your first photo will be your main profile picture.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Profile photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button variant="destructive" size="sm" onClick={() => removePhoto(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {index === 0 && <Badge className="absolute top-2 left-2 bg-red-500">Main</Badge>}
                      </div>
                    ))}
                    {photos.length < 6 && (
                      <button
                        onClick={addPhoto}
                        className="w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center hover:border-muted-foreground/50 transition-colors"
                      >
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Photo</span>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lifestyle" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Physical Attributes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={profileData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        placeholder={"e.g., 5'10\""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bodyType">Body Type</Label>
                      <Select
                        value={profileData.bodyType}
                        onValueChange={(value) => handleInputChange("bodyType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slim">Slim</SelectItem>
                          <SelectItem value="athletic">Athletic</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="curvy">Curvy</SelectItem>
                          <SelectItem value="heavyset">Heavyset</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="ethnicity">Ethnicity</Label>
                      <Select
                        value={profileData.ethnicity}
                        onValueChange={(value) => handleInputChange("ethnicity", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asian">Asian</SelectItem>
                          <SelectItem value="black">Black/African</SelectItem>
                          <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                          <SelectItem value="white">White/Caucasian</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Career & Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="education">Education Level</Label>
                      <Select
                        value={profileData.education}
                        onValueChange={(value) => handleInputChange("education", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="some-college">Some College</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="profession">Profession</Label>
                      <Input
                        id="profession"
                        value={profileData.profession}
                        onChange={(e) => handleInputChange("profession", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lifestyle Habits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="smoking">Smoking</Label>
                      <Select
                        value={profileData.smoking}
                        onValueChange={(value) => handleInputChange("smoking", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="occasionally">Occasionally</SelectItem>
                          <SelectItem value="regularly">Regularly</SelectItem>
                          <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="drinking">Drinking</Label>
                      <Select
                        value={profileData.drinking}
                        onValueChange={(value) => handleInputChange("drinking", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="occasionally">Occasionally</SelectItem>
                          <SelectItem value="socially">Socially</SelectItem>
                          <SelectItem value="regularly">Regularly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="drugs">Drugs</Label>
                      <Select value={profileData.drugs} onValueChange={(value) => handleInputChange("drugs", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="occasionally">Occasionally</SelectItem>
                          <SelectItem value="regularly">Regularly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relationship Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="relationshipStatus">Current Status</Label>
                      <Select
                        value={profileData.relationshipStatus}
                        onValueChange={(value) => handleInputChange("relationshipStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                          <SelectItem value="separated">Separated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lookingFor">Looking For</Label>
                      <Select
                        value={profileData.lookingFor}
                        onValueChange={(value) => handleInputChange("lookingFor", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="friendship">Friendship</SelectItem>
                          <SelectItem value="casual">Casual Dating</SelectItem>
                          <SelectItem value="long-term">Long-term Relationship</SelectItem>
                          <SelectItem value="marriage">Marriage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hasChildren">Do you have children?</Label>
                      <Select
                        value={profileData.hasChildren}
                        onValueChange={(value) => handleInputChange("hasChildren", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="yes-living-with-me">Yes, living with me</SelectItem>
                          <SelectItem value="yes-not-living-with-me">Yes, not living with me</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="wantsChildren">Want children?</Label>
                      <Select
                        value={profileData.wantsChildren}
                        onValueChange={(value) => handleInputChange("wantsChildren", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="someday">Someday</SelectItem>
                          <SelectItem value="unsure">Unsure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personality & Beliefs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="personalityType">Personality</Label>
                      <Select
                        value={profileData.personalityType}
                        onValueChange={(value) => handleInputChange("personalityType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="introvert">Introvert</SelectItem>
                          <SelectItem value="extrovert">Extrovert</SelectItem>
                          <SelectItem value="ambivert">Ambivert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="religion">Religion</Label>
                      <Select
                        value={profileData.religion}
                        onValueChange={(value) => handleInputChange("religion", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="christian">Christian</SelectItem>
                          <SelectItem value="muslim">Muslim</SelectItem>
                          <SelectItem value="jewish">Jewish</SelectItem>
                          <SelectItem value="hindu">Hindu</SelectItem>
                          <SelectItem value="buddhist">Buddhist</SelectItem>
                          <SelectItem value="spiritual">Spiritual</SelectItem>
                          <SelectItem value="not-religious">Not Religious</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="politics">Political Views</Label>
                      <Select
                        value={profileData.politics}
                        onValueChange={(value) => handleInputChange("politics", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="liberal">Liberal</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="not-political">Not Political</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dating Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>
                      Age Range: {profileData.ageRangeMin} - {profileData.ageRangeMax}
                    </Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <Input
                        type="number"
                        value={profileData.ageRangeMin}
                        onChange={(e) => handleInputChange("ageRangeMin", Number.parseInt(e.target.value))}
                        className="w-20"
                        min="18"
                        max="100"
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        value={profileData.ageRangeMax}
                        onChange={(e) => handleInputChange("ageRangeMax", Number.parseInt(e.target.value))}
                        className="w-20"
                        min="18"
                        max="100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Maximum Distance: {profileData.maxDistance} miles</Label>
                    <Input
                      type="range"
                      min="1"
                      max="100"
                      value={profileData.maxDistance}
                      onChange={(e) => handleInputChange("maxDistance", Number.parseInt(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interests" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interests & Hobbies</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select interests that represent you. This helps us find better matches.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          profileData.interests.includes(interest.toLowerCase())
                            ? "border-red-500 bg-red-500/10 text-red-600"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Label>Selected Interests ({profileData.interests.length})</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="capitalize">
                          {interest}
                          <button onClick={() => toggleInterest(interest)} className="ml-2 hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <Button size="lg" className="bg-red-500 hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
