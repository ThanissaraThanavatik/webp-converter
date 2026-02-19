import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Zap, Shield, Palette, Code } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized for performance with minimal bundle size and blazing fast load times.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Built with security best practices to protect your application and users.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description:
      "Easily customize every component to match your brand and design system.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description:
      "Clean, well-documented code with TypeScript support out of the box.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features to help you build modern web applications with ease.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 transition-colors hover:border-primary/50"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
