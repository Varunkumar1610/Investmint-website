import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, ShoppingCart, Star, Heart } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import { toast } from "@/hooks/use-toast"

const StockRecommendations = () => {
  const { state, dispatch } = useApp()

  const getFilteredRecommendations = () => {
    // Filter recommendations based on user's risk profile
    const allRecommendations = [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        price: "₹2,450.75",
        change: "+2.3%",
        changeAmount: "+₹55.20",
        positive: true,
        rating: 4.2,
        marketCap: "₹16.5L Cr",
        sector: "Energy",
        risk: "Moderate",
        aiScore: 85,
        reasons: ["Strong fundamentals", "Expanding digital business", "Stable dividend history"],
        suitableFor: ["Conservative", "Moderate", "Aggressive"]
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: "₹3,890.45",
        change: "+1.8%",
        changeAmount: "+₹68.90",
        positive: true,
        rating: 4.5,
        marketCap: "₹14.2L Cr",
        sector: "IT Services",
        risk: "Low",
        aiScore: 92,
        reasons: ["Market leader in IT", "Strong client base", "Consistent growth"],
        suitableFor: ["Conservative", "Moderate", "Aggressive"]
      },
      {
        symbol: "HDFC",
        name: "HDFC Bank Ltd",
        price: "₹1,675.30",
        change: "-0.5%",
        changeAmount: "-₹8.45",
        positive: false,
        rating: 4.1,
        marketCap: "₹12.8L Cr",
        sector: "Banking",
        risk: "Low",
        aiScore: 78,
        reasons: ["Leading private bank", "Strong asset quality", "Digital transformation"],
        suitableFor: ["Conservative", "Moderate"]
      },
      {
        symbol: "INFY",
        name: "Infosys Ltd",
        price: "₹1,820.60",
        change: "+3.2%",
        changeAmount: "+₹56.40",
        positive: true,
        rating: 4.3,
        marketCap: "₹7.6L Cr",
        sector: "IT Services",
        risk: "Moderate",
        aiScore: 88,
        reasons: ["Strong earnings growth", "Digital initiatives", "Global presence"],
        suitableFor: ["Moderate", "Aggressive"]
      },
      {
        symbol: "ADANIPOWER",
        name: "Adani Power Ltd",
        price: "₹1,250.30",
        change: "+8.5%",
        changeAmount: "+₹98.20",
        positive: true,
        rating: 3.8,
        marketCap: "₹5.2L Cr",
        sector: "Power",
        risk: "High",
        aiScore: 75,
        reasons: ["High growth potential", "Infrastructure expansion", "Energy transition"],
        suitableFor: ["Aggressive"]
      }
    ]

    const userRisk = state.userProfile.riskProfile
    if (!userRisk) return allRecommendations.slice(0, 4)
    
    return allRecommendations.filter(stock => 
      stock.suitableFor.includes(userRisk)
    )
  }

  const handleAddToWatchlist = (symbol: string) => {
    if (state.userProfile.watchlist.includes(symbol)) {
      dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: symbol })
      toast({
        title: "Removed from Watchlist",
        description: `${symbol} has been removed from your watchlist.`,
      })
    } else {
      dispatch({ type: 'ADD_TO_WATCHLIST', payload: symbol })
      toast({
        title: "Added to Watchlist",
        description: `${symbol} has been added to your watchlist.`,
      })
    }
  }

  const handleInvestNow = (symbol: string, name: string) => {
    toast({
      title: "Redirecting to Trading Platform",
      description: `Opening ${name} on your selected trading platform...`,
    })
    // In a real app, this would redirect to Groww/Upstox
    setTimeout(() => {
      window.open(`https://groww.in/stocks/${symbol.toLowerCase()}`, '_blank')
    }, 1500)
  }

  const handleViewDetails = (symbol: string) => {
    toast({
      title: "Stock Details",
      description: `Showing detailed analysis for ${symbol}...`,
    })
    // In a real app, this would show a detailed stock analysis modal
  }

  const recommendations = getFilteredRecommendations()

  return (
    <section id="dashboard" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {state.userProfile.riskProfile ? `Recommendations for ${state.userProfile.riskProfile} Investors` : 'AI-Powered Stock Recommendations'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {state.userProfile.budget 
              ? `Based on your ₹${state.userProfile.budget} budget and ${state.userProfile.riskProfile || ''} risk profile`
              : 'Based on your budget and risk profile, here are our top picks for you'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {recommendations.map((stock) => {
            const isInWatchlist = state.userProfile.watchlist.includes(stock.symbol)
            return (
            <Card key={stock.symbol} className="shadow-card hover:shadow-glow transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      {stock.symbol}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleAddToWatchlist(stock.symbol)}
                      >
                        <Heart className={`w-4 h-4 ${isInWatchlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                      </Button>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={stock.risk === 'Low' ? 'secondary' : 'outline'} className="text-xs">
                        {stock.risk} Risk
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {stock.sector}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{stock.price}</div>
                    <div className={`flex items-center gap-1 ${stock.positive ? 'text-success' : 'text-destructive'}`}>
                      {stock.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-medium">{stock.change}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(stock.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">{stock.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">AI Score</div>
                    <div className="text-lg font-bold text-primary">{stock.aiScore}/100</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Market Cap:</span>
                    <div className="font-medium">{stock.marketCap}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Day Change:</span>
                    <div className={`font-medium ${stock.positive ? 'text-success' : 'text-destructive'}`}>
                      {stock.changeAmount}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Why we recommend this:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {stock.reasons.map((reason, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(stock.symbol)}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleInvestNow(stock.symbol, stock.name)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="invest" 
            size="lg"
            onClick={() => toast({
              title: "More Recommendations",
              description: "Loading additional personalized recommendations...",
            })}
          >
            View All Recommendations
          </Button>
        </div>
      </div>
    </section>
  )
}

export default StockRecommendations