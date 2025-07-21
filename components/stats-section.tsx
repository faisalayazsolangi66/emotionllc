"use client"

import { useEffect, useState } from "react"
import { Users, Heart, MessageCircle, Calendar } from "lucide-react"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Users, value: "785,634", label: "Active Members", color: "text-red-500" },
    { icon: Heart, value: "45,892", label: "Successful Matches", color: "text-pink-500" },
    { icon: MessageCircle, value: "2.3M", label: "Messages Sent", color: "text-purple-500" },
    { icon: Calendar, value: "12,456", label: "Events Hosted", color: "text-blue-500" },
  ]

  return (
    <section
      id="stats-section"
      className="py-20 bg-gradient-to-r from-red-900/20 to-pink-900/20 dark:from-red-900/20 dark:to-pink-900/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">Join Our Growing Community</h3>
          <p className="text-xl text-muted-foreground">Thousands of people have found love through Emotions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 bg-card/30 backdrop-blur-sm rounded-2xl border border-border hover:border-red-500/50 transition-all duration-500 hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <stat.icon className={`w-12 h-12 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block p-6 bg-red-500/10 border-2 border-red-500 rounded-2xl">
            <p className="text-2xl font-bold text-red-500 mb-2">Ready to join us?</p>
            <p className="text-muted-foreground">Start your journey to find meaningful connections today!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
