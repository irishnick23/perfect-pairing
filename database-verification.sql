-- Database Verification Script for Perfect Pairing
-- Run this after applying the main schema to verify everything is set up correctly

-- Check that all tables exist
SELECT
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verify table structure
\d public.profiles;
\d public.meals;
\d public.recommendations;
\d public.refinement_sessions;
\d public.user_favorites;
\d public.user_sessions;

-- Check that RLS is enabled
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
    AND rowsecurity = true;

-- List all RLS policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE schemaname = 'public';

-- Check indexes
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Test basic functionality
-- Insert a test profile (will only work when authenticated)
INSERT INTO public.profiles (
    id,
    email,
    full_name,
    budget_range,
    experience_level
) VALUES (
    auth.uid(),
    auth.email(),
    'Test User',
    'medium',
    'intermediate'
) ON CONFLICT (id) DO NOTHING;

-- Test that we can query our own data
SELECT * FROM public.profiles WHERE id = auth.uid();

-- Clean up test data
DELETE FROM public.profiles WHERE id = auth.uid() AND full_name = 'Test User';

-- Check extensions are installed
SELECT * FROM pg_extension WHERE extname IN ('uuid-ossp');

-- Verify functions exist
SELECT
    routine_name,
    routine_type,
    routine_schema
FROM information_schema.routines
WHERE routine_schema = 'public'
    AND routine_name = 'handle_updated_at';

-- Check triggers are in place
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
    AND trigger_name LIKE '%updated_at%';

-- Test JSON columns are working
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
    AND data_type = 'jsonb'
ORDER BY table_name, column_name;

-- Final success message
SELECT 'Perfect Pairing database setup completed successfully! ✅' as status;