"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowRight, ArrowLeft, Check } from "lucide-react"

interface SignUpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignUpModal({ open, onOpenChange }: SignUpModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: "",
    lastName: "",
    email: "",
    language: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    gender: "",
    ethnicity: "",
    interestedIn: "",
    bodyType: "",
    height: "",
    maritalStatus: "",
    lookingFor: "",
    hairColor: "",
    phone: "",

    // Step 2: Lifestyle
    cooking: "",
    cookingForPartner: "",
    drinking: "",
    favoriteColor: "",
    idealFirstDate: "",
    favoriteMovie: "",
    musicGenre: "",
    outdoors: "",
    personalityType: "",
    education: "",
    profession: "",

    // Step 3: Preferences
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

    // Step 4: Interests
    interests: [] as string[],
    username: "",
    password: "",
  })

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value },
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender" className="text-gray-300">
                  Gender
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="interestedIn" className="text-gray-300">
                  Interested In
                </Label>
                <Select
                  value={formData.interestedIn}
                  onValueChange={(value) => handleInputChange("interestedIn", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Lifestyle & Personality</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cooking" className="text-gray-300">
                  Do you like to cook?
                </Label>
                <Select value={formData.cooking} onValueChange={(value) => handleInputChange("cooking", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="drinking" className="text-gray-300">
                  Do you drink alcohol?
                </Label>
                <Select value={formData.drinking} onValueChange={(value) => handleInputChange("drinking", value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                    <SelectItem value="socially">Socially</SelectItem>
                    <SelectItem value="often">Often</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="idealFirstDate" className="text-gray-300">
                Where would you go on your ideal first date?
              </Label>
              <Input
                id="idealFirstDate"
                value={formData.idealFirstDate}
                onChange={(e) => handleInputChange("idealFirstDate", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Describe your ideal first date..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="favoriteMovie" className="text-gray-300">
                  Favorite Movie
                </Label>
                <Input
                  id="favoriteMovie"
                  value={formData.favoriteMovie}
                  onChange={(e) => handleInputChange("favoriteMovie", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="personalityType" className="text-gray-300">
                  Personality Type
                </Label>
                <Select
                  value={formData.personalityType}
                  onValueChange={(value) => handleInputChange("personalityType", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="introvert">Introvert</SelectItem>
                    <SelectItem value="extrovert">Extrovert</SelectItem>
                    <SelectItem value="ambivert">Ambivert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Match Preferences</h3>
            <p className="text-gray-300 text-sm mb-4">
              Rank each preference as Very Important, Somewhat Important, or Not Important
            </p>
            <div className="space-y-3">
              {Object.entries({
                race: "Race/Ethnicity",
                height: "Height",
                smoking: "Smoking Habits",
                drinking: "Drinking Habits",
                bodyType: "Body Type",
                profession: "Profession",
                location: "Location",
                politics: "Political Views",
                religion: "Religion/Spirituality",
                maritalStatus: "Marital Status",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-white">{label}</span>
                  <Select
                    value={formData.preferences[key as keyof typeof formData.preferences]}
                    onValueChange={(value) => handlePreferenceChange(key, value)}
                  >
                    <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
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
        )

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Interests & Community</h3>
            <p className="text-gray-300 text-sm mb-4">
              Select topics you'd like to engage with (you can select multiple)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Immigrant Experiences",
                "Dating & Relationships",
                "Community Meetups",
                "Sports Fans",
                "Book Clubs",
                "Politics & Current Events",
                "Music Enthusiasts",
                "Travel & Culture",
              ].map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.interests.includes(interest)
                      ? "border-red-500 bg-red-500/20 text-white"
                      : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
      if (!res.ok) {
        // Handle error (show toast, etc.)
        console.error("Registration failed")
        return
      }
      // Optionally handle success (show toast, redirect, etc.)
      const data = await res.json()
      console.log("Registration successful:", data)
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting registration:", error)
      // Optionally show error to user
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            Join Emotions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Content */}
          <div className="min-h-[400px]">{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-800">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {step < totalSteps ? (
              <Button onClick={nextStep} className="bg-red-500 hover:bg-red-600 text-white">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Complete Registration
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
