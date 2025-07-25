import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Bell, TrendingDown, AlertTriangle, Info, X } from "lucide-react"

const AINotificationBot = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "Price Drop Alert",
      message: "TCS stock is down 3.2% - Technical indicators suggest this might be a good entry point.",
      timestamp: "2 minutes ago",
      stock: "TCS",
      action: "Consider buying",
      read: false
    },
    {
      id: 2,
      type: "warning",
      title: "Market Sentiment",
      message: "Negative sentiment detected for banking sector. HDFC Bank showing bearish signals.",
      timestamp: "15 minutes ago",
      stock: "HDFC",
      action: "Monitor closely",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "AI Insight",
      message: "Reliance Industries earnings announcement tomorrow. Volatility expected.",
      timestamp: "1 hour ago",
      stock: "RELIANCE",
      action: "Stay informed",
      read: true
    }
  ])

  const [isMinimized, setIsMinimized] = useState(false)

  const getIcon = (type: string) => {
    switch (type) {
      case "alert": return <TrendingDown className="w-4 h-4 text-warning" />
      case "warning": return <AlertTriangle className="w-4 h-4 text-destructive" />
      default: return <Info className="w-4 h-4 text-primary" />
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "alert": return "secondary"
      case "warning": return "destructive"
      default: return "outline"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-glow relative"
          variant="default"
        >
          <Bot className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="shadow-glow animate-slideUp">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              AI Investment Assistant
            </CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-card ${
                notification.read ? 'bg-muted/30' : 'bg-background shadow-soft'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <Badge variant={getBadgeVariant(notification.type)} className="text-xs">
                      {notification.stock}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {notification.action}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Bell className="w-4 h-4" />
              Settings
            </Button>
            <Button variant="default" size="sm" className="flex-1">
              View All Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AINotificationBot