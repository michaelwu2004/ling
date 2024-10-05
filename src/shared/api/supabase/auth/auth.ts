import { supabase } from "../supabase"

/**
 * Removes this session's user access to the app.
 * @throws `Supabase.AuthError`
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Checks for account in supabase authentication.
 * If successful, give user access to use the app.
 * @param email 
 * @param password 
 * @throws `Supabase.AuthError`
 * @returns user's session and basic user profile information
 */
export const signInWithEmailAndPasword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  return {
    session: data.session,
    user: data.user
  }
}

// TODO: Ling

/**
 * Checks if an account email already exists.
 * If account email already exists, no account is created.
 * Anything else, create a new account for the user and sign them in.
 * @param email 
 * @param password 
 * @throws `Supabase.AuthError`
 * @returns user's session and basic user profile information
 */
export const signUpWithEmailAndPassword = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  return {
    session: data.session,
    user: data.user
  }
}