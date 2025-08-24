-- Simple function to allow users to delete their own account
-- This will delete the user from auth.users and trigger cascading deletes

CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id UUID;
BEGIN
    -- Get the current authenticated user
    current_user_id := auth.uid();
    
    -- Security check: user must be authenticated
    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;
    
    -- Delete any custom user data first (add your app-specific tables here)
    -- Example:
    -- DELETE FROM user_profiles WHERE id = current_user_id;
    -- DELETE FROM user_progress WHERE user_id = current_user_id;
    -- DELETE FROM user_settings WHERE user_id = current_user_id;
    
    -- Delete the user from auth.users
    -- This is the key part that actually removes the account
    DELETE FROM auth.users WHERE id = current_user_id;
    
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_user() TO authenticated;

-- That's it! Users can now delete their own accounts by calling this function
