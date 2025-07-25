import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Shield, Zap, Star, CheckCircle } from "lucide-react"

const IntegrationSection = () => {
  const platforms = [
    {
      name: "Groww",
      description: "India's fastest growing investment platform",
      features: ["Zero commission equity investing", "Mutual funds", "IPO investments", "SIP automation"],
      rating: 4.6,
      users: "2.5M+",
      logo: "G",
      color: "bg-green-500",
      verified: true
    },
    {
      name: "Upstox",
      description: "Professional trading platform with advanced tools",
      features: ["Low brokerage rates", "Advanced charting", "Options trading", "Margin trading"],
      rating: 4.3,
      users: "1.2M+",
      logo: "U",
      color: "bg-blue-500",
      verified: true
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Secure Integration",
      description: "Bank-grade security with encrypted connections"
    },
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Execute trades directly from our recommendations"
    },
    {
      icon: Star,
      title: "Best Rates",
      description: "Access to preferential pricing and zero hidden fees"
    }
  ]

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Seamless Trading Integration
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with India's leading trading platforms to execute your investment strategy
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            {platforms.map((platform) => (
              <Card key={platform.name} className="shadow-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {platform.logo}
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {platform.name}
                          {platform.verified && (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{platform.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{platform.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {platform.users} users
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {platform.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="invest" className="w-full">
                    <ExternalLink className="w-4 h-4" />
                    Connect to {platform.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Why Integrate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card bg-primary-light border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-primary">Coming Soon</h3>
                <p className="text-sm text-primary mb-4">
                  Auto-invest feature based on AI recommendations with portfolio rebalancing
                </p>
                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Get Notified
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationSection