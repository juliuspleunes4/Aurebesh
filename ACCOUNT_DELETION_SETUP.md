# Account Deletion Setup for Supabase

This document explains how to set up account deletion functionality in your Supabase project.

## Simple Setup (No Manual Processing Required!)

### 1. Run the SQL Function

Execute the SQL script `supabase-delete-account-function.sql` in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-delete-account-function.sql`
4. Click **Run**

This creates a single function `delete_user()` that allows authenticated users to delete their own accounts.

### 2. That's It!

The app is already configured to use this function. Users can now:
- Go to Settings > Danger Zone
- Tap "Delete Account" 
- Confirm the deletion
- Their account is **immediately and permanently deleted** from Supabase Auth

## How It Works

### The SQL Function
```sql
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id UUID;
BEGIN
    current_user_id := auth.uid();
    
    -- Delete user from auth.users (this removes the account completely)
    DELETE FROM auth.users WHERE id = current_user_id;
END;
$$;
```

### App Flow
1. User taps "Delete Account"
2. Confirmation dialog appears
3. App calls `supabase.rpc('delete_user')`
4. User account is **permanently deleted** from Supabase
5. User is automatically signed out

## What Gets Deleted

- ✅ **User account** from Supabase Authentication tab
- ✅ **All user sessions** (automatic logout)
- ✅ **Any related data** with foreign key constraints to `auth.users`

## Adding Custom Data Cleanup

If you have custom tables, add cleanup to the function:

```sql
-- Add these lines inside the delete_user() function before the final DELETE
DELETE FROM user_profiles WHERE id = current_user_id;
DELETE FROM user_progress WHERE user_id = current_user_id;
DELETE FROM user_settings WHERE user_id = current_user_id;
```

## Security

- ✅ Users can only delete their **own** account (enforced by `auth.uid()`)
- ✅ No admin privileges required
- ✅ No manual processing needed
- ✅ Immediate deletion from Authentication tab

## Testing

1. Create a test user account
2. Log in and go to Settings > Danger Zone  
3. Tap "Delete Account" and confirm
4. Check your Supabase Authentication tab - the user should be **gone**
5. Try logging in again - it should fail

**That's it! No complex setup, no manual processing, just immediate account deletion.** 🎉
