import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface UserProfile {
  budget: string
  monthlyInvestment: string
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive' | null
  riskScore: number
  completedAssessment: boolean
  watchlist: string[]
}

interface AppState {
  userProfile: UserProfile
  currentStep: 'budget' | 'risk' | 'recommendations' | 'dashboard'
  notifications: Notification[]
}

interface Notification {
  id: number
  type: 'alert' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  stock: string
  action: string
  read: boolean
}

type AppAction = 
  | { type: 'SET_BUDGET'; payload: { budget: string; monthlyInvestment: string } }
  | { type: 'SET_RISK_PROFILE'; payload: { riskProfile: UserProfile['riskProfile']; riskScore: number } }
  | { type: 'SET_STEP'; payload: AppState['currentStep'] }
  | { type: 'ADD_TO_WATCHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'MARK_NOTIFICATION_READ'; payload: number }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> }

const initialState: AppState = {
  userProfile: {
    budget: '',
    monthlyInvestment: '',
    riskProfile: null,
    riskScore: 0,
    completedAssessment: false,
    watchlist: []
  },
  currentStep: 'budget',
  notifications: [
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
  ]
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_BUDGET':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          budget: action.payload.budget,
          monthlyInvestment: action.payload.monthlyInvestment
        }
      }
    case 'SET_RISK_PROFILE':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          riskProfile: action.payload.riskProfile,
          riskScore: action.payload.riskScore,
          completedAssessment: true
        }
      }
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      }
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          watchlist: [...state.userProfile.watchlist, action.payload]
        }
      }
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          watchlist: state.userProfile.watchlist.filter(stock => stock !== action.payload)
        }
      }
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif => 
          notif.id === action.payload ? { ...notif, read: true } : notif
        )
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          { ...action.payload, id: Date.now() },
          ...state.notifications
        ]
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}