"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, X, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EditProfilePage() {

    function getTokenFromCookie(name: string) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift() || ""
    return ""
}

  const [profileData, setProfileData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    interestedIn: "",

    // Location
    country: "",
    state: "",
    city: "",
    zipCode: "",

    // Physical
    height: "",
    bodyType: "",
    ethnicity: "",
    hairColor: "",
    eyeColor: "",

    // Lifestyle
    education: "",
    profession: "",
    company: "",
    income: "",
    smoking: "",
    drinking: "",
    drugs: "",

    // Relationship
    relationshipStatus: "",
    lookingFor: "",
    hasChildren: "",
    wantsChildren: "",

    // Personality & Interests
    bio: "",
    interests: [],
    languages: [],

    // Preferences
    religion: "",
    politics: "",
    personalityType: "",

    // Dating Preferences
    ageRangeMin: 18,
    ageRangeMax: 35,
    maxDistance: 25,
    dealBreakers: [],
    preferences: {
      race: "not-important",
      height: "not-important",
      smoking: "not-important",
      drinking: "not-important",
      bodyType: "not-important",
      profession: "not-important",
      location: "not-important",
      politics: "not-important",
      religion: "not-important",
      maritalStatus: "not-important",
    },
  })
  const [photos, setPhotos] = useState<string[]>([])
  const [photoFiles, setPhotoFiles] = useState<(File | null)[]>([null, null, null, null, null, null])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const token = getTokenFromCookie("token")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        console.log(data,"------------------data");
        if (res.ok && data.status && data.data) {
          const u = data.data
          setProfileData({
            firstName: u.first_name || "",
            lastName: u.last_name || "",
            email: u.email || "",
            phone: u.phone || "",
            dateOfBirth: u.birthdate ? u.birthdate.split("T")[0] : "",
            gender: u.gender || "male",
            interestedIn: u.interested_in || "female",
            country: u.country || "USA",
            state: u.state || "California",
            city: u.city || "Los Angeles",
            zipCode: u.zip_code || "90001",
            height: u.height || "180cm",
            bodyType: u.body_type || "athletic",
            ethnicity: u.ethnicity || "Hispanic",
            hairColor: u.hair_color || "black",
            eyeColor: u.eye_color || "brown",
            education: u.education || "bachelor",
            profession: u.profession || "developer",
            company: u.company || "Tech Corp",
            income: u.income || "75000-100000",
            smoking: u.smoking || "never",
            drinking: u.drinking || "socially",
            drugs: u.drugs || "never",
            relationshipStatus: u.marital_status || "single",
            lookingFor: u.looking_for || "friendship",
            hasChildren: u.has_children || "no",
            wantsChildren: u.wants_children || "someday",
            bio: u.bio || "Adventure seeker, coffee enthusiast, and book lover.",
            interests: u.interests || ["traveling", "music", "coding"],
            languages: u.language ? [u.language] : ["english"],
            religion: u.religion || "not-religious",
            politics: u.politics || "moderate",
            personalityType: u.personality_type || "extrovert",
            ageRangeMin: 25,
            ageRangeMax: 35,
            maxDistance: 25,
            dealBreakers: [],
            preferences:
              u.preferences || {
                race: "not-important",
                height: "not-important",
                smoking: "not-important",
                drinking: "not-important",
                bodyType: "not-important",
                profession: "not-important",
                location: "not-important",
                politics: "not-important",
                religion: "not-important",
                maritalStatus: "not-important",
              },
          })
          setPhotos(u.photo_url ? [u.photo_url] : [])
        }
      } catch {
        toast({ title: "Error", description: "Failed to load profile.", variant: "destructive" })
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

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

  // Handle photo file selection
  const handlePhotoChange = (index: number, file: File | null) => {
    setPhotoFiles((prev) => {
      const arr = [...prev]
      arr[index] = file
      return arr
    })
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotos((prev) => {
          const arr = [...prev]
          arr[index] = e.target?.result as string
          return arr
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload photos and get URLs
  const uploadPhotos = async () => {
   const token = getTokenFromCookie("token")

    const uploadedUrls: string[] = []
    for (let i = 0; i < photoFiles.length; i++) {
      const file = photoFiles[i]
      if (file) {
        const formData = new FormData()
        formData.append("image", file)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}image-upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
        const data = await res.json()
        if (res.ok && data.status && data.image) {
          uploadedUrls[i] = data.image
        } else {
          uploadedUrls[i] = photos[i] || ""
        }
      } else {
        uploadedUrls[i] = photos[i] || ""
      }
    }
    return uploadedUrls.filter(Boolean)
  }

  // Save profile handler
  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      const imageUrls = await uploadPhotos()
      const token = getTokenFromCookie("token")

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...profileData,
          images: imageUrls,
        }),
      })
      const data = await res.json()
      if (res.ok && data.status) {
        toast({ title: "Profile updated", description: "Your profile has been updated.", variant: "success" })
      } else {
        toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" })
    }
    setLoading(false)
  }

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

  // Handler for updating a single preference
  const handlePreferenceChange = (key: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }))
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
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photos[index] || "/placeholder.svg"}
                          alt={`Profile photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setPhotos((prev) => {
                                const arr = [...prev]
                                arr[index] = ""
                                return arr
                              })
                              setPhotoFiles((prev) => {
                                const arr = [...prev]
                                arr[index] = null
                                return arr
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {index === 0 && photos[index] && <Badge className="absolute top-2 left-2 bg-red-500">Main</Badge>}
                      </div>
                    ))}
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
                  <div>
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
                        <Select
                          value={profileData.preferences[key]}
                          onValueChange={(value) => handlePreferenceChange(key, value)}
                        >
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
            <Button
              size="lg"
              className="bg-red-500 hover:bg-red-600"
              onClick={handleSaveProfile}
              disabled={loading}
            >
              {loading ? "Saving..." : <><Save className="h-4 w-4 mr-2" />Save All Changes</>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
