// Main application types for Perfect Pairing

export * from './database'

// Form types for meal input
export interface MealFormData {
  // Basic meal info
  name: string
  description?: string

  // Dishes
  mainDishes: DishFormItem[]
  appetizers: DishFormItem[]
  sides: DishFormItem[]
  seasoningsMarinades: SeasoningFormItem[]

  // Context
  mealTiming?: MealTiming
  diningStyle?: DiningStyle
  guestCount: number
  weatherSeason?: WeatherSeason
  occasion?: Occasion
  budgetConstraint?: BudgetRange
}

export interface DishFormItem {
  name: string
  cookingMethod?: string
  protein?: string
  notes?: string
}

export interface SeasoningFormItem {
  type: 'herb' | 'spice' | 'marinade' | 'sauce'
  name: string
  intensity?: 'light' | 'medium' | 'heavy'
}

// Recommendation display types
export interface RecommendationWithDetails extends Recommendation {
  recipe?: DrinkRecipe
  shoppingInfo: ShoppingInfo[]
  alternatives: Recommendation[]
}

export interface RecommendationGroup {
  category: DrinkCategory
  recommendations: RecommendationWithDetails[]
  categoryDescription?: string
}

// AI prompt and response types
export interface AIPromptData {
  meal: MealFormData
  userPreferences?: Partial<UserProfile>
  previousRecommendations?: Recommendation[]
  refinementFeedback?: string
}

export interface AIResponse {
  recommendations: {
    cocktails: RecommendationData[]
    wines: RecommendationData[]
    beers?: RecommendationData[]
    nonAlcoholic?: RecommendationData[]
  }
  flavorAnalysis: FlavorProfile
  cuisineStyle: string
  confidence: number
  reasoning: string
}

export interface RecommendationData {
  name: string
  description: string
  pairingReasoning: string
  recipe?: DrinkRecipe
  varietal?: string
  producer?: string
  vintage?: string
  region?: string
  priceRange?: PriceRange
  alcoholContent?: number
  shoppingGuidance: ShoppingInfo[]
  alternatives: string[]
}

// UI component types
export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  'aria-label'?: string
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'danger' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  'aria-label'?: string
}

export interface ToggleProps {
  options: Array<{
    value: string
    label: string
    'aria-label'?: string
  }>
  value: string
  onChange: (value: string) => void
  'aria-label'?: string
  className?: string
}

export interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  helpText?: string
  className?: string
}

// Navigation and routing types
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
  'aria-label'?: string
}

// Session and state management types
export interface AppState {
  user: UserProfile | null
  currentMeal: Partial<Meal> | null
  recommendations: RecommendationGroup[]
  isLoading: boolean
  error: string | null
  sessionId?: string
}

export interface MealFormState {
  data: MealFormData
  currentStep: number
  totalSteps: number
  errors: Record<string, string>
  touched: Record<string, boolean>
}

// API response types
export interface APIResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Error types
export interface AppError {
  message: string
  code?: string
  details?: any
  timestamp: string
}

// Analytics types
export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  userId?: string
  sessionId?: string
  timestamp: string
}

export interface UserInteraction extends AnalyticsEvent {
  event:
    | 'meal_created'
    | 'recommendation_generated'
    | 'recommendation_refined'
    | 'recommendation_favorited'
    | 'recommendation_tried'
    | 'session_started'
    | 'session_ended'
  properties: {
    mealId?: string
    recommendationId?: string
    category?: DrinkCategory
    refinementType?: RefinementType
    rating?: number
  }
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Form validation types
export type ValidationRule<T = any> = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: T) => string | null
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}

// Theme and styling types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    success: string
    danger: string
    warning: string
    info: string
    light: string
    dark: string
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  fontSizes: Record<string, string>
  fontWeights: Record<string, number>
}

// re-export common database types for convenience
export type {
  UserProfile,
  Meal,
  Recommendation,
  RefinementSession,
  UserFavorite,
  UserSession,
  UserProfileInsert,
  MealInsert,
  RecommendationInsert,
  RefinementSessionInsert,
  UserFavoriteInsert,
  UserSessionInsert,
  DishItem,
  SeasoningItem,
  FlavorProfile,
  DrinkRecipe,
  ShoppingInfo,
  AlcoholPreferences,
  BudgetRange,
  ExperienceLevel,
  MealTiming,
  DiningStyle,
  WeatherSeason,
  Occasion,
  DrinkCategory,
  PriceRange,
  RefinementType
} from './database'