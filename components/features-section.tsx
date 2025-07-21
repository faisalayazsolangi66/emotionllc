"use client"

import { MessageSquare, Users, Calendar, Search, Shield, Zap } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our advanced algorithm finds compatible partners based on your preferences and interests.",
      color: "text-red-500",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Connect instantly with matches through our secure messaging system.",
      color: "text-pink-500",
    },
    {
      icon: Users,
      title: "Community Groups",
      description: "Join groups based on your interests and meet like-minded people.",
      color: "text-purple-500",
    },
    {
      icon: Calendar,
      title: "Events & Meetups",
      description: "Attend local events and meetups to connect with people in person.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy and safety are our top priorities with verified profiles.",
      color: "text-green-500",
    },
    {
      icon: Zap,
      title: "Instant Connections",
      description: "Get notified immediately when someone likes your profile or sends a message.",
      color: "text-yellow-500",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">Why Choose Emotions?</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide all the tools you need to find meaningful connections and build lasting relationships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-red-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-foreground ml-4">{feature.title}</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
