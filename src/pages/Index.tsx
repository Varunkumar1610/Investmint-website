import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import BudgetInput from "@/components/BudgetInput"
import RiskAssessment from "@/components/RiskAssessment"
import StockRecommendations from "@/components/StockRecommendations"
import IntegrationSection from "@/components/IntegrationSection"
import AINotificationBot from "@/components/AINotificationBot"
import { AppProvider } from "@/contexts/AppContext"
import { useAuth } from "@/hooks/useAuth"

const AuthenticatedApp = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <BudgetInput />
          <RiskAssessment />
          <StockRecommendations />
          <IntegrationSection />
        </main>
        <AINotificationBot />
      </div>
    </AppProvider>
  );
};

const Index = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth')
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <AuthenticatedApp />
};

export default Index;
