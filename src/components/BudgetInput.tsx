import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, PiggyBank, TrendingUp } from "lucide-react"

const BudgetInput = () => {
  const [budget, setBudget] = useState("")
  const [monthlyInvestment, setMonthlyInvestment] = useState("")

  const budgetRanges = [
    { label: "Under ₹10,000", value: "10000", popular: false },
    { label: "₹10,000 - ₹50,000", value: "50000", popular: true },
    { label: "₹50,000 - ₹1,00,000", value: "100000", popular: false },
    { label: "₹1,00,000+", value: "100000+", popular: false },
  ]

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Plan Your Investment
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your financial goals and we'll create a personalized investment strategy for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <PiggyBank className="w-6 h-6 text-primary" />
                Your Investment Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="initial-budget" className="text-base font-medium">
                    Initial Investment Amount
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="initial-budget"
                      placeholder="Enter amount in ₹"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="pl-10 text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetRanges.map((range) => (
                      <Button
                        key={range.value}
                        variant={budget === range.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBudget(range.value)}
                        className="relative"
                      >
                        {range.label}
                        {range.popular && (
                          <span className="absolute -top-2 -right-2 bg-success text-xs px-2 py-1 rounded-full text-success-foreground">
                            Popular
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="monthly-sip" className="text-base font-medium">
                    Monthly SIP Amount (Optional)
                  </Label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="monthly-sip"
                      placeholder="Monthly investment"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(e.target.value)}
                      className="pl-10 text-lg"
                    />
                  </div>
                  <div className="bg-primary-light p-4 rounded-lg">
                    <p className="text-sm text-primary font-medium mb-2">💡 Pro Tip</p>
                    <p className="text-sm text-primary">
                      Starting with a monthly SIP of ₹1,000 can grow to ₹3.5L+ in 10 years 
                      with 12% annual returns!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button variant="invest" size="lg" className="min-w-48">
                  Continue to Risk Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default BudgetInput