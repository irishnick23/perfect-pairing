# Supabase Setup for Perfect Pairing

## Step 1: Create Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. **Project Name**: `perfect-pairing`
4. **Database Password**: Generate a strong password and save it securely
5. **Region**: Choose closest to your users (e.g., `us-east-1`, `eu-west-1`)
6. Click "Create new project"

Wait for the project to be created (usually takes 2-3 minutes).

## Step 2: Get Project Credentials

Once the project is ready:

1. Go to **Settings** → **API**
2. Copy the following values:

```bash
# Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co

# Anon/Public Key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Service Role Key (keep this secret!)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Step 3: Apply Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the ENTIRE contents of `database-schema.sql`
4. Click **Run** to execute

The schema will create:
- ✅ User profiles table with preferences
- ✅ Meals table for food input
- ✅ Recommendations table for AI suggestions
- ✅ Refinement sessions for conversation tracking
- ✅ User favorites and analytics
- ✅ Row Level Security policies
- ✅ Database indexes for performance

## Step 4: Configure Authentication

1. Go to **Authentication** → **Settings**
2. **Enable Email Authentication** (already enabled by default)
3. **Site URL**: Set to `http://localhost:3000`
4. **Redirect URLs**: Add `http://localhost:3000/auth/callback`
5. Click **Save**

### Optional: Configure Email Templates
1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation and reset password emails with your branding

## Step 5: Create Environment File

Create `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Test Database Connection

Run this command to test the connection:

```bash
npm run dev
```

If everything is set up correctly, the app should start without database connection errors.

## Step 7: Enable RLS and Test Policies

In the SQL Editor, run this quick test:

```sql
-- Test that RLS is working
SELECT auth.uid(); -- Should return null when not authenticated

-- Test table creation
SELECT COUNT(*) FROM public.profiles;
SELECT COUNT(*) FROM public.meals;
SELECT COUNT(*) FROM public.recommendations;
```

All queries should execute successfully.

## Production Setup (Later)

When ready to deploy:

1. **Add production domain** to Authentication → Settings → Site URL
2. **Update CORS settings** if needed
3. **Review RLS policies** for production security
4. **Set up database backups** in Settings → Database
5. **Monitor usage** in Reports

## Troubleshooting

### Common Issues:

**"relation does not exist" error**:
- Make sure you ran the complete schema from `database-schema.sql`
- Check that all tables were created in the SQL Editor

**Authentication not working**:
- Verify Site URL matches your development URL exactly
- Check that redirect URLs are properly configured

**RLS blocking queries**:
- Ensure you're authenticated when testing
- Check that policies are correctly applied for your use case

**Environment variables not loading**:
- Make sure `.env.local` is in the project root
- Restart your development server after adding variables
- Verify no typos in variable names

---

Once complete, you'll have a fully configured Supabase backend ready for Perfect Pairing! 🎉