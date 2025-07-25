import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import { toast } from "@/hooks/use-toast"

const RiskAssessment = () => {
  const { state, dispatch } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(state.userProfile.completedAssessment)

  const questions = [
    {
      question: "What is your investment experience?",
      options: [
        { text: "I'm completely new to investing", score: 1 },
        { text: "I have some basic knowledge", score: 2 },
        { text: "I'm moderately experienced", score: 3 },
        { text: "I'm an experienced investor", score: 4 },
      ]
    },
    {
      question: "How would you react if your investment lost 20% in a month?",
      options: [
        { text: "I'd panic and sell immediately", score: 1 },
        { text: "I'd be very concerned but hold", score: 2 },
        { text: "I'd be worried but stay invested", score: 3 },
        { text: "I'd see it as a buying opportunity", score: 4 },
      ]
    },
    {
      question: "What's your investment timeline?",
      options: [
        { text: "Less than 1 year", score: 1 },
        { text: "1-3 years", score: 2 },
        { text: "3-7 years", score: 3 },
        { text: "More than 7 years", score: 4 },
      ]
    },
    {
      question: "What percentage of your savings are you investing?",
      options: [
        { text: "More than 80%", score: 1 },
        { text: "50-80%", score: 2 },
        { text: "20-50%", score: 3 },
        { text: "Less than 20%", score: 4 },
      ]
    }
  ]

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalScore = newAnswers.reduce((sum, s) => sum + s, 0)
      const riskProfile = totalScore <= 8 ? 'Conservative' : totalScore <= 12 ? 'Moderate' : 'Aggressive'
      
      dispatch({ 
        type: 'SET_RISK_PROFILE', 
        payload: { riskProfile, riskScore: totalScore } 
      })
      
      dispatch({ type: 'SET_STEP', payload: 'recommendations' })
      setShowResults(true)
      
      toast({
        title: "Risk Assessment Complete!",
        description: `You've been classified as a ${riskProfile} investor.`,
      })
    }
  }

  const getTotalScore = () => state.userProfile.riskScore || answers.reduce((sum, score) => sum + score, 0)
  
  const getRiskProfile = () => {
    const score = getTotalScore()
    if (score <= 8) return { level: "Conservative", color: "bg-blue-500", icon: Shield }
    if (score <= 12) return { level: "Moderate", color: "bg-yellow-500", icon: AlertTriangle }
    return { level: "Aggressive", color: "bg-red-500", icon: TrendingUp }
  }

  const handleViewRecommendations = () => {
    dispatch({ type: 'SET_STEP', payload: 'dashboard' })
    const element = document.getElementById('dashboard')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const progress = ((currentQuestion + (showResults ? 1 : 0)) / questions.length) * 100

  if (showResults) {
    const riskProfile = getRiskProfile()
    const Icon = riskProfile.icon

    return (
      <section className="py-20">
        <div className="container max-w-4xl mx-auto">
          <Card className="shadow-glow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-success" />
              </div>
              <CardTitle className="text-3xl">Your Risk Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${riskProfile.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xl px-4 py-2">
                    {riskProfile.level} Investor
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">
                  Based on your responses, we've identified your risk tolerance level.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Recommended Allocation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Equity</span>
                      <span>{riskProfile.level === 'Conservative' ? '30%' : riskProfile.level === 'Moderate' ? '60%' : '80%'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Debt</span>
                      <span>{riskProfile.level === 'Conservative' ? '70%' : riskProfile.level === 'Moderate' ? '40%' : '20%'}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Expected Returns</h4>
                  <div className="text-2xl font-bold text-success">
                    {riskProfile.level === 'Conservative' ? '8-10%' : riskProfile.level === 'Moderate' ? '10-14%' : '12-18%'}
                  </div>
                  <p className="text-sm text-muted-foreground">Annual returns</p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Investment Style</h4>
                  <p className="text-sm">
                    {riskProfile.level === 'Conservative' 
                      ? 'Focus on stable, dividend-paying stocks'
                      : riskProfile.level === 'Moderate'
                      ? 'Balanced mix of growth and value stocks'
                      : 'Growth-focused with higher potential returns'
                    }
                  </p>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  variant="invest" 
                  size="lg"
                  onClick={handleViewRecommendations}
                >
                  View Personalized Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="learn" className="py-20 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Risk Assessment
          </h2>
          <p className="text-muted-foreground">
            Help us understand your investment personality
          </p>
          <Progress value={progress} className="mt-6 max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-4 hover:bg-primary-light"
                  onClick={() => handleAnswer(option.score)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default RiskAssessment