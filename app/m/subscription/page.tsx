"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, Heart, Eye, Zap, Star, MessageSquare, Shield } from "lucide-react"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    period: "",
    features: ["5 likes per day", "Limited matches", "Basic filters", "Standard support"],
    current: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99",
    period: "/month",
    popular: true,
    features: [
      "Unlimited likes",
      "See who liked you",
      "Advanced filters",
      "Read receipts",
      "Boost your profile",
      "Priority support",
    ],
    current: false,
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "$29.99",
    period: "/month",
    features: [
      "Everything in Premium",
      "Message before matching",
      "Priority in search results",
      "Exclusive events access",
      "Personal dating coach",
      "VIP support",
    ],
    current: false,
  },
]

const premiumFeatures = [
  {
    icon: Heart,
    title: "Unlimited Likes",
    description: "Like as many profiles as you want without daily limits",
    color: "text-red-500",
  },
  {
    icon: Eye,
    title: "See Who Liked You",
    description: "View all the people who have already liked your profile",
    color: "text-blue-500",
  },
  {
    icon: Zap,
    title: "Profile Boost",
    description: "Get 10x more profile views with weekly boosts",
    color: "text-yellow-500",
  },
  {
    icon: MessageSquare,
    title: "Read Receipts",
    description: "Know when your messages have been read",
    color: "text-green-500",
  },
  {
    icon: Shield,
    title: "Advanced Privacy",
    description: "Control who can see your profile and when",
    color: "text-purple-500",
  },
  {
    icon: Star,
    title: "Priority Support",
    description: "Get faster help from our customer support team",
    color: "text-orange-500",
  },
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("premium")

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="text-center space-y-2 mb-6">
        <div className="flex items-center justify-center space-x-2">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">Upgrade to Premium</h1>
        </div>
        <p className="text-muted-foreground">Get more matches and find your perfect connection faster</p>
      </div>

      {/* Premium Features */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {premiumFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="p-3">
              <CardContent className="p-0 text-center space-y-2">
                <Icon className={`h-6 w-6 mx-auto ${feature.color}`} />
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pricing Plans */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-center">Choose Your Plan</h2>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`cursor-pointer transition-all ${
              selectedPlan === plan.id ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
            } ${plan.current ? "opacity-60" : ""}`}
            onClick={() => !plan.current && setSelectedPlan(plan.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  {plan.popular && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">Most Popular</Badge>
                  )}
                  {plan.current && <Badge variant="secondary">Current Plan</Badge>}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Stats */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 text-center">Premium Members Get:</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-pink-600">3x</p>
              <p className="text-xs text-muted-foreground">More Matches</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">5x</p>
              <p className="text-xs text-muted-foreground">More Messages</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">10x</p>
              <p className="text-xs text-muted-foreground">More Views</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        {selectedPlan !== "basic" && (
          <Button
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            size="lg"
          >
            <Crown className="mr-2 h-5 w-5" />
            Upgrade to {plans.find((p) => p.id === selectedPlan)?.name}
          </Button>
        )}

        <Button variant="outline" className="w-full bg-transparent">
          Restore Purchases
        </Button>
      </div>

      {/* Terms */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Subscription automatically renews unless cancelled</p>
        <p>Cancel anytime in your account settings</p>
        <div className="flex justify-center space-x-4 mt-2">
          <button className="underline">Terms of Service</button>
          <button className="underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  )
}
