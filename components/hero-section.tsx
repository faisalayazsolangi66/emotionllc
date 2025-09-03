"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Calendar, Users } from "lucide-react"
import { SignUpModal } from "@/components/signup-modal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const slides = [
  {
    id: 1,
    backgroundImage:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Connecting",
    subtitle: "Hearts",
    description: "Find meaningful connections with people who share your interests, values, and dreams",
    icon: Heart,
    cta: "Start Your Journey",
  },
  {
    id: 2,
    backgroundImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    title: "Discover",
    subtitle: "Events",
    description: "Join exciting events, parties, and social gatherings to meet like-minded people",
    icon: Calendar,
    cta: "Explore Events",
  },
  {
    id: 3,
    backgroundImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
    title: "Build",
    subtitle: "Connections",
    description: "Create lasting friendships and relationships through our advanced matching system",
    icon: Users,
    cta: "Find Matches",
  },
]

export function HeroSection() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const plugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Carousel
        plugins={[plugin]}
        className="w-full h-screen"
        opts={{
          align: "start",
          loop: true,
        }}
        onSelect={(embla) => {
          if (embla) {
            setCurrentSlide(embla.selectedScrollSnap())
          }
        }}
      >
        <CarouselContent className="h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative h-screen">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Hearts Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`absolute text-red-500/20 animate-pulse transition-all duration-1000`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.7}s`,
                      fontSize: `${Math.random() * 20 + 15}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-4 max-w-5xl mx-auto">
                  {/* Logo */}
                  <div
                    className={`mb-8 transition-all duration-1000 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="relative">
                        <Heart className="w-14 h-14 text-red-500 fill-current drop-shadow-lg" />
                        <Sparkles className="w-7 h-7 text-white absolute -top-2 -right-2 animate-pulse drop-shadow-lg" />
                      </div>
                      <h1 className="text-5xl font-bold text-white tracking-wider drop-shadow-2xl">EMOTIONS</h1>
                    </div>
                  </div>

                  {/* Main Headline */}
                  <div
                    className={`mb-10 transition-all duration-1000 delay-300 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                      {slide.title}
                      <span className="text-red-500 block animate-pulse">{slide.subtitle}</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                      {slide.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div
                    className={`mb-8 transition-all duration-1000 delay-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <Button
                      onClick={() => setShowSignUp(true)}
                      size="lg"
                      className="bg-red-500 hover:bg-red-600 text-white px-16 py-8 text-2xl font-semibold rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-500 hover:scale-110 transform border-2 border-white/20 backdrop-blur-sm"
                    >
                      {slide.cta}
                      <slide.icon className="ml-3 w-8 h-8 fill-current animate-pulse" />
                    </Button>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex justify-center space-x-3">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${
                          i === currentSlide
                            ? "bg-red-500 scale-125 shadow-lg shadow-red-500/50"
                            : "bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent" />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation */}
        <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm w-14 h-14 transition-all duration-300 hover:scale-110" />
        <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm w-14 h-14 transition-all duration-300 hover:scale-110" />
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      <SignUpModal open={showSignUp} onOpenChange={setShowSignUp} />
    </section>
  )
}
