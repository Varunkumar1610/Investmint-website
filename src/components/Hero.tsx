import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Shield, Brain } from "lucide-react"
import heroImage from "@/assets/hero-image.jpg"
import { useApp } from "@/contexts/AppContext"

const Hero = () => {
  const { dispatch } = useApp()

  const handleStartInvesting = () => {
    const element = document.getElementById('features')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    dispatch({ type: 'SET_STEP', payload: 'budget' })
  }

  const handleLearnMore = () => {
    const element = document.getElementById('learn')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slideUp">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Start Your
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Investment Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover personalized stock recommendations based on your budget and risk profile. 
                Get AI-powered insights and never miss an opportunity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={handleStartInvesting}
              >
                Start Investing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleLearnMore}
              >
                Learn How It Works
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Smart Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Risk Assessment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">AI Alerts</p>
              </div>
            </div>
          </div>

          <div className="relative animate-slideIn">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-3xl blur-3xl animate-glow"></div>
            <Card className="relative p-8 shadow-glow">
              <img 
                src={heroImage} 
                alt="Investment Growth" 
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-soft animate-float">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+15.2% This Month</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero