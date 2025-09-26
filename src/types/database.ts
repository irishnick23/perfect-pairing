// Database types for Perfect Pairing
// Generated from Supabase schema

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          dietary_restrictions: string[] | null
          alcohol_preferences: Json | null
          budget_range: string | null
          experience_level: string | null
          favorite_cuisines: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          dietary_restrictions?: string[] | null
          alcohol_preferences?: Json | null
          budget_range?: string | null
          experience_level?: string | null
          favorite_cuisines?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          dietary_restrictions?: string[] | null
          alcohol_preferences?: Json | null
          budget_range?: string | null
          experience_level?: string | null
          favorite_cuisines?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          user_id: string | null
          name: string
          description: string | null
          main_dishes: Json
          appetizers: Json
          sides: Json
          seasonings_marinades: Json
          meal_timing: string | null
          dining_style: string | null
          guest_count: number | null
          weather_season: string | null
          occasion: string | null
          budget_constraint: string | null
          flavor_profile: Json | null
          cuisine_style: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          description?: string | null
          main_dishes: Json
          appetizers?: Json
          sides?: Json
          seasonings_marinades?: Json
          meal_timing?: string | null
          dining_style?: string | null
          guest_count?: number | null
          weather_season?: string | null
          occasion?: string | null
          budget_constraint?: string | null
          flavor_profile?: Json | null
          cuisine_style?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          description?: string | null
          main_dishes?: Json
          appetizers?: Json
          sides?: Json
          seasonings_marinades?: Json
          meal_timing?: string | null
          dining_style?: string | null
          guest_count?: number | null
          weather_season?: string | null
          occasion?: string | null
          budget_constraint?: string | null
          flavor_profile?: Json | null
          cuisine_style?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      recommendations: {
        Row: {
          id: string
          meal_id: string | null
          user_id: string | null
          session_id: string | null
          version: number | null
          status: string | null
          ai_model: string
          prompt_version: string | null
          confidence_score: number | null
          category: string
          name: string
          description: string
          pairing_reasoning: string
          recipe: Json | null
          glassware: string | null
          garnish: string | null
          varietal: string | null
          producer: string | null
          vintage: string | null
          region: string | null
          price_range: string | null
          alcohol_content: number | null
          where_to_buy: Json
          alternatives: Json
          user_rating: number | null
          user_feedback: string | null
          tried_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          meal_id?: string | null
          user_id?: string | null
          session_id?: string | null
          version?: number | null
          status?: string | null
          ai_model: string
          prompt_version?: string | null
          confidence_score?: number | null
          category: string
          name: string
          description: string
          pairing_reasoning: string
          recipe?: Json | null
          glassware?: string | null
          garnish?: string | null
          varietal?: string | null
          producer?: string | null
          vintage?: string | null
          region?: string | null
          price_range?: string | null
          alcohol_content?: number | null
          where_to_buy?: Json
          alternatives?: Json
          user_rating?: number | null
          user_feedback?: string | null
          tried_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          meal_id?: string | null
          user_id?: string | null
          session_id?: string | null
          version?: number | null
          status?: string | null
          ai_model?: string
          prompt_version?: string | null
          confidence_score?: number | null
          category?: string
          name?: string
          description?: string
          pairing_reasoning?: string
          recipe?: Json | null
          glassware?: string | null
          garnish?: string | null
          varietal?: string | null
          producer?: string | null
          vintage?: string | null
          region?: string | null
          price_range?: string | null
          alcohol_content?: number | null
          where_to_buy?: Json
          alternatives?: Json
          user_rating?: number | null
          user_feedback?: string | null
          tried_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      refinement_sessions: {
        Row: {
          id: string
          meal_id: string | null
          user_id: string | null
          original_recommendation_id: string | null
          user_feedback: string
          refinement_type: string | null
          ai_response: string | null
          new_recommendations: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          meal_id?: string | null
          user_id?: string | null
          original_recommendation_id?: string | null
          user_feedback: string
          refinement_type?: string | null
          ai_response?: string | null
          new_recommendations?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          meal_id?: string | null
          user_id?: string | null
          original_recommendation_id?: string | null
          user_feedback?: string
          refinement_type?: string | null
          ai_response?: string | null
          new_recommendations?: string[] | null
          created_at?: string
        }
      }
      user_favorites: {
        Row: {
          id: string
          user_id: string | null
          meal_id: string | null
          recommendation_id: string | null
          notes: string | null
          tags: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          meal_id?: string | null
          recommendation_id?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          meal_id?: string | null
          recommendation_id?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string | null
          session_data: Json | null
          recommendations_generated: number | null
          refinements_requested: number | null
          time_spent_minutes: number | null
          created_at: string
          ended_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_data?: Json | null
          recommendations_generated?: number | null
          refinements_requested?: number | null
          time_spent_minutes?: number | null
          created_at?: string
          ended_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          session_data?: Json | null
          recommendations_generated?: number | null
          refinements_requested?: number | null
          time_spent_minutes?: number | null
          created_at?: string
          ended_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Application-specific types
export type UserProfile = Database['public']['Tables']['profiles']['Row']
export type Meal = Database['public']['Tables']['meals']['Row']
export type Recommendation = Database['public']['Tables']['recommendations']['Row']
export type RefinementSession = Database['public']['Tables']['refinement_sessions']['Row']
export type UserFavorite = Database['public']['Tables']['user_favorites']['Row']
export type UserSession = Database['public']['Tables']['user_sessions']['Row']

// Insert types
export type UserProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type MealInsert = Database['public']['Tables']['meals']['Insert']
export type RecommendationInsert = Database['public']['Tables']['recommendations']['Insert']
export type RefinementSessionInsert = Database['public']['Tables']['refinement_sessions']['Insert']
export type UserFavoriteInsert = Database['public']['Tables']['user_favorites']['Insert']
export type UserSessionInsert = Database['public']['Tables']['user_sessions']['Insert']

// Structured types for complex JSON fields
export interface DishItem {
  name: string
  cooking_method?: string
  protein?: string
  type?: string
  preparation?: string
}

export interface SeasoningItem {
  type: 'herb' | 'spice' | 'marinade' | 'sauce'
  name: string
  intensity?: 'light' | 'medium' | 'heavy'
}

export interface FlavorProfile {
  richness: number      // 1-10
  acidity: number       // 1-10
  spiciness: number     // 1-10
  sweetness: number     // 1-10
  saltiness: number     // 1-10
  bitterness: number    // 1-10
}

export interface DrinkRecipe {
  ingredients: Array<{
    name: string
    amount: string
    type?: 'spirit' | 'mixer' | 'garnish' | 'other'
  }>
  instructions: string[]
  prep_time_minutes?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  glassware?: string
  garnish?: string
}

export interface ShoppingInfo {
  store: string
  price: string
  availability: 'in_stock' | 'limited' | 'out_of_stock' | 'special_order'
  url?: string
}

export interface AlcoholPreferences {
  wine: boolean
  cocktails: boolean
  beer: boolean
  spirits: boolean
  non_alcoholic: boolean
  preferred_strength?: 'light' | 'medium' | 'strong'
}

// Enum types for better type safety
export type BudgetRange = 'low' | 'medium' | 'high' | 'unlimited'
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type MealTiming = 'breakfast' | 'brunch' | 'lunch' | 'dinner' | 'late_night'
export type DiningStyle = 'casual' | 'formal' | 'bbq' | 'family_style' | 'fine_dining'
export type WeatherSeason = 'spring' | 'summer' | 'fall' | 'winter' | 'hot' | 'cold' | 'rainy'
export type Occasion = 'date_night' | 'family_dinner' | 'celebration' | 'casual' | 'business' | 'holiday'
export type DrinkCategory = 'cocktail' | 'wine' | 'beer' | 'spirits' | 'non_alcoholic'
export type PriceRange = 'budget' | 'mid_range' | 'premium' | 'luxury'
export type RefinementType = 'sweetness' | 'strength' | 'style' | 'price' | 'availability' | 'complexity'