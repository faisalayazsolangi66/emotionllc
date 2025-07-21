"use client"

import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah & Michael",
      image: "/placeholder.svg?height=80&width=80",
      text: "We met on Emotions 2 years ago and got married last month! The platform helped us find our perfect match.",
      rating: 5,
    },
    {
      name: "Jessica",
      image: "/placeholder.svg?height=80&width=80",
      text: "I love the community aspect. I've made so many friends through the groups and events feature.",
      rating: 5,
    },
    {
      name: "David & Maria",
      image: "/placeholder.svg?height=80&width=80",
      text: "The matching algorithm is incredible. We had so much in common from day one!",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">Success Stories</h3>
          <p className="text-xl text-muted-foreground">Real people, real connections, real love</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/40 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-red-500/50 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed">{testimonial.text}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-foreground font-semibold">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
