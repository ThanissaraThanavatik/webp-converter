import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    avatar: "/avatars/sarah.jpg",
    content:
      "This component library has completely transformed how we build our products. The components are beautiful and incredibly easy to customize.",
  },
  {
    name: "Michael Chen",
    role: "Product Designer",
    company: "DesignStudio",
    avatar: "/avatars/michael.jpg",
    content:
      "The attention to detail in every component is remarkable. It's saved us countless hours of design and development time.",
  },
  {
    name: "Emily Davis",
    role: "Full Stack Developer",
    company: "StartupXYZ",
    avatar: "/avatars/emily.jpg",
    content:
      "I've tried many UI libraries, but this one stands out. The TypeScript support and documentation are excellent.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Developers
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about their experience.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
