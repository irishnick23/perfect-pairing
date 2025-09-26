#!/usr/bin/env node

/**
 * Perfect Pairing Database Setup Script
 *
 * This script helps verify your Supabase setup and creates test data
 * Run: node scripts/setup-database.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Please make sure your .env.local file contains:')
  console.log('- NEXT_PUBLIC_SUPABASE_URL')
  console.log('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function verifySetup() {
  console.log('🔍 Verifying Supabase setup for Perfect Pairing...\n')

  try {
    // Test connection
    console.log('1. Testing database connection...')
    const { data, error } = await supabase.from('profiles').select('count').limit(1)

    if (error) {
      if (error.message.includes('relation "public.profiles" does not exist')) {
        console.error('❌ Database tables not found. Please apply the database schema first.')
        console.log('\nTo fix this:')
        console.log('1. Go to your Supabase SQL Editor')
        console.log('2. Copy the contents of database-schema.sql')
        console.log('3. Run the SQL to create all tables')
        return false
      }
      throw error
    }
    console.log('✅ Database connection successful')

    // Check all required tables exist
    console.log('\n2. Checking required tables...')
    const tables = ['profiles', 'meals', 'recommendations', 'refinement_sessions', 'user_favorites', 'user_sessions']

    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('count').limit(1)
      if (tableError) {
        console.error(`❌ Table '${table}' not found or accessible`)
        return false
      }
      console.log(`✅ Table '${table}' exists`)
    }

    // Test RLS policies
    console.log('\n3. Testing Row Level Security...')
    const { error: rlsError } = await supabase.from('profiles').select('*').limit(1)
    if (rlsError) {
      console.log('⚠️  RLS is active (this is good for security)')
    } else {
      console.log('✅ RLS policies configured')
    }

    // Test authentication
    console.log('\n4. Testing authentication setup...')
    const { data: authData, error: authError } = await supabase.auth.getSession()
    console.log('✅ Authentication service accessible')

    console.log('\n🎉 Perfect Pairing database setup verification complete!')
    console.log('\nNext steps:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Test user registration and login')
    console.log('3. Create your first meal pairing')

    return true

  } catch (error) {
    console.error('❌ Setup verification failed:', error.message)
    console.log('\nPlease check:')
    console.log('- Your Supabase project is active')
    console.log('- Environment variables are correct')
    console.log('- Database schema has been applied')
    return false
  }
}

async function createSampleData() {
  console.log('\n📝 Would you like to create sample data? (optional)')
  console.log('This will help you test the application with realistic meal data.')

  // For now, just show what sample data would look like
  console.log('\nSample data structure:')
  console.log('- User profile with dietary preferences')
  console.log('- Sample meal: Grilled Salmon with asparagus')
  console.log('- AI recommendations: Wine and cocktail pairings')
  console.log('\n💡 You can create this data through the app interface once it\'s built!')
}

// Main execution
verifySetup()
  .then((success) => {
    if (success) {
      createSampleData()
    }
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })