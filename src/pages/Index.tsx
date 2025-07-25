import Header from "@/components/Header"
import Hero from "@/components/Hero"
import BudgetInput from "@/components/BudgetInput"
import RiskAssessment from "@/components/RiskAssessment"
import StockRecommendations from "@/components/StockRecommendations"
import IntegrationSection from "@/components/IntegrationSection"
import AINotificationBot from "@/components/AINotificationBot"

const Index = () => {
  return (
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
  );
};

export default Index;
