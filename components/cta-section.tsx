"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"
import { SignUpModal } from "@/components/signup-modal"

export function CTASection() {
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
          <h3 className="text-5xl font-bold text-white mb-6">Your Love Story Starts Here</h3>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of people who have found meaningful connections, lasting friendships, and true love through
            Emotions. Your perfect match is waiting for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setShowSignUp(true)}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Join Free Today
              <Heart className="ml-2 w-6 h-6 fill-current" />
            </Button>
            <p className="text-white/80 text-sm">Free to join • No credit card required</p>
          </div>
        </div>
      </div>

      <SignUpModal open={showSignUp} onOpenChange={setShowSignUp} />
    </section>
  )
}
