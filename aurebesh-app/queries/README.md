# Database Setup for Aurebesh 

This folder contains SQL queries that **must be executed** in your Supabase database to make the Aurebesh learning app work properly.

## 📋 Required Setup

### 1. Prerequisites
- Have a Supabase project created
- Access to your Supabase dashboard
- Admin access to the SQL Editor

### 2. How to Run These Queries

1. **Open Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com) 
   - Navigate to your project

2. **Access SQL Editor**
   - Click on **"SQL Editor"** in the left sidebar
   - Click **"New Query"**

3. **Execute Each Query**
   - Copy the contents of each `.sql` file in this folder
   - Paste into the SQL Editor
   - Click **"Run"** to execute

## 📂 Queries in This Folder

### `delete_account.sql`
**Purpose:** Enables user account deletion functionality

**What it does:**
- Creates a `delete_user()` function
- Allows authenticated users to delete their own accounts
- Automatically removes the user from Supabase Authentication
- Handles cleanup of any related user data

**Required for:** Settings > Danger Zone > Delete Account feature

### `learning_statistics.sql`
**Purpose:** Enables learning progress tracking and statistics

**What it does:**
- Creates `learning_sessions` table to track individual learning sessions
- Creates `learning_statistics` table for overall user progress
- Sets up automatic statistics updates via triggers
- Creates `get_user_learning_stats()` function for easy data retrieval
- Enables tracking of scores, streaks, accuracy, and time spent learning

**Required for:** Learn Screen progress tracking and statistics

## ⚠️ Important Notes

- **Run queries in order** - Some queries may depend on others
- **Test in development first** - Always test these queries in a development environment before production
- **Backup your data** - Consider backing up your database before running these queries
- **One-time setup** - These queries only need to be run once per Supabase project

## 🔒 Security

All functions are created with proper security measures:
- **`SECURITY DEFINER`** - Functions run with elevated privileges only when needed
- **`auth.uid()` checks** - Users can only affect their own data
- **Proper permissions** - Functions are only accessible to authenticated users

## ✅ Verification

After running the queries, you can verify they work by:

1. **Check Functions** - Go to Database > Functions in Supabase to see the created functions
2. **Test Features** - Use the app features that depend on these queries
3. **Monitor Logs** - Check for any errors in the Supabase logs

## 🆘 Troubleshooting

**"Function already exists" error:**
- This is normal if re-running queries
- The `CREATE OR REPLACE` statement will update the existing function

**"Permission denied" error:**
- Make sure you're running as a database owner/admin
- Check that your Supabase user has the correct permissions

**App features not working:**
- Verify all queries executed successfully
- Check the Supabase logs for runtime errors
- Ensure your app is connecting to the correct Supabase project

---

**Need help?** Check the main project README or create an issue in the repository.
