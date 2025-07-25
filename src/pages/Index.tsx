import Header from "@/components/Header"
import Hero from "@/components/Hero"
import BudgetInput from "@/components/BudgetInput"
import RiskAssessment from "@/components/RiskAssessment"
import StockRecommendations from "@/components/StockRecommendations"
import IntegrationSection from "@/components/IntegrationSection"
import AINotificationBot from "@/components/AINotificationBot"
import { AppProvider } from "@/contexts/AppContext"

const Index = () => {
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

export default Index;
