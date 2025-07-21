"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"
import { SignUpModal } from "@/components/signup-modal"

export function HeroSection() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/images/hero-bg.png)",
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-red-500/20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <Heart className="w-12 h-12 text-red-500 fill-current" />
              <Sparkles className="w-6 h-6 text-white absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-foreground tracking-wider">EMOTIONS</h1>
          </div>
        </div>

        {/* Main Headline */}
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
            Connecting
            <span className="text-red-500 block">Hearts</span>
            <span className="text-2xl md:text-4xl font-normal text-muted-foreground">to their Perfect Match</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find meaningful connections with people who share your interests, values, and dreams
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button
            onClick={() => setShowSignUp(true)}
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105"
          >
            Start Your Journey
            <Heart className="ml-2 w-6 h-6 fill-current" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <SignUpModal open={showSignUp} onOpenChange={setShowSignUp} />
    </section>
  )
}
