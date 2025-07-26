import { Button } from "@/components/ui/button"
import { Bell, Menu, LogOut } from "lucide-react"
import { useApp } from "@/contexts/AppContext"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const { state } = useApp()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const unreadCount = state.notifications.filter(n => !n.read).length

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">I</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Investmint</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('learn')}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Learn
          </button>
          <button 
            onClick={() => scrollToSection('dashboard')}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Dashboard
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full"></span>
            )}
          </Button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.email}
              </span>
              <Button 
                variant="soft"
                size="sm"
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="soft"
              size="sm"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          )}
          <Button variant="default" size="icon" className="md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header