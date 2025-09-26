-- Perfect Pairing Database Schema
-- Designed for AI-powered beverage pairing recommendations

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,

    -- User preferences
    dietary_restrictions TEXT[],  -- ['vegetarian', 'gluten_free', 'dairy_free', etc.]
    alcohol_preferences JSONB,   -- {'wine': true, 'cocktails': true, 'beer': false, etc.}
    budget_range TEXT,          -- 'low', 'medium', 'high'
    experience_level TEXT,      -- 'beginner', 'intermediate', 'advanced'
    favorite_cuisines TEXT[],   -- ['italian', 'japanese', 'mexican', etc.]

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meals table - stores meal information from user input
CREATE TABLE public.meals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Core meal data
    name TEXT NOT NULL,
    description TEXT,
    main_dishes JSONB NOT NULL,        -- [{"name": "Grilled Salmon", "cooking_method": "grilled", "protein": "fish"}]
    appetizers JSONB DEFAULT '[]',     -- [{"name": "Bruschetta", "type": "bread_based"}]
    sides JSONB DEFAULT '[]',          -- [{"name": "Roasted Vegetables", "preparation": "roasted"}]
    seasonings_marinades JSONB DEFAULT '[]', -- [{"type": "herb", "name": "rosemary"}, {"type": "marinade", "name": "teriyaki"}]

    -- Context information
    meal_timing TEXT,              -- 'lunch', 'dinner', 'brunch'
    dining_style TEXT,             -- 'casual', 'formal', 'bbq', 'family_style'
    guest_count INTEGER DEFAULT 2,
    weather_season TEXT,           -- 'spring', 'summer', 'fall', 'winter', 'hot', 'cold', 'rainy'
    occasion TEXT,                 -- 'date_night', 'family_dinner', 'celebration', 'casual'
    budget_constraint TEXT,        -- 'low', 'medium', 'high', 'unlimited'

    -- Flavor profile analysis (computed by AI)
    flavor_profile JSONB,          -- {"richness": 7, "acidity": 5, "spiciness": 3, "sweetness": 2}
    cuisine_style TEXT,            -- 'mediterranean', 'asian', 'american', etc.

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommendations table - stores AI-generated pairing suggestions
CREATE TABLE public.recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    meal_id UUID REFERENCES public.meals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- Recommendation metadata
    session_id UUID DEFAULT uuid_generate_v4(), -- Groups recommendations from same session
    version INTEGER DEFAULT 1,                  -- Version for refinement iterations
    status TEXT DEFAULT 'active',               -- 'active', 'refined', 'dismissed'

    -- AI model information
    ai_model TEXT NOT NULL,                     -- 'gpt-4o', 'gpt-4-turbo', etc.
    prompt_version TEXT,                        -- Track prompt iterations
    confidence_score DECIMAL(3,2),              -- AI confidence 0.00-1.00

    -- Recommendation content
    category TEXT NOT NULL,                     -- 'cocktail', 'wine', 'beer', 'spirits', 'non_alcoholic'
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    pairing_reasoning TEXT NOT NULL,            -- Why this pairs well

    -- Cocktail specific
    recipe JSONB,                              -- {"ingredients": [{"name": "gin", "amount": "2oz"}], "instructions": ["stir", "strain"]}
    glassware TEXT,                            -- 'coupe', 'rocks', 'wine_glass'
    garnish TEXT,                              -- 'lemon_twist', 'olive', 'cherry'

    -- Wine/Beer specific
    varietal TEXT,                             -- 'pinot_noir', 'chardonnay', 'ipa'
    producer TEXT,                             -- Specific brand/winery
    vintage TEXT,                              -- Year
    region TEXT,                               -- 'burgundy', 'napa_valley', 'belgium'
    price_range TEXT,                          -- 'budget', 'mid_range', 'premium'
    alcohol_content DECIMAL(4,2),              -- ABV percentage

    -- Shopping guidance
    where_to_buy JSONB DEFAULT '[]',           -- [{"store": "total_wine", "price": "$15.99", "availability": "in_stock"}]
    alternatives JSONB DEFAULT '[]',           -- Similar options if primary unavailable

    -- User interaction
    user_rating INTEGER,                       -- 1-5 stars after trying
    user_feedback TEXT,                        -- User comments
    tried_date DATE,                           -- When user tried this pairing

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Refinement sessions table - tracks conversation-based refinements
CREATE TABLE public.refinement_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    meal_id UUID REFERENCES public.meals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    original_recommendation_id UUID REFERENCES public.recommendations(id),

    -- Refinement request
    user_feedback TEXT NOT NULL,              -- "Too sweet" "Need something lighter" "Different style"
    refinement_type TEXT,                     -- 'sweetness', 'strength', 'style', 'price', 'availability'

    -- AI response
    ai_response TEXT,                         -- AI explanation of changes
    new_recommendations UUID[],               -- Array of new recommendation IDs

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites table - save preferred pairings
CREATE TABLE public.user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    meal_id UUID REFERENCES public.meals(id),
    recommendation_id UUID REFERENCES public.recommendations(id),

    notes TEXT,                               -- User's personal notes
    tags TEXT[],                              -- ['date_night', 'summer', 'impressive']

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics/usage tracking
CREATE TABLE public.user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    session_data JSONB,                       -- Track user journey and interactions
    recommendations_generated INTEGER DEFAULT 0,
    refinements_requested INTEGER DEFAULT 0,
    time_spent_minutes INTEGER,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refinement_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Users can only access their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Meals: Users can only access their own meals
CREATE POLICY "Users can manage own meals" ON public.meals
    FOR ALL USING (auth.uid() = user_id);

-- Recommendations: Users can only access recommendations for their meals
CREATE POLICY "Users can manage own recommendations" ON public.recommendations
    FOR ALL USING (auth.uid() = user_id);

-- Refinement sessions: Users can only access their own refinements
CREATE POLICY "Users can manage own refinements" ON public.refinement_sessions
    FOR ALL USING (auth.uid() = user_id);

-- User favorites: Users can only access their own favorites
CREATE POLICY "Users can manage own favorites" ON public.user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- User sessions: Users can only access their own sessions
CREATE POLICY "Users can manage own sessions" ON public.user_sessions
    FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_meals_user_id ON public.meals(user_id);
CREATE INDEX idx_meals_created_at ON public.meals(created_at DESC);
CREATE INDEX idx_recommendations_meal_id ON public.recommendations(meal_id);
CREATE INDEX idx_recommendations_session_id ON public.recommendations(session_id);
CREATE INDEX idx_recommendations_category ON public.recommendations(category);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_meals_updated_at
    BEFORE UPDATE ON public.meals
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_recommendations_updated_at
    BEFORE UPDATE ON public.recommendations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();